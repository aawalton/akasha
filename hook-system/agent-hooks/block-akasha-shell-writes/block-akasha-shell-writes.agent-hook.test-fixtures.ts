import { mkdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { indexNamed } from "@akasha/indexes"
import { ran } from "@akasha/utils/run/running"

export const scratch = scratchWorld()

function worldAt(): string {
  const root = realpathSync(scratch.rootFor("block-akasha-shell-writes-"))
  mkdirSync(join(root, "graph"), { recursive: true })
  writeFileSync(join(root, "graph", "held.domain.ts"), "held\n")
  mkdirSync(join(root, "node_modules", "@akasha"), { recursive: true })
  writeFileSync(join(root, ".gitignore"), "node_modules/\n")
  symlinkSync("../../graph", join(root, "node_modules", "@akasha", "graph-system"))
  symlinkSync("graph", join(root, "graph-link"))
  symlinkSync(indexNamed(), join(root, "index-link"))
  ran(["git", "init", "-q", root])
  return root
}

export const WORLD = worldAt()
