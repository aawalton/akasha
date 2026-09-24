import { dlopen, FFIType, ptr } from "bun:ffi"
import type { ChildExitStatus } from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-child-exit-decide/supervisor-child-exit-decide.module.code.ts"
import type { ChildExitRuleSource } from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-child-exit-rule/supervisor-child-exit-rule.module.code.ts"
import { resolveMappedLibc } from "akasha/code/process/modules/libc-mapping/libc-mapping.module.code.ts"
import {
  errnoCodeOf,
  readPidSignal,
} from "akasha/code/process/modules/pid-signal/pid-signal.module.code.ts"
import {
  collapse,
  folds,
  refuses,
} from "akasha/code/type/narrowing/modules/collapse/collapse.module.code.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

if (process.platform !== "linux") {
  throw new Error(`supervisor-exec only supports Linux (got ${process.platform}).`)
}

export type Pid = number & { readonly __brand: "Pid" }

const WNOHANG = 1

const libc = dlopen(resolveMappedLibc(), {
  execvpe: {
    args: [FFIType.cstring, FFIType.ptr, FFIType.ptr],
    returns: FFIType.i32,
  },
  waitpid: {
    args: [FFIType.i32, FFIType.ptr, FFIType.i32],
    returns: FFIType.i32,
  },
}).symbols

function syscallError(syscall: string, detail: string, ret: number): Error {
  return new Error(`${syscall} ${detail} failed (returned ${ret})`)
}

function isNoSuchProcess(err: unknown): boolean {
  return errnoCodeOf(err) === "ESRCH"
}

function buildCStringArray(items: readonly string[]): {
  ptrArray: BigInt64Array
  buffers: readonly Uint8Array[]
} {
  const buffers: Uint8Array[] = []
  const ptrArray = new BigInt64Array(items.length + 1)
  for (let i = 0; i < items.length; i++) {
    const buf = Buffer.from(`${items[i]}\0`, "utf8")
    buffers.push(buf)
    ptrArray[i] = BigInt(ptr(buf))
  }
  ptrArray[items.length] = 0n
  return { ptrArray, buffers }
}

export function execvpe(
  file: string,
  argv: readonly string[],
  envp: Record<string, string | undefined>
): never {
  if (file.length === 0) {
    throw new Error("execvpe: file must be non-empty")
  }
  if (argv.length === 0 || argv[0]?.length === 0) {
    throw new Error("execvpe: argv[0] must be non-empty")
  }

  const fileBuf = Buffer.from(`${file}\0`, "utf8")
  const argvBuilt = buildCStringArray(argv)
  const envEntries: string[] = []
  for (const [k, v] of Object.entries(envp)) {
    if (v === undefined) continue
    envEntries.push(`${k}=${v}`)
  }
  const envBuilt = buildCStringArray(envEntries)

  const ret = libc.execvpe(fileBuf, argvBuilt.ptrArray, envBuilt.ptrArray)
  void argvBuilt.buffers
  void envBuilt.buffers
  void fileBuf
  throw syscallError("execvpe", `(${JSON.stringify(file)}) — not found on PATH?`, ret)
}

export function isProcessAlive(pid: number): boolean {
  return collapse(readPidSignal(pid), {
    signalable: folds(true, "the inherited child answers signal 0"),
    "no-such-process": folds(false, "the only reading that proves the child is gone"),
    "exists-not-permitted": refuses(
      "a child this process may not signal is not its child, which is a fault rather than an answer"
    ),
    unknown: refuses(
      "this is the adoption path's existence poll, and a supervisor that cannot read its own inherited child's state has no correct guess available: reading dead abandons a live child, reading alive polls a gone one forever"
    ),
  })
}

export type SignalName = "SIGTERM" | "SIGKILL" | "SIGINT" | "SIGHUP"

export function signalPid(pid: number, signal: SignalName): undefined {
  try {
    process.kill(pid, signal)
  } catch (err) {
    if (isNoSuchProcess(err)) return
    throw err
  }
}

export async function waitForPidExit(
  pid: number,
  childExitRule: ChildExitRuleSource,
  opts?: { pollIntervalMs?: number }
): Promise<ChildExitStatus> {
  const interval = opts?.pollIntervalMs ?? 250
  const status = new Int32Array(1)
  while (true) {
    const ret = libc.waitpid(pid, status, WNOHANG)
    if (ret > 0) return (await childExitRule.decodeWaitStatus(status[0] ?? 0)).value
    if (ret < 0 && !isProcessAlive(pid)) return { exitCode: null, signal: null }
    await new Promise((r) => setTimeout(r, interval))
  }
}

export const asPid = (n: number): Pid => n as Pid
