import { spawn } from "node:child_process"
import { createInterface } from "node:readline"
import { OperationalError } from "@akasha/errors-core/exit-code"
import { expandTilde } from "@akasha/utils-fs/expand-tilde"
import type { SshTarget } from "../ssh-target/ssh-target.module.code.ts"

function sshArgs(target: SshTarget): readonly string[] {
  return [
    "-i",
    expandTilde(target.keyPath),
    "-o",
    "StrictHostKeyChecking=no",
    "-o",
    "UserKnownHostsFile=/dev/null",
    "-o",
    "ConnectTimeout=10",
    `${target.user}@${target.host}`,
  ]
}

export async function* streamSshLines(
  target: SshTarget,
  script: string
): AsyncGenerator<string, void, undefined> {
  const child = spawn("ssh", [...sshArgs(target), "bash -s"], {
    stdio: ["pipe", "pipe", "inherit"],
  })

  let failure: Error | undefined
  const finished = new Promise<void>((resolve) => {
    child.on("error", (err: Error & { code?: string }) => {
      failure =
        err.code === "ENOENT"
          ? new OperationalError("ssh not found on PATH")
          : new OperationalError(`ssh spawn failed: ${err.message}`)
      resolve()
    })
    child.on("close", (code) => {
      if (code !== 0 && failure === undefined) {
        failure = new OperationalError(`ssh exited ${code} (host: ${target.user}@${target.host})`)
      }
      resolve()
    })
  })

  if (child.stdin) {
    child.stdin.on("error", () => {})
    child.stdin.write(script)
    child.stdin.end()
  }

  if (child.stdout === null) {
    await finished
    throw failure ?? new OperationalError("ssh produced no stdout stream")
  }

  let drained = false
  try {
    for await (const line of createInterface({
      input: child.stdout,
      crlfDelay: Number.POSITIVE_INFINITY,
    })) {
      yield line
    }
    drained = true
  } finally {
    if (!drained) child.kill()
  }

  await finished
  if (failure !== undefined) throw failure
}

export function runSshCapture(target: SshTarget, script: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const child = spawn("ssh", [...sshArgs(target), "bash -s"], {
      stdio: ["pipe", "pipe", "inherit"],
    })
    let stdout = ""
    if (child.stdout) {
      child.stdout.on("data", (chunk: Buffer) => {
        stdout += chunk.toString()
      })
    }
    child.on("error", (err: Error & { code?: string }) => {
      if (err.code === "ENOENT") {
        reject(new OperationalError("ssh not found on PATH"))
        return
      }
      reject(new OperationalError(`ssh spawn failed: ${err.message}`))
    })
    child.on("close", (code) => {
      if (code === 0) {
        resolve(stdout)
        return
      }
      reject(new OperationalError(`ssh exited ${code} (host: ${target.user}@${target.host})`))
    })
    if (child.stdin) {
      child.stdin.write(script)
      child.stdin.end()
    }
  })
}
