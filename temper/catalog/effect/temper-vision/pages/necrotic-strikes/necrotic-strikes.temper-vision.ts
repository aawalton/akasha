import type { TemperVision } from "akasha/temper/catalog/effect/temper-vision/temper-vision.page-type.types.ts"

export const necroticStrikes = {
  id: "01a18903-2a39-7d95-8657-bbb941eb3be4",
  type: "page-type/temper-vision",
  slug: "necrotic-strikes",
  title: "Necrotic Strikes",
  key: "necrotic-strikes",
  description:
    "The creeping power of undeath is at your disposal!\n\nDamage dealt by Magic attacks increased by |cffffff20|r%.\n\n|cFFFFFFPART OF THE NECROTIC SET (|r|cffffff1|r|cFFFFFF/3 VISIONS)|r\nWhen you acquire |cffffff3|r unique Necrotic Visions you gain access to the Undead Avatar Offensive Verse.",
  esoAbilityId: 220563,
  effects: "jsonl",
  createdAt: "2026-10-29T18:54:08.000Z",
  updatedAt: "2026-10-29T18:54:08.000Z",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game shows Magic Damage 27%, which this vision's 20% over the base 7% gives.",
    },
  ],
} as const satisfies TemperVision
