import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { WATCHER_DIR } from "../watcher-dir/watcher-dir.module.code.ts"

export function readServedWatcherVersion(): string | null {
  const versionFile = join(WATCHER_DIR, "version.txt")
  if (!existsSync(versionFile)) return null

  const stamp = readFileSync(versionFile, "utf-8").trim()
  return stamp === "" ? null : stamp
}
