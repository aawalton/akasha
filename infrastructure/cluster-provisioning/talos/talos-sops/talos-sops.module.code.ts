import { spawn } from "node:child_process"
import { chmod, mkdtemp, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { OperationalError } from "@akasha/errors-core/exit-code"

export async function decryptToTmp(sopsPath: string): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), "talos-secrets-"))
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

export async function encryptFile(srcPath: string, destSopsPath: string): Promise<void> {
  const stdout = await runSops([
    "encrypt",
    "--input-type",
    "yaml",
    "--output-type",
    "yaml",
    "--filename-override",
    destSopsPath,
    srcPath,
  ])
  await writeFile(destSopsPath, stdout)
  await chmod(destSopsPath, 0o600)
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
