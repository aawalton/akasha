import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { heldSaid, WAITED_AT_MOST } from "akasha/git/holding/holding.module.code.ts"
import { valueAlsoFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { nothingFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import {
  bodyOf,
  LOG_AT,
  lineFor,
  pathOf,
  slugOf,
  TAKING,
  WRITING,
} from "akasha/seat-system/subagents/presence/subagent-presence.module.code.ts"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"

export const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

export const OTHER_ID = "01a05844-6e60-7000-b54c-4b14559df70c"

export const OWN = "a38f63805f9b94edf"

export const AGAIN = "a38f63805f9b94ee0"

export const CHILD = "claude --dangerously-skip-permissions --model opus"

export const TASK = "rg --json needle ."

export const REFUSED = heldSaid(WAITED_AT_MOST)

export function agentIdOf(seatId: string, own: string): string {
  return `${seatId}--${own}`
}

export function indexPut(root: string): string {
  nothingFiled(root)
  return root
}

export function pagePut(root: string, seatName: string, own: string, agentId: string): string {
  const slug = slugOf(seatName, own)
  const at = pathOf(slug)
  put(root, at, bodyOf(slug, seatName, "domain/akasha", "Explore", agentId))
  valueAlsoFiled(root, "subagent", [{ path: at, value: { pageTypeSlug: "subagent", slug } }])
  return at
}

export function awayPut(root: string, seatName: string, own: string, agentId: string): string {
  const slug = slugOf(seatName, own)
  const at = `seat-system/elsewhere/${slug}.subagent.ts`
  put(root, at, bodyOf(slug, seatName, "domain/akasha", "Explore", agentId))
  valueAlsoFiled(root, "subagent", [{ path: at, value: { pageTypeSlug: "subagent", slug } }])
  return at
}

export function logPut(baseDir: string, seatId: string, lines: readonly string[]): undefined {
  mkdirSync(join(baseDir, seatId), { recursive: true })
  writeFileSync(join(baseDir, seatId, LOG_AT), `${lines.join("\n")}\n`)
}

export function takeLine(seatName: string, own: string): string {
  return lineFor(`${TAKING} ${seatName} ${own} — ${REFUSED}`)
}

export const STAMPED = "2026-09-05T12:17:44.031-06:00"

export function writeLine(seatName: string, own: string): string {
  return lineFor(`${WRITING} ${seatName} ${own} — ${REFUSED}`)
}
