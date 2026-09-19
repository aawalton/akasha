import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { pageShaped, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  recordsIn,
  slugOf,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const COMMAND_TREE = "command-tree"

export const DOMAIN_TREE = "domain-tree"

export const FINDING_TREE = "finding-tree"

export const GAP_TREE = "gap-tree"

export const PAGE_TREE = "page-tree"

const REFERENCED_BY = ".referenced-by.jsonl"

const PAGE_TYPE = "page-type"

const PERSONA = "persona"

const FINDING = "finding"

const COMMAND = "command"

const NAMESPACE = "namespace"

const ID = "id"

const SLUG = "slug"

const PARTS = "parts"

const EXTENDS = "extends"

const PROPERTIES = "properties"

const CHAMPIONED = "championedDomain"

const DEFINITION = "definition"

const DOMAIN = "domain"

const CLAIM = "claim"

const DECISIONS = "decisions"

const DECISION_KIND = "decisionKind"

const STATEMENT = "statement"

const GAP = "gap"

type Moved = {
  readonly pageType: string
  readonly was: Value | null
  readonly now: Value | null
}

function valuedIn(body: Uint8Array | null): Value | null {
  const text = textOf(body)
  return text === null ? null : valueIn(text)
}

function movedIn(change: Change): readonly Moved[] {
  const found: Moved[] = []
  for (const path of change.changed) {
    if (!pageShaped(path)) continue
    const parted = partedIn(path)
    if (parted === null) continue
    found.push({
      pageType: parted.pageType,
      was: valuedIn(change.before(path)),
      now: valuedIn(change.after(path)),
    })
  }
  return found
}

function alike(was: unknown, now: unknown): boolean {
  return JSON.stringify(was ?? null) === JSON.stringify(now ?? null)
}

function moved(one: Moved, key: string): boolean {
  return !alike(one.was?.[key], one.now?.[key])
}

function appeared(one: Moved): boolean {
  return (one.was === null) !== (one.now === null)
}

function domainsMoved(change: Change, pages: readonly Moved[]): boolean {
  if (change.changed.some((path) => path.endsWith(REFERENCED_BY))) return true
  return pages.some(
    (one) =>
      appeared(one) ||
      moved(one, ID) ||
      moved(one, PARTS) ||
      (one.pageType === PAGE_TYPE && moved(one, EXTENDS)) ||
      (one.pageType === PERSONA && moved(one, CHAMPIONED))
  )
}

function gapsSaid(value: Value | null): readonly string[] {
  if (value === null) return []
  const said: string[] = []
  for (const one of recordsIn(value[DECISIONS])) {
    const kind = one[DECISION_KIND]
    const text = textAt(one, STATEMENT)
    if (typeof kind !== "string" || slugOf(kind) !== GAP || text === null) continue
    said.push(text)
  }
  return said
}

function pageMoved(one: Moved): boolean {
  if (appeared(one)) return true
  if (one.pageType !== PAGE_TYPE) return false
  return moved(one, SLUG) || moved(one, EXTENDS) || moved(one, PROPERTIES)
}

function commandMoved(one: Moved): boolean {
  if (one.pageType !== COMMAND && one.pageType !== NAMESPACE) return false
  return moved(one, DEFINITION)
}

function findingMoved(one: Moved): boolean {
  if (one.pageType !== FINDING) return false
  return moved(one, DOMAIN) || moved(one, CLAIM)
}

export function turnedIn(change: Change): ReadonlySet<string> {
  const pages = movedIn(change)
  const turned = new Set<string>()
  if (domainsMoved(change, pages)) {
    turned.add(COMMAND_TREE)
    turned.add(DOMAIN_TREE)
    turned.add(FINDING_TREE)
    turned.add(GAP_TREE)
  }
  for (const one of pages) {
    if (pageMoved(one)) turned.add(PAGE_TREE)
    if (commandMoved(one)) turned.add(COMMAND_TREE)
    if (findingMoved(one)) turned.add(FINDING_TREE)
    if (!alike(gapsSaid(one.was), gapsSaid(one.now))) turned.add(GAP_TREE)
  }
  return turned
}
