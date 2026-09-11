import { mkdirSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import {
  readingFileAt,
  SUBAGENT_MARK,
} from "akasha/commands/modules/reading/reading.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"

export const AGENT = "01a04e96-c80a-79ef-819f-a455a96a0e54"

export const OTHER = "01a04e96-c80a-79ef-819f-000000000000"

export const UNDER = `${AGENT}${SUBAGENT_MARK}sub-one`

export const A = "akasha/a.ts"

export const B = "akasha/b.ts"

export const DAY = 24 * 60 * 60 * 1000

export const scratch = scratchWorld()

export function thinAt(root: string, path: string, said: Record<string, unknown>): undefined {
  const at = readingFileAt(root, AGENT, path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `${JSON.stringify(said)}\n`)
}
