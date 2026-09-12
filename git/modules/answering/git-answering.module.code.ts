import { statSync } from "node:fs"
import { z } from "zod"

const GIT_BIN = z.string().default("git").parse(process.env.GIT_BIN)

export interface RunResult {
  ok: boolean
  stdout: string
  stderr: string
  exitCode: number
}

export interface RunOptions {
  timeoutMs?: number
}

function cwdMissingResult(cwd: string): RunResult | undefined {
  const st = statSync(cwd, { throwIfNoEntry: false })
  if (st?.isDirectory() === true) return undefined
  return { ok: false, stdout: "", stderr: `cwd missing: ${cwd}`, exitCode: -1 }
}

function reapGroup(pid: number): undefined {
  try {
    process.kill(-pid, "SIGKILL")
  } catch {}
}

async function ranIn(
  args: readonly string[],
  cwd: string,
  options?: RunOptions
): Promise<RunResult> {
  const missing = cwdMissingResult(cwd)
  if (missing !== undefined) return missing

  const proc = Bun.spawn([...args], {
    cwd,
    stdin: "ignore",
    stdout: "pipe",
    stderr: "pipe",
    env: process.env,
    detached: true,
  })

  const pid = proc.pid
  const timeoutMs = options?.timeoutMs
  if (timeoutMs === undefined) {
    try {
      const [stdout, stderr] = await Promise.all([
        new Response(proc.stdout).text(),
        new Response(proc.stderr).text(),
      ])
      const exitCode = await proc.exited
      return { ok: exitCode === 0, stdout, stderr, exitCode }
    } finally {
      reapGroup(pid)
    }
  }

  const label = args[0] ?? "cmd"
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  const timeoutPromise = new Promise<{ timedOut: true }>((resolve) => {
    timeoutId = setTimeout(() => {
      reapGroup(pid)
      resolve({ timedOut: true })
    }, timeoutMs)
  })

  const settledPromise = Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ]).then(([stdout, stderr, exitCode]) => ({
    timedOut: false as const,
    stdout,
    stderr,
    exitCode,
  }))

  try {
    const result = await Promise.race([settledPromise, timeoutPromise])
    if (result.timedOut) {
      return {
        ok: false,
        stdout: "",
        stderr: `${label} timed out after ${timeoutMs}ms`,
        exitCode: -1,
      }
    }
    return {
      ok: result.exitCode === 0,
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
    }
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId)
    reapGroup(pid)
  }
}

export async function runGitRaw(
  args: readonly string[],
  cwd: string,
  options?: RunOptions
): Promise<RunResult> {
  return ranIn([GIT_BIN, ...args], cwd, options)
}

export async function runGit(
  args: readonly string[],
  cwd: string,
  options?: RunOptions
): Promise<RunResult> {
  const result = await ranIn([GIT_BIN, ...args], cwd, options)
  return { ...result, stdout: result.stdout.trim(), stderr: result.stderr.trim() }
}
