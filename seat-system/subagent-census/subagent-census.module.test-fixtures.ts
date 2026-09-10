import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { nothingFiled, valueAlsoFiled } from "@akasha/indexes/testing"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"
import {
  bodyOf,
  LOG_AT,
  pathOf,
  slugOf,
} from "../subagents/presence/subagent-presence.module.code.ts"

export const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

export const OTHER_ID = "01a05844-6e60-7000-b54c-4b14559df70c"

export const OWN = "a38f63805f9b94edf"

export const AGAIN = "a38f63805f9b94ee0"

export const CHILD = "claude --dangerously-skip-permissions --model opus"

export const TASK = "rg --json needle ."

export const REFUSED =
  "nothing was committed and what was written was put back — another landing has held" +
  " `.git/akasha-landing.lock` for longer than 120s, so this change was not judged"

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
  return `subagent-presence: take ${seatName} ${own} — ${REFUSED}`
}

export const STAMPED = "2026-09-05T12:17:44.031-06:00"

export function writeLine(seatName: string, own: string): string {
  return `subagent-presence: write ${seatName} ${own} — ${REFUSED}`
}
