import { unlinkSync } from "node:fs"

const COPY_FLAGS = ["--transfers", "2", "--checkers", "4", "--multi-thread-streams", "0"]

async function runRclone(args: readonly string[]): Promise<string> {
  const proc = Bun.spawn(["rclone", ...args], { stdout: "pipe", stderr: "pipe" })
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  if (exitCode !== 0) {
    throw new Error(`rclone ${args.join(" ")} exited ${exitCode}: ${stderr.trim()}`)
  }
  return stdout
}

export async function rcloneLsf(
  remoteOrLocalPath: string,
  opts?: { readonly dirsOnly?: boolean; readonly filesOnly?: boolean }
): Promise<readonly string[]> {
  const args = ["lsf", remoteOrLocalPath]
  if (opts?.dirsOnly === true) args.push("--dirs-only")
  if (opts?.filesOnly === true) args.push("--files-only")
  const stdout = await runRclone(args)
  return stdout
    .split("\n")
    .map((line) => (line.endsWith("/") ? line.slice(0, -1) : line))
    .filter((line) => line !== "")
}

export async function rcloneCat(remotePath: string): Promise<string> {
  return runRclone(["cat", remotePath])
}

export async function rcloneCopy(src: string, dst: string): Promise<undefined> {
  await runRclone(["copy", src, dst, ...COPY_FLAGS])
}

export async function rcloneSha256(path: string): Promise<readonly string[]> {
  const stdout = await runRclone(["hashsum", "sha256", path])
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "")
}

export async function rcloneCopyFilesFrom(
  srcRoot: string,
  dstRoot: string,
  files: readonly string[]
): Promise<undefined> {
  const listPath = `/var/tmp/rclone-files-from-${Date.now()}-${Math.random().toString(36).slice(2)}.txt`
  await Bun.write(listPath, `${files.join("\n")}\n`)
  try {
    await runRclone(["copy", srcRoot, dstRoot, "--files-from", listPath, ...COPY_FLAGS])
  } finally {
    unlinkSync(listPath)
  }
}
