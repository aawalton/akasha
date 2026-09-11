import type { EffectSourceInterface } from "akasha/temper/formula-framework/effect-source/effect-source.module.code.ts"
import { createSourceFile } from "akasha/temper/formula-framework/source-file/source-file.module.code.ts"

interface PoisonTemplate extends EffectSourceInterface {
  categoryId: "poisons"
  name: string
}

const POISONS = {
  "no-poison": {
    id: "no-poison" as const,
    name: "No Poison",
    categoryId: "poisons" as const,
    effects: [],
  },
} satisfies Record<string, PoisonTemplate>

export const poisons = createSourceFile<PoisonTemplate>()(POISONS)
