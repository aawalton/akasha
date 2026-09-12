import { spawn } from "node:child_process"
import { chmod, mkdtemp, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"

const SCRATCH = "/var/tmp"

export async function decryptToTmp(sopsPath: string): Promise<string> {
  const dir = await mkdtemp(join(SCRATCH, "talos-secrets-"))
  const outPath = join(dir, "secrets.yaml")
  const stdout = await runSops([
    "decrypt",
    "--input-type",
    "yaml",
    "--output-type",
    "yaml",
    sopsPath,
  ])
  await writeFile(outPath, stdout)
  await chmod(outPath, 0o600)
  return outPath
}

export type Encrypting = {
  readonly ran: (args: readonly string[]) => Promise<string>
  readonly wrote: (path: string, body: string) => Promise<void>
  readonly moded: (path: string, mode: number) => Promise<void>
}

export const ENCRYPTING: Encrypting = {
  ran: runSops,
  wrote: async (path, body) => {
    await writeFile(path, body)
  },
  moded: async (path, mode) => {
    await chmod(path, mode)
  },
}

export async function encryptFile(
  srcPath: string,
  destSopsPath: string,
  done: string[] = [],
  encrypting: Encrypting = ENCRYPTING
): Promise<void> {
  const stdout = await encrypting.ran([
    "encrypt",
    "--input-type",
    "yaml",
    "--output-type",
    "yaml",
    "--filename-override",
    destSopsPath,
    srcPath,
  ])
  await encrypting.wrote(destSopsPath, stdout)
  done.push(`wrote ${destSopsPath}, which is every node's PKI`)
  await encrypting.moded(destSopsPath, 0o600)
  done.push(`set ${destSopsPath} to mode 0600`)
}

async function runSops(args: readonly string[]): Promise<string> {
  return new Promise<string>((resolveResult, reject) => {
    const child = spawn("sops", [...args], { stdio: ["ignore", "pipe", "inherit"] })
    let stdout = ""
    if (child.stdout) {
      child.stdout.setEncoding("utf8")
      child.stdout.on("data", (chunk: string) => {
        stdout += chunk
      })
    }
    child.on("error", (err: Error & { code?: string }) => {
      if (err.code === "ENOENT") {
        reject(new OperationalError("sops not found on PATH"))
        return
      }
      reject(new OperationalError(`sops spawn failed: ${err.message}`))
    })
    child.on("close", (code) => {
      if (code === 0) {
        resolveResult(stdout)
        return
      }
      reject(new OperationalError(`sops exited ${code} (args: ${args.join(" ")})`))
    })
  })
}
