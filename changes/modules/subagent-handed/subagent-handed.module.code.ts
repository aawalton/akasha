import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { partedIn } from "@akasha/pages/page-file-name"
import { editsAt } from "../edits-keeping/edits-keeping.module.code.ts"

const UNDER = "seat-system/subagents/pages"

const SUFFIX = ".subagent.ts"

const SUBAGENT = "subagent"

export function handedPageOf(under: string): string {
  return `${UNDER}/${under}${SUFFIX}`
}

function slugIn(page: string): string | null {
  const named = partedIn(page)
  return named === null || named.sections.length > 0 ? null : named.slug
}

export function handedUnder(root: string, seat: string): readonly string[] {
  const slug = slugIn(seat)
  if (slug === null) return []
  const mark = `${slug}-`
  let names: readonly string[]
  try {
    names = readdirSync(join(root, UNDER))
  } catch {
    return []
  }
  const found: string[] = []
  for (const one of names) {
    const named = partedIn(one)
    if (named === null || named.pageType !== SUBAGENT) continue
    if (!named.slug.startsWith(mark)) continue
    const page = handedPageOf(named.slug)
    if (`${UNDER}/${one}` !== editsAt(page)) continue
    if (existsSync(join(root, page))) continue
    found.push(named.slug)
  }
  return found.sort()
}
