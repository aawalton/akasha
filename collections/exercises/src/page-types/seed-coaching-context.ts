import { askComposed } from "@shared/pages-query/ask"
import { CONSTRAINT_SEED, EQUIPMENT_SEED, MOBILITY_SEED } from "./coaching-seed-data"
import { createPage } from "../pages/access"
import type { Json } from "../pages/page"
import { slugStem } from "../tracking/derive"

async function createSeedPage(
  pageTypeSlug: string,
  title: string,
  properties: Readonly<Record<string, Json>>
): Promise<void> {
  await createPage(pageTypeSlug, slugStem(title), { title, ...properties })
}

export interface SeedCoachingResult {
  readonly equipmentCreated: number
  readonly equipmentExisting: number
  readonly constraintsCreated: number
  readonly constraintsExisting: number
  readonly mobilityCreated: number
  readonly mobilityExisting: number
}

async function existsByTitle(pageTypeSlug: string, title: string): Promise<boolean> {
  const asked = await askComposed({
    "page-type": pageTypeSlug,
    where: { title: { is: title } },
    keys: ["id"],
    limit: 1,
  })
  if (!asked.ok) throw new Error(`existsByTitle(${pageTypeSlug}): ${asked.why}`)
  return asked.answer.rows.length > 0
}

async function mobilityExists(metric: string, date: string, side: string): Promise<boolean> {
  const asked = await askComposed({
    "page-type": "mobility-reading",
    where: { metric: { is: metric }, date: { is: date }, side: { is: side } },
    keys: ["id"],
    limit: 1,
  })
  if (!asked.ok) throw new Error(`mobilityExists: ${asked.why}`)
  return asked.answer.rows.length > 0
}

export async function seedCoachingContext(): Promise<SeedCoachingResult> {
  let equipmentCreated = 0
  let equipmentExisting = 0
  for (const e of EQUIPMENT_SEED) {
    if (await existsByTitle("equipment-item", e.title)) {
      equipmentExisting += 1
      continue
    }
    const properties: Record<string, Json> = {
      category: e.category,
      configuration: e.configuration,
      loads: e.loads,
      available: e.available,
      notes: e.notes,
      sortOrder: e.sortOrder,
    }
    await createSeedPage("equipment-item", e.title, properties)
    equipmentCreated += 1
  }

  let constraintsCreated = 0
  let constraintsExisting = 0
  for (const c of CONSTRAINT_SEED) {
    if (await existsByTitle("coaching-constraint", c.title)) {
      constraintsExisting += 1
      continue
    }
    const properties: Record<string, Json> = {
      body: c.body,
      kind: c.kind,
      focusTags: [...c.focusTags],
      active: true,
      sortOrder: c.sortOrder,
    }
    await createSeedPage("coaching-constraint", c.title, properties)
    constraintsCreated += 1
  }

  let mobilityCreated = 0
  let mobilityExisting = 0
  for (const m of MOBILITY_SEED) {
    if (await mobilityExists(m.metric, m.date, m.side)) {
      mobilityExisting += 1
      continue
    }
    const sideSuffix = m.side !== "n-a" ? ` (${m.side})` : ""
    const properties: Record<string, Json> = {
      metric: m.metric,
      date: m.date,
      valueText: m.valueText,
      side: m.side,
      context: m.context,
      ...(m.valueNum !== undefined ? { valueNum: m.valueNum } : {}),
    }
    await createSeedPage("mobility-reading", `${m.metric} ${m.date}${sideSuffix}`, properties)
    mobilityCreated += 1
  }

  return {
    equipmentCreated,
    equipmentExisting,
    constraintsCreated,
    constraintsExisting,
    mobilityCreated,
    mobilityExisting,
  }
}
