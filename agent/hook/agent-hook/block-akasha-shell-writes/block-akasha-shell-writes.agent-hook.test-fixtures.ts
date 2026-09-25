import { mkdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  judgedFor,
  refusalFor,
} from "akasha/agent/hook/agent-hook/block-akasha-shell-writes/block-akasha-shell-writes.agent-hook.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { indexNamed } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

export const scratch = scratchWorld()

function worldAt(): string {
  const root = realpathSync(scratch.rootFor("block-akasha-shell-writes-"))
  mkdirSync(join(root, "graph"), { recursive: true })
  writeFileSync(join(root, "graph", "held.domain.ts"), "held\n")
  mkdirSync(join(root, "node_modules", "@akasha"), { recursive: true })
  writeFileSync(join(root, ".gitignore"), "node_modules/\n")
  symlinkSync("../../graph", join(root, "node_modules", "@akasha", "graph-system"))
  symlinkSync("..", join(root, "node_modules", "akasha"))
  symlinkSync("graph", join(root, "graph-link"))
  symlinkSync(indexNamed(), join(root, "index-link"))
  ran(["git", "init", "-q", root])
  return root
}

const WORLD = worldAt()

const ROOT = rootOf(import.meta.path)

export const INSIDE = "inside the akasha folder"

export const REBUILD = "akasha index refresh"

export const SWEEP = "akasha git sweep"

export const INTERPRETED: readonly string[] = [
  "node -e \"require('fs').writeFileSync('akasha/held.domain.ts','x')\"",
  "bun run - <<'EOF'\nawait Bun.write('akasha/held.domain.ts','x')\nEOF",
  "deno eval \"Deno.writeTextFileSync('akasha/held.domain.ts','x')\"",
  "ruby -e \"File.write('akasha/held.domain.ts','x')\"",
  "php -r \"file_put_contents('akasha/held.domain.ts','x');\"",
]

export const MOVED_OUT: readonly string[] = [
  "cd /var/tmp && echo hi > akasha/held.domain.ts",
  "cd /var/tmp && cp /var/tmp/x akasha/held.domain.ts",
  "cd /var/tmp && python3 - <<'EOF'\nopen('akasha/held.domain.ts','w').write('x')\nEOF",
  "python3 -c \"open('/var/tmp/held/one.ts','w')\"",
]

export const MOVED_IN: readonly string[] = [
  `cd /var/tmp && cd ${ROOT} && echo hi > akasha/held.domain.ts`,
  `cd /var/tmp && cd ${ROOT}/akasha && touch held.domain.ts`,
  "cd akasha && touch held.domain.ts",
  `cd /var/tmp && python3 -c "open('${ROOT}/akasha/held.domain.ts','w')"`,
  "(cd /var/tmp) && touch akasha/held.domain.ts",
  "cd $ELSEWHERE && touch akasha/held.domain.ts",
  "cd /var/tmp; cd - && touch akasha/held.domain.ts",
]

export function said(command: string): string | null {
  const answer = judgedFor({ tool_input: { command }, cwd: ROOT })
  return answer.err === "" ? null : answer.err
}

export function saidThere(command: string): string | null {
  return refusalFor(command, WORLD, WORLD)
}
