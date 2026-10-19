import { dlopen, FFIType, ptr } from "bun:ffi"
import { readdirSync, readFileSync } from "node:fs"
import { resolveMappedLibc } from "akasha/code/process/modules/libc-mapping/libc-mapping.module.code.ts"
import type { Reader } from "akasha/command/pages/temper/eso/memory/modules/hks-table-reading/hks-table-reading.module.code.ts"

export type Region = { readonly from: bigint; readonly to: bigint; readonly writable: boolean }

export const GAME = "eso64.exe"

const CHUNK = 1 << 24

export function gameProcess(): number | null {
  for (const name of readdirSync("/proc")) {
    if (!/^\d+$/.test(name)) continue
    try {
      if (readFileSync(`/proc/${name}/comm`, "utf8").trim() === GAME) return Number(name)
    } catch {}
  }
  return null
}

export function regionsOf(pid: number): readonly Region[] {
  const mapped: Region[] = []
  for (const line of readFileSync(`/proc/${pid}/maps`, "utf8").split("\n")) {
    const [span, perms] = line.split(" ")
    if (span === undefined || perms === undefined || !perms.startsWith("r")) continue
    const [from, to] = span.split("-")
    if (from === undefined || to === undefined) continue
    mapped.push({ from: BigInt(`0x${from}`), to: BigInt(`0x${to}`), writable: perms[1] === "w" })
  }
  return mapped
}

export function readerOf(pid: number): Reader {
  const libc = dlopen(resolveMappedLibc(), {
    process_vm_readv: {
      args: [FFIType.i32, FFIType.ptr, FFIType.u64, FFIType.ptr, FFIType.u64, FFIType.u64],
      returns: FFIType.i64,
    },
  })
  const local = Buffer.alloc(16)
  const remote = Buffer.alloc(16)
  return (at, length) => {
    const into = Buffer.alloc(length)
    local.writeBigUInt64LE(BigInt(ptr(into)), 0)
    local.writeBigUInt64LE(BigInt(length), 8)
    remote.writeBigUInt64LE(at, 0)
    remote.writeBigUInt64LE(BigInt(length), 8)
    const got = Number(libc.symbols.process_vm_readv(pid, local, 1, remote, 1, 0))
    return got <= 0 ? null : into.subarray(0, got)
  }
}

function hitsIn(bytes: Buffer, needle: Buffer, from: bigint, step: bigint): bigint[] {
  const hits: bigint[] = []
  let at = bytes.indexOf(needle)
  while (at !== -1 && at < CHUNK) {
    const where = from + BigInt(at)
    if (where % step === 0n) hits.push(where)
    at = bytes.indexOf(needle, at + 1)
  }
  return hits
}

export function found(
  read: Reader,
  regions: readonly Region[],
  needle: Buffer,
  step: bigint,
  most: number
): readonly bigint[] {
  const hits: bigint[] = []
  for (const region of regions) {
    if (!region.writable) continue
    for (let at = region.from; at < region.to; at += BigInt(CHUNK)) {
      const left = Number(region.to - at)
      const bytes = read(at, Math.min(CHUNK + needle.length - 1, left))
      if (bytes === null) continue
      hits.push(...hitsIn(bytes, needle, at, step))
      if (hits.length >= most) return hits.slice(0, most)
    }
  }
  return hits
}
