import type { EffectSourceInterface } from "@akasha/temper-formula-framework/effect-source"
import { createSourceFile } from "@akasha/temper-formula-framework/source-file"

interface EsoPlusTemplate extends EffectSourceInterface {
  categoryId: "account"
  name: string
  description: string
}

const ESO_PLUS_DATA = {
  "no-eso-plus": {
    id: "no-eso-plus" as const,
    name: "No ESO Plus",
    description: "No ESO Plus subscription active",
    categoryId: "account" as const,
    effects: [],
  },
  "eso-plus-active": {
    id: "eso-plus-active" as const,
    name: "ESO Plus",
    description:
      "ESO Plus subscription provides 10% bonus to experience, inspiration, gold, alliance points, and tel var stones",
    categoryId: "account" as const,
    effects: [
      {
        metricId: "experience-gain" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
      {
        metricId: "inspiration-gain" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
      {
        metricId: "gold-gain" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
      {
        metricId: "alliance-points-gain" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
      {
        metricId: "tel-var-gain" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
    ],
  },
} satisfies Record<string, EsoPlusTemplate>

export const esoPlus = createSourceFile<EsoPlusTemplate>()(ESO_PLUS_DATA)

export type EsoPlusId = (typeof esoPlus.ids)[number]
