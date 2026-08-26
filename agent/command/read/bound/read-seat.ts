import { existsSync, readFileSync } from "node:fs"
import { locate, rootsHere } from "../../../../repo/roots.ts"
import { standingHere } from "../../../../page/warrant-index.ts"
import { agentPageFor } from "../../../read-log.ts"
import type { Target } from "../target/read-target.ts"
import { seatWarrantsFor } from "../../../required-reading.ts"

export function seatTargets(agent: string, from: string): readonly Target[] | null {
  const page = agentPageFor(agent)
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
  for (const one of seatWarrantsFor(body, index)) {
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
