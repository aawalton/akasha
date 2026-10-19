import { dlopen, FFIType, ptr } from "bun:ffi"
import { readdirSync, readFileSync } from "node:fs"
import { resolveMappedLibc } from "akasha/code/process/modules/libc-mapping/libc-mapping.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { limit } from "akasha/command/argument/pages/limit.argument.ts"
import { memoryAddress } from "akasha/command/argument/pages/memory-address.argument.ts"
import { memoryTable } from "akasha/command/argument/pages/memory-table.argument.ts"
import { memoryText } from "akasha/command/argument/pages/memory-text.argument.ts"
import { memoryWord } from "akasha/command/argument/pages/memory-word.argument.ts"
import {
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  type Reader,
  shown,
  tableAt,
} from "akasha/command/pages/temper/eso/memory/modules/hks-table-reading/hks-table-reading.module.code.ts"
import { temperEsoMemory as page } from "akasha/command/pages/temper/eso/memory/temper-eso-memory.command.ts"

const NAMED = [memoryText, memoryWord, memoryAddress, memoryTable, limit]

const GAME = "eso64.exe"

const CHUNK = 1 << 24

const SHOWN = 512

const ROW = 16

const WORD = 8

const ROWS = 40

const HEX = /^(?:0x)?([0-9a-f]{1,16})$/i

type Region = { readonly from: bigint; readonly to: bigint; readonly writable: boolean }

function gameProcess(): number | null {
  for (const name of readdirSync("/proc")) {
    if (!/^\d+$/.test(name)) continue
    try {
      if (readFileSync(`/proc/${name}/comm`, "utf8").trim() === GAME) return Number(name)
    } catch {}
  }
  return null
}

function regionsOf(pid: number): readonly Region[] {
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

function readerOf(pid: number): Reader {
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

function found(
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

function inside(regions: readonly Region[], word: bigint): boolean {
  return regions.some((region) => word >= region.from && word < region.to)
}

function rowLine(regions: readonly Region[], row: Buffer, at: bigint): string {
  const words: string[] = []
  for (let offset = 0; offset + WORD <= row.length; offset += WORD) {
    const word = row.readBigUInt64LE(offset)
    words.push(`${word.toString(16).padStart(16, "0")}${inside(regions, word) ? "*" : " "}`)
  }
  const text = [...row].map((one) => (one >= 32 && one < 127 ? String.fromCharCode(one) : "."))
  return `${at.toString(16).padStart(12, "0")}  ${words.join(" ")}  ${text.join("")}`
}

function dumped(read: Reader, regions: readonly Region[], at: bigint): readonly string[] | null {
  const bytes = read(at, SHOWN)
  if (bytes === null) return null
  const lines: string[] = []
  for (let offset = 0; offset < bytes.length; offset += ROW) {
    lines.push(rowLine(regions, bytes.subarray(offset, offset + ROW), at + BigInt(offset)))
  }
  return lines
}

function hexOf(said: string): bigint | null {
  const digits = HEX.exec(said.trim())?.[1]
  return digits === undefined ? null : BigInt(`0x${digits}`)
}

function wordBytes(word: bigint): Buffer {
  const bytes = Buffer.alloc(WORD)
  bytes.writeBigUInt64LE(word, 0)
  return bytes
}

function tableLines(read: Reader, table: bigint, most: number): readonly string[] | null {
  const held = tableAt(read, table)
  if (held === null) return null
  const header = held.header.map((word) => word.toString(16)).join(" ")
  const rows = held.entries
    .slice(0, most)
    .map((entry) => `  ${shown(read, entry.key)} = ${shown(read, entry.value)}`)
  return [`header ${header}`, `${held.entries.length} entries`, ...rows]
}

function listed(hits: readonly bigint[], what: string): Answer {
  return told([
    `${hits.length} cop${hits.length === 1 ? "y" : "ies"} of ${what}`,
    ...hits.map((hit) => `  ${hit.toString(16)}`),
  ])
}

export function temperEsoMemory(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const most = read.taken.limit ?? ROWS
  const pid = gameProcess()
  if (pid === null) return refused(`no process named \`${GAME}\` is running`, DATA)
  let regions: readonly Region[]
  try {
    regions = regionsOf(pid)
  } catch (thrown) {
    return refused(`the memory map of process ${pid} does not read: ${saidBy(thrown)}`, DATA)
  }
  const reader = readerOf(pid)
  const address = read.taken.memoryAddress
  if (address !== undefined) {
    const at = hexOf(address)
    if (at === null) return refused(`\`${address}\` is no address in hex`, INPUT)
    const lines = dumped(reader, regions, at)
    if (lines === null) return refused(`nothing at \`${address}\` reads`, DATA)
    return told(lines)
  }
  const table = read.taken.memoryTable
  if (table !== undefined) {
    const at = hexOf(table)
    if (at === null) return refused(`\`${table}\` is no address in hex`, INPUT)
    const lines = tableLines(reader, at, most)
    if (lines === null) return refused(`no table at \`${table}\` reads`, DATA)
    return told(lines)
  }
  const text = read.taken.memoryText
  if (text !== undefined) {
    return listed(found(reader, regions, Buffer.from(text, "utf8"), 1n, most), `\`${text}\``)
  }
  const said = read.taken.memoryWord
  if (said !== undefined) {
    const word = hexOf(said)
    if (word === null) return refused(`\`${said}\` is no word in hex`, INPUT)
    return listed(found(reader, regions, wordBytes(word), BigInt(WORD), most), `\`${said}\``)
  }
  return refused("a text to find, a word to find or an address to show is named", INPUT)
}
