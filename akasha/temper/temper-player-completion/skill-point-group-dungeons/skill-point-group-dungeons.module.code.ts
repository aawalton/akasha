import { TEMPER_DUNGEONS } from "@akasha/temper-dungeons/dungeon-data"
import type { SkillPointDungeonSource } from "../skill-point-source-types/skill-point-source-types.module.code.ts"

export const SKILL_POINT_GROUP_DUNGEON_SOURCES: readonly SkillPointDungeonSource[] =
  TEMPER_DUNGEONS.map((dungeon) => ({ key: dungeon.key, label: dungeon.label }))
