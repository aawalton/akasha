import { namesIn, reaches } from "@akasha/indexes/reaching"
import type { Change } from "@akasha/pages-system/change"
import { namedUnder, pageNamed, partedIn } from "@akasha/pages-system/page-file-name"
import { type Value, valueIn } from "@akasha/pages-system/page-value"
import type { Shadow } from "@akasha/pages-system/shadow"
import type { Paged, Selector } from "../../../modules/change-walking/change-walking.module.code.ts"
import { bodyOf, input, PAGES } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const DOMAIN = "domain"

const PART_SLUGS = "part-slugs"

const PARTS = "partSlugs"

const THE_WHOLE = "akasha"

const ONE = 1

function theWhole(path: string): boolean {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0) return false
  return said.pageType === DOMAIN && said.slug === THE_WHOLE
}

const kindsHeld = new WeakMap<Shadow, ReadonlySet<string>>()

function kindsFor(shadow: Shadow): ReadonlySet<string> {
  const held = kindsHeld.get(shadow)
  if (held !== undefined) return held
  const found = shadow.index.kindsUnder(DOMAIN)
  kindsHeld.set(shadow, found)
  return found
}

function underDomain(path: string, shadow: Shadow): boolean {
  return namedUnder(path, kindsFor(shadow)) !== null
}

const UNDER_DOMAIN: Selector<Paged> = {
  named: "pages under domain",
  isInput: (path, shadow) => PAGES.isInput(path, shadow) && underDomain(path, shadow),
  from: (change, shadow) =>
    PAGES.from(change, shadow).filter((one) => underDomain(one.path, shadow)),
}

function partsOf(value: Value | null): readonly string[] {
  const held = value === null ? null : value[PARTS]
  return held === null || held === undefined ? [] : namesIn(held)
}

function partsWere(change: Change, path: string): readonly string[] {
  const bytes = change.before(path)
  if (bytes === null) return []
  return partsOf(valueIn(bodyOf({ root: change.root, path, bytes })))
}

function reasonFor(shown: string): string {
  return (
    `no page names \`${shown}\` among its parts — every page standing under ` +
    `\`${DOMAIN}\` but \`${DOMAIN}/${THE_WHOLE}\` is a part of a page above it`
  )
}

function sharedReason(shown: string, namers: number): string {
  return (
    `${String(namers)} pages name \`${shown}\` among their parts — every page under ` +
    `\`${DOMAIN}\` but \`${DOMAIN}/${THE_WHOLE}\` is a part of exactly one page above it`
  )
}

function loopReason(shown: string): string {
  return (
    `the pages above \`${shown}\` loop rather than reaching \`${DOMAIN}/${THE_WHOLE}\` — ` +
    `every page under \`${DOMAIN}\` is reached by reading down from the whole`
  )
}

function loops(shadow: Shadow, settled: Map<string, boolean>, from: string): boolean {
  const climbing: string[] = []
  const seen = new Set<string>()
  let at = from
  let ended = true
  for (;;) {
    const known = settled.get(at)
    if (known !== undefined) {
      ended = known
      break
    }
    if (seen.has(at)) break
    seen.add(at)
    climbing.push(at)
    const above = shadow.index.idsNaming(at, PART_SLUGS)[0]
    if (above === undefined) {
      ended = false
      break
    }
    at = above
  }
  for (const one of climbing) settled.set(one, ended)
  return ended
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const under = kindsFor(shadow)
  const pageTypes = shadow.index.pageTypesIn()
  const known = shadow.index.knownIn()
  const said: Judged[] = []
  const judged = new Set<string>()
  const settled = new Map<string, boolean>()
  const judge = (path: string, id: string, shown: string): undefined => {
    if (judged.has(path)) return
    judged.add(path)
    const namers = shadow.index.idsNaming(id, PART_SLUGS)
    if (namers.length === 0) {
      said.push({ path, reason: reasonFor(shown) })
      return
    }
    if (namers.length > ONE) {
      said.push({ path, reason: sharedReason(shown, namers.length) })
      return
    }
    if (loops(shadow, settled, id)) said.push({ path, reason: loopReason(shown) })
  }
  for (const path of change.changed) {
    if (!pageNamed(path, pageTypes)) continue
    for (const shown of partsWere(change, path)) {
      const reached = reaches(shown, DOMAIN, known)
      if (!("id" in reached)) continue
      const listed = known.byId(reached.id)
      if (listed === null || theWhole(listed.path)) continue
      judge(listed.path, reached.id, shown)
    }
    if (change.after(path) === null) continue
    const held = namedUnder(path, under)
    if (held === null || (held.pageTypeSlug === DOMAIN && held.slug === THE_WHOLE)) continue
    const one = shadow.index.listedByPath(path).find((filed) => filed.path === path)
    if (one === undefined) continue
    judge(path, one.id, `${held.pageTypeSlug}/${held.slug}`)
  }
  return said
}

export const domainIsNamedByAParent = input(UNDER_DOMAIN, refusalsIn)
