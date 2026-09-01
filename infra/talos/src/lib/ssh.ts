import { spawn } from "node:child_process"
import { OperationalError } from "@akasha/errors-core/exit-code"

export interface SshOptions {
  readonly user: string
  readonly host: string
  readonly keyPath: string
  readonly script: string
}

export async function runSsh(opts: SshOptions): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const args = [
      "-i",
      opts.keyPath,
      "-o",
      "StrictHostKeyChecking=no",
      "-o",
      "UserKnownHostsFile=/dev/null",
      "-o",
      "ConnectTimeout=10",
      `${opts.user}@${opts.host}`,
      "bash -s",
    ]
    const child = spawn("ssh", args, { stdio: ["pipe", "inherit", "inherit"] })
    child.on("error", (err: Error & { code?: string }) => {
      if (err.code === "ENOENT") {
        reject(new OperationalError("ssh not found on PATH"))
        return
      }
      reject(new OperationalError(`ssh spawn failed: ${err.message}`))
    })
    child.on("close", (code) => {
      if (code === 0) {
        resolve()
        return
      }
      reject(new OperationalError(`ssh exited ${code} (host: ${opts.user}@${opts.host})`))
    })
    if (child.stdin) {
      child.stdin.write(opts.script)
      child.stdin.end()
    }
  })
}
