import { dirname, join } from "node:path"
import { readFleetUsage } from "akasha/agent/model/account/modules/usage/model-account-usage.module.code.ts"
import {
  glyphsOf,
  legendOf,
} from "akasha/alan/harness/code-editor/data-interface/modules/group-stoplights/group-stoplights.module.code.ts"
import {
  inPlaceOrder,
  type Stoplight,
  stilled,
  stoplightWith,
  type Values,
} from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.code.ts"
import { readingHeldOn } from "akasha/alan/harness/readout/modules/serving/readout-serving.module.code.ts"
import {
  type Rung,
  rungsIn,
} from "akasha/alan/harness/readout/modules/tier/readout-tier.module.code.ts"
import {
  readingOf,
  type UsageReading,
} from "akasha/code/editor/extension/modules/status-bar-usage/status-bar-usage.module.code.ts"
import {
  type WorkstationReading,
  workstationReadingOf,
} from "akasha/code/editor/extension/modules/status-bar-workstation/status-bar-workstation.module.code.ts"
import { textAt } from "akasha/code/type/narrowing/modules/text-at/text-at.module.code.ts"
import {
  typeSlugOf,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { wholeValue } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import {
  slugOf,
  slugsIn,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import "akasha/alan/harness/code-editor/data-interface/pages/status-bar/status-bar.code-editor-data-interface.d.ts"

const READOUT = "01a05446-e760-7cb2-848b-4fcfc7ed45d4"

const READOUT_SCALE = "01a05446-e75f-756a-b8d9-4288a350957f"

const READOUT_GROUP = "01a05446-e75e-7657-acda-566edc2b182e"

const CLAUDE_ACCOUNT = "01a054d8-1d38-788f-a073-7cf3603acd3f"

const INBOX_SECTION = "inbox"

const UPKEEP_SECTION = "upkeep"

const ATTRIBUTES_SECTION = "attributes"

const WORKSTATION_SECTION = "workstation"

const PROCESSOR_KEY = "processor"

const MEMORY_KEY = "memory"

const WIRE_KEY = "wireKey"

const WIRE_KEY_NAME = "wireKeyName"

const STATUS_BAR_SECTION = "statusBarSection"

type Group = {
  readonly slug: string
  readonly section: string
  readonly wireKeyName: string | null
  readonly figureOffScale: boolean
}

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

function namesGroup(values: Values, groupSlug: string): boolean {
  return slugsIn(values.groups).includes(groupSlug)
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

function rungsByScale(root: string): ReadonlyMap<string, readonly Rung[]> {
  const rungsBy = new Map<string, readonly Rung[]>()
  for (const one of heldOfType(root, READOUT_SCALE)) {
    const slug = textAt(one.values, "slug")
    if (slug !== null) rungsBy.set(slug, rungsIn(one.values))
  }
  return rungsBy
}

function groupsIn(root: string): readonly Group[] {
  const groups: Group[] = []
  for (const one of heldOfType(root, READOUT_GROUP)) {
    const slug = textAt(one.values, "slug")
    const section = textAt(one.values, STATUS_BAR_SECTION)
    if (slug === null || section === null) continue
    groups.push({
      slug,
      section,
      wireKeyName: textAt(one.values, WIRE_KEY_NAME),
      figureOffScale: one.values.figureOffScale === true,
    })
  }
  return groups.sort((one, two) => one.slug.localeCompare(two.slug))
}

function stoplightsIn(
  group: Group,
  rows: readonly Values[],
  rungsBy: ReadonlyMap<string, readonly Rung[]>
): readonly Stoplight[] {
  const { wireKeyName, figureOffScale } = group
  if (wireKeyName === null) return []
  const found: Stoplight[] = []
  for (const row of inPlaceOrder(rows.filter((one) => namesGroup(one, group.slug)))) {
    if (stilled(row)) continue
    const named = textAt(row, "scale")
    const scaleSlug = named === null ? null : slugOf(named)
    const rungs = scaleSlug === null ? [] : (rungsBy.get(scaleSlug) ?? [])
    const one = stoplightWith(row, rungs, wireKeyName, readingHeldOn)
    if (one !== null) found.push(figureOffScale ? { ...one, figureOffScale } : one)
  }
  return found
}

function sectionOf(stoplights: readonly Stoplight[]): StatusBarStoplights | null {
  if (stoplights.length === 0) return null
  return { glyphs: glyphsOf(stoplights), legend: legendOf(stoplights) }
}

function figureHeldOn(rows: readonly Values[], wireKey: string): number | null {
  const row = rows.find((one) => !stilled(one) && textAt(one, WIRE_KEY) === wireKey)
  if (row === undefined) return null
  const held = readingHeldOn(row)
  return held.held === "fresh" ? held.value : null
}

function workstationNow(here: readonly Values[]): WorkstationReading | null {
  return workstationReadingOf(figureHeldOn(here, PROCESSOR_KEY), figureHeldOn(here, MEMORY_KEY))
}

function usageNow(): UsageReading | null {
  try {
    const fleet = readFleetUsage()
    return readingOf(fleet.session, fleet.weekly)
  } catch {
    return null
  }
}

export function statusBarLine(root: string): string {
  const rows = heldOfType(root, READOUT).map((one) => one.values)
  const groups = groupsIn(root)
  const rungsBy = rungsByScale(root)
  const inSection = (section: string): readonly Group[] =>
    groups.filter((one) => one.section === section)
  const drawn = (section: string): StatusBarStoplights | null =>
    sectionOf(inSection(section).flatMap((group) => stoplightsIn(group, rows, rungsBy)))
  const working = inSection(WORKSTATION_SECTION)
  const workstationRows = rows.filter((row) => working.some((one) => namesGroup(row, one.slug)))
  return JSON.stringify({
    workstation: workstationNow(workstationRows),
    usage: usageNow(),
    inbox: drawn(INBOX_SECTION),
    upkeep: drawn(UPKEEP_SECTION),
    attributes: drawn(ATTRIBUTES_SECTION),
  } satisfies StatusBarState)
}
