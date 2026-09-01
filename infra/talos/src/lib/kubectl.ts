import { spawn } from "node:child_process"
import { OperationalError } from "@akasha/errors-core/exit-code"

export interface KubectlOptions {
  readonly args: readonly string[]
  readonly kubeconfig: string
  readonly stdin?: string | undefined
}

export async function runKubectl(opts: KubectlOptions): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const child = spawn("kubectl", [...opts.args], {
      stdio: [opts.stdin === undefined ? "inherit" : "pipe", "inherit", "inherit"],
      env: { ...process.env, KUBECONFIG: opts.kubeconfig },
    })
    child.on("error", (err: Error & { code?: string }) => {
      if (err.code === "ENOENT") {
        reject(new OperationalError("kubectl not found on PATH"))
        return
      }
      reject(new OperationalError(`kubectl spawn failed: ${err.message}`))
    })
    child.on("close", (code) => {
      if (code === 0) {
        resolve()
        return
      }
      reject(new OperationalError(`kubectl exited ${code} (args: ${opts.args.join(" ")})`))
    })
    if (opts.stdin !== undefined && child.stdin) {
      child.stdin.write(opts.stdin)
      child.stdin.end()
    }
  })
}
