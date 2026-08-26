import { existsSync } from "node:fs"
import { locate, rootsHere } from "../../../../repo/roots/roots.ts"
import type { PageAt } from "../../../../page/page.ts"
import { pageNameOf } from "../../../../page/name/name.ts"
import { requiredReadingFor } from "../../../../page/required-reading/required-reading.ts"
import { textAt } from "../../../../page/text/text.ts"
import { standingHere } from "../../../../page/required-reading/warrant/warrant.ts"
import type { Target } from "../target/read-target.ts"

export function pageAtOf(repo: string, key: string): PageAt {
  const named = pageNameOf(key)
  return { repo, key, stem: named?.stem ?? "", type: named?.type ?? "" }
}

export interface Required {
  readonly targets: readonly Target[]
  readonly caption: string
}

function captionFor(count: number): string {
  return (
    `read:   ${count} file(s) below were not asked for: they are required for what was, or specify its ` +
    "shape, and are the set a write is refused for not having read"
  )
}

export function requiredFor(asked: readonly Target[], from: string): Required {
  const { index, seeding, rootOf } = standingHere()
  const roots = rootsHere()
  const here = locate(from)
  const held = new Set(asked.map((one) => one.absolute))
  const targets: Target[] = []
  for (const one of asked) {
    const at = locate(one.absolute)
    if (at === null) continue
    const root = roots[at.repo]
    if (root === undefined) continue
    const page = pageAtOf(at.repo, at.relPath)
    const body = textAt(root, at.relPath)
    for (const warrant of requiredReadingFor(page, body, index, seeding, rootOf)) {
      const at2 = rootOf(warrant.repo)
      if (at2 === undefined) continue
      const absolute = `${at2}/${warrant.key}`
      if (held.has(absolute) || !existsSync(absolute)) continue
      held.add(absolute)
      targets.push({
        named: here !== null && here.repo === warrant.repo ? warrant.key : absolute,
        root: at2,
        absolute,
      })
    }
  }
  return { targets, caption: captionFor(targets.length) }
}
