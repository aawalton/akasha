import { existsSync } from "node:fs"
import { join } from "node:path"
import { SUBAGENT_MARK } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { everyOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { ownRepoRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { pagesAtFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const SEAT = "seat"

const SUBAGENT = "subagent"

const SUFFIX = ".subagent.ts"

export function slugOf(seatName: string, own: string): string {
  return `${seatName}-${own}`.replace(/-{2,}/g, "-")
}

export function agentIdOf(seatId: string, own: string): string {
  return `${seatId}${SUBAGENT_MARK}${own}`
}

function subagentsAt(root: string = ownRepoRoot()): string {
  return pagesAtFor(root, SUBAGENT)
}

export function akashaSubagentsDirIn(root: string): string {
  return `${root}/${subagentsAt(root)}`
}

export function pathOf(slug: string): string {
  return `${subagentsAt()}/${slug}/${slug}${SUFFIX}`
}

export function pathIn(root: string, slug: string): string {
  const flat = `${subagentsAt()}/${slug}${SUFFIX}`
  return existsSync(join(root, flat)) ? flat : pathOf(slug)
}

export function seatNamesIn(root: string): readonly string[] {
  const names: string[] = []
  for (const one of everyOfType(root, SEAT)) {
    const named = partedIn(one.path)
    if (named !== null && named.sections.length === 0 && named.pageType === SEAT) {
      names.push(named.slug)
    }
  }
  return names
}

export function underSeatNamed(names: readonly string[], seatName: string, slug: string): boolean {
  if (!slug.startsWith(`${seatName}-`)) return false
  return !names.some((one) => one.length > seatName.length && slug.startsWith(`${one}-`))
}

export function pathsUnder(root: string, seatName: string): readonly string[] {
  const names = seatNamesIn(root)
  return everyOfType(root, SUBAGENT)
    .map((one) => one.path)
    .filter((one) => {
      const slug = partedIn(one)?.slug
      return slug !== undefined && underSeatNamed(names, seatName, slug)
    })
    .sort()
}
