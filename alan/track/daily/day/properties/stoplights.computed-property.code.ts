import {
  constitutionIn,
  enduranceIn,
  gramsIn,
  strengthIn,
} from "akasha/alan/attribute/modules/points/attribute-points.computed-property-module.code.ts"
import { attributeConstitution } from "akasha/alan/attribute/readout/attribute-constitution/attribute-constitution.readout.ts"
import { attributeEndurance } from "akasha/alan/attribute/readout/attribute-endurance/attribute-endurance.readout.ts"
import { attributeStrength } from "akasha/alan/attribute/readout/attribute-strength/attribute-strength.readout.ts"
import {
  capacityHoursOf,
  capacityIn,
} from "akasha/alan/harness/capacity/modules/hours/capacity-hours.computed-property-module.code.ts"
import { upkeepCapacity } from "akasha/alan/harness/capacity/readouts/upkeep-capacity/upkeep-capacity.readout.ts"
import {
  dayAfter,
  dayBefore,
  openingInstantFromBlocks,
  windowSpanned,
} from "akasha/alan/harness/health-sample/day/modules/opening-span/opening-span.computed-property-module.code.ts"
import { resources } from "akasha/alan/harness/readout/group/pages/resources/resources.readout-group.ts"
import { readoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.ts"
import {
  rungsIn,
  TIER_GLYPH,
  tierAt,
} from "akasha/alan/harness/readout/modules/tier/readout-tier.computed-property-module.code.ts"
import { readoutGroup as readoutGroupRelation } from "akasha/alan/harness/readout/properties/readout-group.relation-property.ts"
import { readout as readoutType } from "akasha/alan/harness/readout/readout.page-type.ts"
import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"
import { upkeepSleep } from "akasha/alan/harness/sleep/readouts/upkeep-sleep/upkeep-sleep.readout.ts"
import { upkeepSurplus } from "akasha/alan/harness/surplus/readouts/upkeep-surplus/upkeep-surplus.readout.ts"
import { day, type WorkedDay } from "akasha/alan/track/daily/day/day.page-type.ts"
import { openUntil } from "akasha/alan/track/daily/day/modules/stretch-hours/stretch-hours.computed-property-module.code.ts"
import type { Stoplights } from "akasha/alan/track/daily/day/properties/stoplights.computed-property.types.ts"
import { foodEntry } from "akasha/alan/track/food-entry/food-entry.page-type.ts"
import type { FoodEntry } from "akasha/alan/track/food-entry/food-entry.page-type.types.ts"
import type { Reach, Work } from "akasha/page/computed-property/computed-property.page-type.ts"

const GROUP = `${readoutGroup.slug}/${resources.slug}`

const MEMBERS = `alan/harness/readout/group/pages/${resources.slug}/${resources.slug}.${readoutGroup.slug}.referenced-by.jsonl`

const NAMED_BY_GROUP = readoutGroupRelation.slug

const READOUT_FILE_END = `.${readoutType.slug}.ts`

const FOOD_ENTRIES = "alan/track/food-entry/pages"

const FOOD_ENTRY_FILE_END = `.${foodEntry.slug}.ts`

const DATE_LENGTH = 10

const NO_READING = "⚪"

type Values = Readonly<Record<string, unknown>>

type Member = { readonly readout: Readout; readonly place: number }

type DayReading = (page: WorkedDay, reach: Reach) => number | null

function textOf(reach: Reach, path: string): string {
  const filed = reach.file(path)
  return filed === null ? "" : new TextDecoder().decode(filed.read(0, filed.size))
}

function readoutSlugsIn(text: string): readonly string[] {
  const slugs: string[] = []
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue
    const named = JSON.parse(line) as { readonly propertySlug?: unknown; readonly path?: unknown }
    if (named.propertySlug !== NAMED_BY_GROUP || typeof named.path !== "string") continue
    const file = named.path.slice(named.path.lastIndexOf("/") + 1)
    if (file.endsWith(READOUT_FILE_END)) slugs.push(file.slice(0, -READOUT_FILE_END.length))
  }
  return slugs
}

function membersOf(reach: Reach): readonly Readout[] {
  const found: Member[] = []
  for (const slug of readoutSlugsIn(textOf(reach, MEMBERS))) {
    const readout = reach.target<Readout>(`${readoutType.slug}/${slug}`)
    if (readout === null || readout.enabled === false) continue
    const held = (readout.groups ?? []).find((one) => one.group === GROUP)
    if (held !== undefined) found.push({ readout, place: held.place })
  }
  return found.sort((one, two) => one.place - two.place).map((one) => one.readout)
}

function capacityOn(page: WorkedDay): number | null {
  const until = new Date(openUntil(page.date))
  return capacityIn(
    (page.sessions ?? []).map((one) => ({
      values: {
        "health-capacity-hours": capacityHoursOf(
          {
            title: one.title,
            "started-at": one.startedAt,
            "ended-at": one.endedAt,
            "safety-level": one.safetyLevel,
            "difficulty-level": one.difficultyLevel,
          },
          until
        ),
      },
    }))
  )
}

function foodEntriesNear(reach: Reach, date: string): readonly FoodEntry[] {
  const near = new Set([dayBefore(date), date, dayAfter(date)])
  const entries: FoodEntry[] = []
  for (const folder of reach.folder(FOOD_ENTRIES) ?? []) {
    if (!near.has(folder.slice(0, DATE_LENGTH))) continue
    for (const file of reach.folder(`${FOOD_ENTRIES}/${folder}`) ?? []) {
      if (!file.endsWith(FOOD_ENTRY_FILE_END)) continue
      const slug = file.slice(0, -FOOD_ENTRY_FILE_END.length)
      const entry = reach.target<FoodEntry>(`${foodEntry.slug}/${slug}`)
      if (entry !== null) entries.push(entry)
    }
  }
  return entries
}

function openingOf(worked: WorkedDay | null, date: string): Date | null {
  const blocks = (worked?.sessions ?? []).map((one) => ({
    title: one.title,
    startedAt: one.startedAt,
    endedAt: one.endedAt,
  }))
  return openingInstantFromBlocks(blocks, date)
}

function constitutionOn(page: WorkedDay, reach: Reach): number | null {
  const next = dayAfter(page.date)
  const window = windowSpanned(
    page.date,
    openingOf(page, page.date),
    openingOf(reach.target<WorkedDay>(`${day.slug}/${day.slug}-${next}`), next)
  )
  if (window === null) return null
  const eaten = foodEntriesNear(reach, page.date).filter(
    (one) => one.happenedAt >= window.from && one.happenedAt < window.to
  )
  return constitutionIn(gramsIn(eaten.map((one) => ({ values: { plantGrams: one.plantGrams } }))))
}

const ON_A_DAY: Readonly<Record<string, DayReading>> = {
  [upkeepSurplus.slug]: (page) => page.surplusHours ?? null,
  [upkeepCapacity.slug]: capacityOn,
  [attributeConstitution.slug]: constitutionOn,
  [attributeEndurance.slug]: (page) => enduranceIn({ "active-calories": page.activeCalories }),
  [attributeStrength.slug]: (page) => strengthIn({ "strength-volume": page.strengthVolume }),
  [upkeepSleep.slug]: (page) => page.sleepHours ?? null,
}

function lightOf(readout: Readout, page: WorkedDay, reach: Reach): string {
  const reading = ON_A_DAY[readout.slug]?.(page, reach) ?? null
  if (reading === null || readout.scale === undefined) return NO_READING
  const tiered = tierAt(reading, rungsIn(reach.target<Values>(readout.scale) ?? {}))
  return tiered === null ? NO_READING : TIER_GLYPH[tiered.tier]
}

export const work: Work<WorkedDay, Stoplights> = (page, reach) => {
  const members = membersOf(reach)
  if (members.length === 0) return null
  return members.map((readout) => lightOf(readout, page, reach)).join("")
}
