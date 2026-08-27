import { join } from "node:path"
import { exists, run } from "./fs"
import type { Logger } from "./logger"

const LOCAL_BIOME_BIN = "node_modules/.bin/biome"

function biomeCommand(root: string): { cmd: string; leadingArgs: readonly string[] } {
  return exists(root, LOCAL_BIOME_BIN)
    ? { cmd: join(root, LOCAL_BIOME_BIN), leadingArgs: [] }
    : { cmd: "bunx", leadingArgs: ["biome"] }
}

export function organizeImports(root: string, files: readonly string[], log: Logger): undefined {
  if (files.length === 0) {
    log.info("[organize-imports] no rewritten files — skipping import-sort pass")
    return
  }

  const { cmd, leadingArgs } = biomeCommand(root)
  run(root, cmd, [
    ...leadingArgs,
    "check",
    "--write",
    "--linter-enabled=false",
    "--formatter-enabled=false",
    ...files,
  ])

  log.info(`[organize-imports] ran import-sort assist on ${files.length} rewritten file(s)`)
}
