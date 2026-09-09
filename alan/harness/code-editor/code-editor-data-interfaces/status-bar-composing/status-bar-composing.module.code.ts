import { dirname, join } from "node:path"
import { readFleetUsage } from "@akasha/agents/claude-account-usage"
import { typeSlugOf, valuesOfType } from "@akasha/indexes"
import { wholeValue } from "@akasha/pages/page-uncommitted"
import {
  HABIT,
  inPlaceOrder,
  type Stoplight,
  stilled,
  stoplightWith,
  type Values,
} from "akasha/readouts/group-serving/readout-group-serving.module.code.ts"
import { readingHeldOn } from "akasha/readouts/serving/readout-serving.module.code.ts"
import { type Rung, rungsIn } from "akasha/readouts/tier/readout-tier.module.code.ts"
import {
  readingOf,
  type UsageReading,
} from "../../../../../editor-extension/status-bar-usage/status-bar-usage.module.code.ts"
import { glyphsOf, legendOf } from "../group-stoplights/group-stoplights.module.code.ts"

const READOUT = "01a05446-e760-7cb2-848b-4fcfc7ed45d4"

const READOUT_SCALE = "01a05446-e75f-756a-b8d9-4288a350957f"

const READOUT_GROUP = "01a05446-e75e-7657-acda-566edc2b182e"

const CLAUDE_ACCOUNT = "01a054d8-1d38-788f-a073-7cf3603acd3f"

const INBOX_GROUP = "inboxes"

const UPKEEP_GROUP = "upkeep"

const ATTRIBUTES_GROUP = "attributes"

const GROUPS: readonly string[] = [INBOX_GROUP, UPKEEP_GROUP, ATTRIBUTES_GROUP]

type Held = {
  readonly at: string
  readonly values: Values
}

function heldOfType(root: string, pageType: string): readonly Held[] {
  const found: Held[] = []
  for (const one of valuesOfType(root, typeSlugOf(root, pageType))) {
    found.push({ at: one.path, values: wholeValue(root, one.path, one.value) })
  }
  return found
}

function textIn(values: Values, key: string): string | null {
  const said = values[key]
  return typeof said === "string" && said !== "" ? said : null
}

function namesGroup(values: Values, groupSlug: string): boolean {
  const named = values.groups
  return Array.isArray(named) && named.includes(groupSlug)
}

export function watchedFoldersIn(root: string): readonly string[] {
  const found = new Set<string>()
  for (const pageType of [READOUT, CLAUDE_ACCOUNT]) {
    for (const one of valuesOfType(root, typeSlugOf(root, pageType))) {
      found.add(join(root, dirname(one.path)))
    }
  }
  return [...found].sort()
}

function stoplightsByGroup(root: string, now: Date): ReadonlyMap<string, readonly Stoplight[]> {
  const rungsBy = new Map<string, readonly Rung[]>()
  for (const one of heldOfType(root, READOUT_SCALE)) {
    const slug = textIn(one.values, "slug")
    if (slug !== null) rungsBy.set(slug, rungsIn(one.values))
  }

  const offScale = new Set<string>()
  for (const one of heldOfType(root, READOUT_GROUP)) {
    const slug = textIn(one.values, "slug")
    if (slug !== null && one.values.figureOffScale === true) offScale.add(slug)
  }

  const rows = heldOfType(root, READOUT).map((one) => one.values)
  const held = new Map<string, readonly Stoplight[]>()
  for (const groupSlug of GROUPS) {
    const figureOffScale = offScale.has(groupSlug)
    const found: Stoplight[] = []
    for (const row of inPlaceOrder(rows.filter((one) => namesGroup(one, groupSlug)))) {
      if (stilled(row)) continue
      const scaleSlug = textIn(row, "scale")
      const rungs = scaleSlug === null ? [] : (rungsBy.get(scaleSlug) ?? [])
      const one = stoplightWith(row, rungs, HABIT, (values) => readingHeldOn(values, now))
      if (one !== null) found.push(figureOffScale ? { ...one, figureOffScale } : one)
    }
    held.set(groupSlug, found)
  }
  return held
}

function sectionOf(
  held: ReadonlyMap<string, readonly Stoplight[]>,
  groupSlug: string
): StatusBarStoplights | null {
  const stoplights = held.get(groupSlug) ?? []
  if (stoplights.length === 0) return null
  return { glyphs: glyphsOf(stoplights), legend: legendOf(stoplights) }
}

function usageNow(): UsageReading | null {
  try {
    const fleet = readFleetUsage()
    return readingOf(fleet.session, fleet.weekly)
  } catch {
    return null
  }
}

export function statusBarLine(root: string, now: Date = new Date()): string {
  const held = stoplightsByGroup(root, now)
  return JSON.stringify({
    usage: usageNow(),
    inbox: sectionOf(held, INBOX_GROUP),
    upkeep: sectionOf(held, UPKEEP_GROUP),
    attributes: sectionOf(held, ATTRIBUTES_GROUP),
  } satisfies StatusBarState)
}
