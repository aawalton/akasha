import { spawn } from "node:child_process"
import { OperationalError } from "@akasha/errors-core/exit-code"

export interface TalosctlOptions {
  readonly args: readonly string[]
  readonly stdin?: string | undefined
  readonly captureStdout?: boolean
}

export interface TalosctlResult {
  readonly stdout: string
  readonly exitCode: number
}

const STDOUT_SENTINELS: readonly string[] = ["-", "/dev/stdout", "/dev/stderr"]
const OUTPUT_FLAGS: readonly string[] = ["-o", "--output"]

export function assertNoStdoutSentinel(args: readonly string[]): undefined {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === undefined) continue
    let value: string | undefined
    if (OUTPUT_FLAGS.includes(arg)) {
      value = args[i + 1]
    } else {
      for (const flag of OUTPUT_FLAGS) {
        if (arg.startsWith(`${flag}=`)) {
          value = arg.slice(flag.length + 1)
          break
        }
      }
    }
    if (value !== undefined && STDOUT_SENTINELS.includes(value)) {
      throw new OperationalError(
        `talosctl args include stdout sentinel "-o ${value}" — talosctl treats this as a literal filename, not a stdout pipe; write to a tmpfile and read it back instead (see secrets-gen.ts)`
      )
    }
  }
}

export async function runTalosctl(opts: TalosctlOptions): Promise<TalosctlResult> {
  assertNoStdoutSentinel(opts.args)
  return new Promise<TalosctlResult>((resolve, reject) => {
    const child = spawn("talosctl", [...opts.args], {
      stdio: ["pipe", opts.captureStdout === true ? "pipe" : "inherit", "inherit"],
    })
    let stdout = ""
    if (opts.captureStdout === true && child.stdout) {
      child.stdout.setEncoding("utf8")
      child.stdout.on("data", (chunk: string) => {
        stdout += chunk
      })
    }
    child.on("error", (err: Error & { code?: string }) => {
      if (err.code === "ENOENT") {
        reject(
          new OperationalError(
            "talosctl not found on PATH — install from https://github.com/siderolabs/talos/releases"
          )
        )
        return
      }
      reject(new OperationalError(`talosctl spawn failed: ${err.message}`))
    })
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, exitCode: 0 })
        return
      }
      reject(new OperationalError(`talosctl exited ${code} (args: ${opts.args.join(" ")})`))
    })
    if (opts.stdin !== undefined && child.stdin) {
      child.stdin.write(opts.stdin)
      child.stdin.end()
    }
  })
}
