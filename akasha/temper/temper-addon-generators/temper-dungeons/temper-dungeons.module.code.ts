import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const SOLO_DIFFICULTIES = ["easy", "medium", "hard", "impossible"] as const

const QUEST_GIVER_EAV_SCHEMA = z
  .object({
    epoch: z.string(),
    cycleLength: z.number().int().positive(),
  })
  .strict()

const DUNGEON_EAV_SCHEMA = z
  .object({
    key: z.string(),
    soloDifficulty: z.enum(SOLO_DIFFICULTIES),
    questGiver: z.string().nullable().optional(),
    rotationPosition: z.number().int().nonnegative().nullable().optional(),
  })
  .strict()

interface ParsedQuestGiver {
  id: string
  slug: string
  name: string
  epoch: string
  cycleLength: number
}

interface ParsedDungeon {
  key: string
  label: string
  soloDifficulty: (typeof SOLO_DIFFICULTIES)[number]
  questGiverSlug: string | null
  rotationPosition: number | null
}

function parseQuestGiver(row: Page): ParsedQuestGiver {
  if (row.title === null) {
    throw new Error(`temper-quest-giver row ${row.id} has null title`)
  }
  if (typeof row.slug !== "string" || row.slug === "") {
    throw new Error(`temper-quest-giver row ${row.id} has no slug for a dungeon to name it by`)
  }
  const eav = QUEST_GIVER_EAV_SCHEMA.parse({
    epoch: row.epoch,
    cycleLength: row.cycleLength,
  })
  return {
    id: row.id,
    slug: row.slug,
    name: row.title,
    epoch: eav.epoch,
    cycleLength: eav.cycleLength,
  }
}

function parseDungeon(row: Page): ParsedDungeon {
  if (row.title === null) {
    throw new Error(`temper-dungeon row ${row.id} has null title`)
  }
  const eav = DUNGEON_EAV_SCHEMA.parse({
    key: row.key,
    soloDifficulty: row.soloDifficulty,
    questGiver: row.questGiver,
    rotationPosition: row.rotationPosition,
  })
  return {
    key: eav.key,
    label: row.title,
    soloDifficulty: eav.soloDifficulty,
    questGiverSlug: eav.questGiver ?? null,
    rotationPosition: eav.rotationPosition ?? null,
  }
}

function validateRotation(giver: ParsedQuestGiver, dungeons: readonly ParsedDungeon[]): undefined {
  const slots = new Map<number, string>()
  for (const d of dungeons) {
    if (d.questGiverSlug !== giver.slug) continue
    if (d.rotationPosition === null) {
      throw new Error(
        `temper-dungeon ${d.key} relates to giver ${giver.name} but has null rotationPosition`
      )
    }
    const occupant = slots.get(d.rotationPosition)
    if (occupant !== undefined) {
      throw new Error(
        `temper-quest-giver ${giver.name}: position ${d.rotationPosition} occupied by both ${occupant} and ${d.key}`
      )
    }
    slots.set(d.rotationPosition, d.key)
  }
  for (let i = 0; i < giver.cycleLength; i++) {
    if (!slots.has(i)) {
      throw new Error(
        `temper-quest-giver ${giver.name}: position ${i} (of cycleLength ${giver.cycleLength}) is unfilled`
      )
    }
  }
  if (slots.size !== giver.cycleLength) {
    throw new Error(
      `temper-quest-giver ${giver.name}: cycleLength ${giver.cycleLength} but ${slots.size} dungeons reference this giver`
    )
  }
}

export function generateTemperDungeons(
  dungeonRows: readonly Page[],
  giverRows: readonly Page[]
): string {
  const givers = giverRows.map(parseQuestGiver)
  const dungeons = dungeonRows.map(parseDungeon)

  const sortedDungeons = [...dungeons].sort((a, b) => a.key.localeCompare(b.key))
  const sortedGivers = [...givers].sort((a, b) => a.id.localeCompare(b.id))

  for (const giver of sortedGivers) validateRotation(giver, sortedDungeons)

  const idBySlug = new Map(sortedGivers.map((g) => [g.slug, g.id]))

  const dungeonLines = sortedDungeons.map((d) => {
    const named = d.questGiverSlug === null ? null : idBySlug.get(d.questGiverSlug)
    if (d.questGiverSlug !== null && named === undefined) {
      throw new Error(
        `temper-dungeon ${d.key} names quest giver ${d.questGiverSlug}, which is the slug of no temper-quest-giver`
      )
    }
    const tail =
      named === null || named === undefined
        ? `questGiverId: null, rotationPosition: null`
        : `questGiverId: ${JSON.stringify(named)}, rotationPosition: ${d.rotationPosition}`
    return `  { key: ${JSON.stringify(d.key)}, label: ${JSON.stringify(d.label)}, soloDifficulty: ${JSON.stringify(d.soloDifficulty)}, ${tail} },`
  })

  const giverLines = sortedGivers.map((g) => {
    return `  { id: ${JSON.stringify(g.id)}, name: ${JSON.stringify(g.name)}, epoch: ${JSON.stringify(g.epoch)}, cycleLength: ${g.cycleLength} },`
  })

  return `\
/**
 * Temper Dungeons (Generated)
 *
 * ESO group dungeons + quest givers + rotation slots, sourced from the
 * universal pages table (page types: temper-dungeon, temper-quest-giver).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { Dungeon } from "../dungeon-registry"
import type { QuestGiver } from "../pledge-rotation"

export const TEMPER_DUNGEONS = [
${dungeonLines.join("\n")}
] as const satisfies readonly Dungeon[]

export const TEMPER_QUEST_GIVERS = [
${giverLines.join("\n")}
] as const satisfies readonly QuestGiver[]
`
}
