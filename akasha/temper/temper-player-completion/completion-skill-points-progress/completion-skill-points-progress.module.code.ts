import type { SkillPointProgress } from "@akasha/temper-completion/completion-progress"
import type { CompletionCharacterRow } from "../completion-character-row/completion-character-row.module.code.ts"
import { isCharacterMeasured } from "../completion-measured/completion-measured.module.code.ts"
import type {
  CharacterSkillPointsProgress,
  SkillPointSourceProgress,
} from "../completion-ui-types/completion-ui-types.module.code.ts"
import { SKILL_POINT_GENERAL_SOURCES } from "../skill-point-general-sources/skill-point-general-sources.module.code.ts"
import { SKILL_POINT_GROUP_DUNGEON_SOURCES } from "../skill-point-group-dungeons/skill-point-group-dungeons.module.code.ts"
import { SKILL_POINT_PUBLIC_DUNGEON_SOURCES } from "../skill-point-public-dungeons/skill-point-public-dungeons.module.code.ts"
import { SKILL_POINT_ZONE_SOURCES } from "../skill-point-zone-sources/skill-point-zone-sources.module.code.ts"

function buildGeneralProgress(sp: SkillPointProgress): readonly SkillPointSourceProgress[] {
  return SKILL_POINT_GENERAL_SOURCES.map((source) => ({
    key: source.key,
    label: source.label,
    count: sp[source.key] ?? 0,
    total: source.maxValue,
  }))
}

function buildSkyshardsProgress(sp: SkillPointProgress): readonly SkillPointSourceProgress[] {
  return SKILL_POINT_ZONE_SOURCES.filter((zone) => zone.maxSkyshards > 0).map((zone) => ({
    key: zone.key,
    label: zone.label,
    count: sp.skyshards[zone.key] ?? 0,
    total: zone.maxSkyshards,
  }))
}

function buildZoneQuestsProgress(sp: SkillPointProgress): readonly SkillPointSourceProgress[] {
  return SKILL_POINT_ZONE_SOURCES.filter((zone) => zone.maxQuests > 0).map((zone) => ({
    key: zone.key,
    label: zone.label,
    count: sp.zoneQuests[zone.key] ?? 0,
    total: zone.maxQuests,
  }))
}

function buildGroupDungeonsProgress(sp: SkillPointProgress): readonly SkillPointSourceProgress[] {
  return SKILL_POINT_GROUP_DUNGEON_SOURCES.map((dungeon) => ({
    key: dungeon.key,
    label: dungeon.label,
    count: sp.groupDungeons[dungeon.key] ?? 0,
    total: 1,
  }))
}

function buildPublicDungeonsProgress(sp: SkillPointProgress): readonly SkillPointSourceProgress[] {
  return SKILL_POINT_PUBLIC_DUNGEON_SOURCES.map((dungeon) => ({
    key: dungeon.key,
    label: dungeon.label,
    count: sp.publicDungeons[dungeon.key] ?? 0,
    total: 1,
  }))
}

function sumProgress(entries: readonly SkillPointSourceProgress[]): {
  count: number
  total: number
} {
  let count = 0
  let total = 0
  for (const e of entries) {
    count += e.count
    total += e.total
  }
  return { count, total }
}

export function resolveSkillPointItemProgress(
  sp: SkillPointProgress | null | undefined,
  itemPath: readonly (string | number)[]
): { current: number; total: number } | undefined {
  if (itemPath.length !== 2) return undefined
  const branch = String(itemPath[0])
  const key = String(itemPath[1])

  switch (branch) {
    case "general": {
      const source = SKILL_POINT_GENERAL_SOURCES.find((s) => s.key === key)
      if (!source) return undefined
      return { current: sp ? (sp[source.key] ?? 0) : 0, total: source.maxValue }
    }
    case "skyshards": {
      const zone = SKILL_POINT_ZONE_SOURCES.find((z) => z.key === key)
      if (!zone || zone.maxSkyshards === 0) return undefined
      return { current: sp ? (sp.skyshards[key] ?? 0) : 0, total: zone.maxSkyshards }
    }
    case "zoneQuests": {
      const zone = SKILL_POINT_ZONE_SOURCES.find((z) => z.key === key)
      if (!zone || zone.maxQuests === 0) return undefined
      return { current: sp ? (sp.zoneQuests[key] ?? 0) : 0, total: zone.maxQuests }
    }
    case "groupDungeons": {
      const dungeon = SKILL_POINT_GROUP_DUNGEON_SOURCES.find((d) => d.key === key)
      if (!dungeon) return undefined
      return { current: sp ? (sp.groupDungeons[key] ?? 0) : 0, total: 1 }
    }
    case "publicDungeons": {
      const dungeon = SKILL_POINT_PUBLIC_DUNGEON_SOURCES.find((d) => d.key === key)
      if (!dungeon) return undefined
      return { current: sp ? (sp.publicDungeons[key] ?? 0) : 0, total: 1 }
    }
    default:
      return undefined
  }
}

export function transformSkillPointsProgress(
  rows: readonly CompletionCharacterRow[]
): readonly CharacterSkillPointsProgress[] {
  const result: CharacterSkillPointsProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    const sp = completion.skillPoints
    if (!sp) {
      const general = SKILL_POINT_GENERAL_SOURCES.map((s) => ({
        key: s.key,
        label: s.label,
        count: 0,
        total: s.maxValue,
      }))
      const skyshards = SKILL_POINT_ZONE_SOURCES.filter((z) => z.maxSkyshards > 0).map((z) => ({
        key: z.key,
        label: z.label,
        count: 0,
        total: z.maxSkyshards,
      }))
      const zoneQuests = SKILL_POINT_ZONE_SOURCES.filter((z) => z.maxQuests > 0).map((z) => ({
        key: z.key,
        label: z.label,
        count: 0,
        total: z.maxQuests,
      }))
      const groupDungeons = SKILL_POINT_GROUP_DUNGEON_SOURCES.map((d) => ({
        key: d.key,
        label: d.label,
        count: 0,
        total: 1,
      }))
      const publicDungeons = SKILL_POINT_PUBLIC_DUNGEON_SOURCES.map((d) => ({
        key: d.key,
        label: d.label,
        count: 0,
        total: 1,
      }))

      const totalCount =
        sumProgress(general).total +
        sumProgress(skyshards).total +
        sumProgress(zoneQuests).total +
        sumProgress(groupDungeons).total +
        sumProgress(publicDungeons).total

      result.push({
        characterId: row.id,
        general,
        skyshards,
        zoneQuests,
        groupDungeons,
        publicDungeons,
        completedCount: 0,
        totalCount,
      })
      continue
    }

    const general = buildGeneralProgress(sp)
    const skyshards = buildSkyshardsProgress(sp)
    const zoneQuests = buildZoneQuestsProgress(sp)
    const groupDungeons = buildGroupDungeonsProgress(sp)
    const publicDungeons = buildPublicDungeonsProgress(sp)

    const g = sumProgress(general)
    const s = sumProgress(skyshards)
    const zq = sumProgress(zoneQuests)
    const gd = sumProgress(groupDungeons)
    const pd = sumProgress(publicDungeons)

    result.push({
      characterId: row.id,
      general,
      skyshards,
      zoneQuests,
      groupDungeons,
      publicDungeons,
      completedCount: g.count + s.count + zq.count + gd.count + pd.count,
      totalCount: g.total + s.total + zq.total + gd.total + pd.total,
    })
  }

  return result
}
