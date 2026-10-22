import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"

export const RACE_FIELDS: readonly string[] = [
  "slug",
  "key",
  "title",
  "altName",
  "esoRaceId",
  "hashPlace",
]

export type RaceTemplate = {
  readonly id: string
  readonly name: string
  readonly altName: string
  readonly esoRaceId: number
}

export function raceOf(row: Value): RaceTemplate {
  return {
    id: String(row.key),
    name: String(row.title),
    altName: typeof row.altName === "string" ? row.altName : "",
    esoRaceId: Number(row.esoRaceId),
  }
}

export const CLASS_FIELDS: readonly string[] = [
  "slug",
  "key",
  "title",
  "icon",
  "esoClassId",
  "hashPlace",
]

export type ClassTemplate = {
  readonly id: string
  readonly name: string
  readonly icon: string
  readonly esoClassId: number
}

export function classOf(row: Value): ClassTemplate {
  return {
    id: String(row.key),
    name: String(row.title),
    icon: typeof row.icon === "string" ? row.icon : "",
    esoClassId: Number(row.esoClassId),
  }
}

export const CLASS_MASTERY_FIELDS: readonly string[] = [
  "slug",
  "key",
  "title",
  "description",
  "esoSkillId",
  "class",
  "effects",
  "hashPlace",
]

export type ClassMasteryTemplate = {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly esoSkillId: number
  readonly classId: string
  readonly effects: readonly Effect[]
}

type ClassMasteryReading = {
  readonly keyOf: (said: unknown, where: string) => string
  readonly effectsOf: (row: Value, where: string) => readonly Value[]
}

export function classMasteryOf(row: Value, reading: ClassMasteryReading): ClassMasteryTemplate {
  const where = `the class mastery page \`${String(row.slug)}\``
  return {
    id: String(row.key),
    name: String(row.title),
    description: String(row.description ?? ""),
    esoSkillId: Number(row.esoSkillId),
    classId: reading.keyOf(row.class, where),
    effects: reading.effectsOf(row, where) as readonly Effect[],
  }
}
