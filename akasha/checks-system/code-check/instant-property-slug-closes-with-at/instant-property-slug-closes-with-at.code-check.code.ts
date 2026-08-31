import type { Change } from "../../../pages-system/change/change.module.code.ts"
import { kindsUnder } from "../../../pages-system/page-type/page-type-descent/page-type-descent.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import type { Body } from "../../change-walking/change-walking.module.code.ts"
import {
  overEachFile,
  overEachText,
  TEXTS,
  waking,
} from "../../change-walking/change-walking.module.code.ts"
import type { Judged } from "../../judging/judging.module.code.ts"
import { pageIn } from "../page-named-as-stated/page-named-as-stated.code-check.code.ts"

const INSIDE = "akasha/"

const INSTANT_PROPERTY = "instant-property"

const CLOSING = "-at"

function reasonFor(pageTypeSlug: string, slug: string): string {
  return (
    `the page states its page type as \`${pageTypeSlug}\`, which stands under ` +
    `\`${INSTANT_PROPERTY}\`, and names itself \`${slug}\` — an instant property's slug closes ` +
    `with \`${CLOSING}\``
  )
}

function found(path: string, text: string, under: ReadonlySet<string>): readonly string[] {
  if (!path.startsWith(INSIDE)) return []
  const stated = pageIn(path, text)
  if (stated === null || !under.has(stated.pageTypeSlug)) return []
  if (stated.slug.endsWith(CLOSING)) return []
  return [reasonFor(stated.pageTypeSlug, stated.slug)]
}

export function reasonsIn(under: ReadonlySet<string>): (given: Body) => readonly string[] {
  return overEachText((path, text) => found(path, text, under))
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const under = kindsUnder(change.root, INSTANT_PROPERTY, shadow.reading, shadow.pageOf)
  return overEachFile(change, reasonsIn(under))
}

export const instantPropertySlugClosesWithAt = waking(TEXTS, refusalsIn)
