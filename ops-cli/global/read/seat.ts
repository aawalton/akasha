import { existsSync, readFileSync } from "node:fs"
import { locate, rootsHere } from "../../../repo/roots/roots.ts"
import { standingHere } from "../../../page/required-reading/warrant/warrant.ts"
import { agentPageFor } from "../../../agent/read-log.ts"
import type { Target } from "./target.ts"
import {
  seatWarrantsWithDefaults,
  subagentWarrantsFor,
} from "../../../agent/required-reading/required-reading.ts"
import { seatAbove } from "../../../agent/writer.ts"

export function seatTargets(agent: string, from: string): readonly Target[] | null {
  const above = seatAbove(agent)
  const page = agentPageFor(above ?? agent)
  if (page === null) return null
  let body: string
  try {
    body = readFileSync(page, "utf8")
  } catch {
    return null
  }
  const { index } = standingHere()
  const roots = rootsHere()
  const here = locate(from)
  const held = new Set<string>()
  const targets: Target[] = []
  const warranted =
    above === null ? seatWarrantsWithDefaults(body, index) : subagentWarrantsFor(body, index)
  for (const one of warranted) {
    const root = roots[one.page.repo]
    if (root === undefined) continue
    const absolute = `${root}/${one.page.key}`
    if (held.has(absolute) || !existsSync(absolute)) continue
    held.add(absolute)
    targets.push({
      named: here !== null && here.repo === one.page.repo ? one.page.key : absolute,
      root,
      absolute,
    })
  }
  return targets
}
