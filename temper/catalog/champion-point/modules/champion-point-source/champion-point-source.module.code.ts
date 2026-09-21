import { createDataFile } from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import { craftPassives } from "akasha/temper/catalog/champion-point/modules/craft-passives/craft-passives.module.code.ts"
import { craftSlottables } from "akasha/temper/catalog/champion-point/modules/craft-slottables/craft-slottables.module.code.ts"
import { fitnessPassives } from "akasha/temper/catalog/champion-point/modules/fitness-passives/fitness-passives.module.code.ts"
import { fitnessSlottables } from "akasha/temper/catalog/champion-point/modules/fitness-slottables/fitness-slottables.module.code.ts"
import { warfarePassives } from "akasha/temper/catalog/champion-point/modules/warfare-passives/warfare-passives.module.code.ts"
import { warfareSlottables } from "akasha/temper/catalog/champion-point/modules/warfare-slottables/warfare-slottables.module.code.ts"
import type { Effect } from "akasha/temper/formula-framework/modules/effect/effect.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/formula-framework/modules/effect-source/effect-source.module.code.ts"

type ChampionPointSubcategoryId =
  | "craft-passives"
  | "craft-slottables"
  | "warfare-passives"
  | "warfare-slottables"
  | "fitness-passives"
  | "fitness-slottables"

export interface ChampionPointTemplate extends EffectSourceInterface<"champion-points", Effect> {
  categoryId: "champion-points"
  subcategoryId: ChampionPointSubcategoryId
  name: string
  description: string
  esoChampionSkillId: number
  isSlottable: boolean
}

const CHAMPION_POINTS = {
  ...craftPassives.data,
  ...craftSlottables.data,
  ...fitnessPassives.data,
  ...fitnessSlottables.data,
  ...warfarePassives.data,
  ...warfareSlottables.data,
} satisfies Record<string, ChampionPointTemplate>

export const MAX_CHAMPION_POINTS = 3600

export const championPoints = createDataFile<ChampionPointTemplate>()(CHAMPION_POINTS)

export type ChampionPointSource = ChampionPointTemplate & { id: ChampionPointId }

export type ChampionPointId = (typeof championPoints.ids)[number]
