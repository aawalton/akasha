import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { listWorkspaceDirs } from "akasha/alan/harness/workspace-paths/workspace-dirs/workspace-dirs.module.code.ts"
import { isObjectRecord } from "akasha/utils/narrow/is-object-record/is-object-record.module.code.ts"
import { z } from "zod"
import { ROOT } from "../dockerfile-services/dockerfile-services.module.code.ts"

const JSON_VALUE_SCHEMA = z.unknown()

export function readJson(path: string): Record<string, unknown> {
  const parsed = JSON_VALUE_SCHEMA.parse(JSON.parse(readFileSync(path, "utf-8")))
  return isObjectRecord(parsed) ? parsed : {}
}

export function buildPackageNameMap(): Map<string, string> {
  const workspaces = listWorkspaceDirs(ROOT)
  const map = new Map<string, string>()

  for (const ws of workspaces) {
    if (ws.startsWith("apps/") || ws.startsWith("packages/apps/")) continue
    const pkgJsonPath = join(ROOT, ws, "package.json")
    if (!existsSync(pkgJsonPath)) continue
    const pkg = readJson(pkgJsonPath)
    if (typeof pkg.name !== "string") continue
    map.set(pkg.name, ws)
  }

  return map
}
