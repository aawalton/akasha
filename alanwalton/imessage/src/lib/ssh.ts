import { spawn } from "node:child_process"
import { OperationalError } from "@shared/errors-core/exit"
import { expandTilde } from "@shared/utils-fs/expand-tilde"

export interface SshTarget {
  readonly user: string
  readonly host: string
  readonly keyPath: string
}

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
