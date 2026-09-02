import { createHash } from "node:crypto"
import { cp, mkdtemp, readdir, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { SCRATCH_AT } from "@akasha/command-system/scratching"
import { OperationalError } from "@akasha/errors-core/exit-code"
import extract from "extract-zip"
import type { FileDetails } from "../esoui-catalog/esoui-catalog.module.code.ts"

export type InstallResult = {
  readonly installedDirs: readonly string[]
  readonly version: string
}

function md5Hex(bytes: Uint8Array): string {
  return createHash("md5").update(bytes).digest("hex")
}

async function downloadProved(details: FileDetails, zipPath: string): Promise<void> {
  let answered: Response
  try {
    answered = await fetch(details.downloadUrl)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    throw new OperationalError(`network error downloading ${details.downloadUrl}: ${why}`)
  }
  if (!answered.ok) {
    throw new OperationalError(`HTTP ${String(answered.status)} downloading ${details.downloadUrl}`)
  }
  const bytes = new Uint8Array(await answered.arrayBuffer())
  const found = md5Hex(bytes)
  if (found !== details.md5) {
    throw new OperationalError(
      `MD5 mismatch for file ${details.uid}: ESOUI states ${details.md5} and the download is ${found}`
    )
  }
  await writeFile(zipPath, bytes)
}

export async function downloadAndInstall(
  details: FileDetails,
  expectedDirs: readonly string[],
  addonsPath: string
): Promise<InstallResult> {
  const work = await mkdtemp(join(SCRATCH_AT, "temper-addon-"))
  try {
    const zipPath = join(work, "addon.zip")
    await downloadProved(details, zipPath)

    const staging = join(work, "extract")
    await extract(zipPath, { dir: staging })

    const unpacked = await readdir(staging, { withFileTypes: true })
    const expected = new Set(expectedDirs)
    const laying = unpacked
      .filter((one) => one.isDirectory())
      .map((one) => one.name)
      .filter((name) => expected.has(name))

    const installedDirs: string[] = []
    for (const dir of laying) {
      const target = join(addonsPath, dir)
      await rm(target, { recursive: true, force: true })
      await cp(join(staging, dir), target, { recursive: true })
      installedDirs.push(dir)
    }
    return { installedDirs, version: details.version }
  } finally {
    await rm(work, { recursive: true, force: true })
  }
}
