import { everyOfType } from "@akasha/indexes"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { uncommittedIn } from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import { subagentReturned } from "akasha/seat-system/subagents/properties/subagent-returned.boolean-property.ts"
import { editsWaiting } from "../edits-keeping/edits-keeping.module.code.ts"

const UNDER = "seat-system/subagents/pages"

const SUFFIX = ".subagent.ts"

const SUBAGENT = "subagent"

const RETURNED = subagentReturned.propertySlug

export function handedPageOf(under: string): string {
  return `${UNDER}/${under}${SUFFIX}`
}

function slugIn(page: string): string | null {
  const named = partedIn(page)
  return named === null || named.sections.length > 0 ? null : named.slug
}

export function handedOver(root: string, page: string): boolean {
  return uncommittedIn(root, page)?.[RETURNED] === true && editsWaiting(root, page)
}

export function handedUnder(root: string, seat: string): readonly string[] {
  const slug = slugIn(seat)
  if (slug === null) return []
  const mark = `${slug}-`
  const found: string[] = []
  for (const one of everyOfType(root, SUBAGENT)) {
    const named = slugIn(one.path)
    if (named === null || !named.startsWith(mark)) continue
    if (!handedOver(root, one.path)) continue
    found.push(named)
  }
  return found.sort()
}
