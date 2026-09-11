import { POTIONS_CRAFTED } from "akasha/temper/alchemy/potions-crafted/potions-crafted.module.code.ts"
import { POTIONS_CROWN } from "akasha/temper/alchemy/potions-crown/potions-crown.module.code.ts"
import { POTIONS_DROPPED } from "akasha/temper/alchemy/potions-dropped/potions-dropped.module.code.ts"
import type { REAGENTS } from "akasha/temper/alchemy/reagent/reagent.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/formula-framework/effect-source/effect-source.module.code.ts"
import { createSourceFile } from "akasha/temper/formula-framework/source-file/source-file.module.code.ts"

type ReagentName = (typeof REAGENTS)[number]["name"]

export interface PotionsTemplate extends EffectSourceInterface {
  categoryId: "potions"
  subcategoryId: "crafted" | "crown" | "dropped" | "none"
  name: string
  description: string
  itemId: number
  icon: string
  level: string
  seconds: number
  reagents?: readonly (readonly ReagentName[])[]
}

const NO_POTION = {
  categoryId: "potions" as const,
  subcategoryId: "none" as const,
  effects: [],
  id: "no-potion" as const,
  name: "No Potion",
  itemId: 0,
  icon: "",
  seconds: 0,
  description: "",
  level: "",
} satisfies PotionsTemplate

const POTIONS = {
  "no-potion": NO_POTION,
  ...POTIONS_CROWN,
  ...POTIONS_DROPPED,
  ...POTIONS_CRAFTED,
} satisfies Record<string, PotionsTemplate>

export const potions = createSourceFile<PotionsTemplate>()(POTIONS)

export type PotionSource = PotionsTemplate & { id: PotionId }

export type PotionId = (typeof potions.ids)[number]
