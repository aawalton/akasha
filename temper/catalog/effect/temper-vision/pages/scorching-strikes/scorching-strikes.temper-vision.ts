import type { TemperVision } from "akasha/temper/catalog/effect/temper-vision/temper-vision.page-type.types.ts"

export const scorchingStrikes = {
  id: "01a188b6-21c0-7a1e-806c-1b59c4fb38c1",
  type: "page-type/temper-vision",
  slug: "scorching-strikes",
  title: "Scorching Strikes",
  key: "scorching-strikes",
  description:
    "The power of a forge waits at your fingertips!\n\nDamage dealt by Fire attacks increased by |cffffff20|r%.\n\n|cFFFFFFPART OF THE SCORCHING SET (|r|cffffff1|r|cFFFFFF/3 VISIONS)|r\nWhen you acquire |cFFFFFF3|r unique Scorching Visions you gain access to the Iron Atronach Utility Verse.",
  esoAbilityId: 200679,
  effects: "jsonl",
  createdAt: "2026-10-29T17:35:00.000Z",
  updatedAt: "2026-10-29T18:40:50.673Z",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game shows Flame Damage 27%, which this vision's 20% over the base 7% gives.",
    },
  ],
} as const satisfies TemperVision
