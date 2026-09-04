import type { Change } from "@akasha/pages-system/change"
import type { Shadow } from "@akasha/pages-system/shadow"
import type { Body } from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  input,
  overEachFile,
  overEachText,
  TEXTS,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { pageIn } from "../page-named-as-stated/page-named-as-stated.code-check.code.ts"

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
  const stated = pageIn(path, text)
  if (stated === null || !under.has(stated.pageTypeSlug)) return []
  if (stated.slug.endsWith(CLOSING)) return []
  return [reasonFor(stated.pageTypeSlug, stated.slug)]
}

export function reasonsIn(under: ReadonlySet<string>): (given: Body) => readonly string[] {
  return overEachText((path, text) => found(path, text, under))
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const under = shadow.index.kindsUnder(INSTANT_PROPERTY)
  return overEachFile(change, reasonsIn(under))
}

export const instantPropertySlugClosesWithAt = input(TEXTS, refusalsIn)
