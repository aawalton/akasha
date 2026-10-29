import type { TemperVision } from "akasha/temper/catalog/effect/temper-vision/temper-vision.page-type.types.ts"

export const focusedEfforts = {
  id: "01a18903-2a39-7350-95eb-008acb27fec4",
  type: "page-type/temper-vision",
  slug: "focused-efforts",
  title: "Focused Efforts",
  key: "focused-efforts",
  description:
    "Odds seem to be going your way.\n\nChance to apply a status effect increased by |cffffff12|r% and damage done by status effects increased by |cffffff500|r% per stack.\n\nCurrent Bonuses:\nApply Chance: |cffffff12|r%\nDamage Done: |cffffff500|r%",
  esoAbilityId: 200904,
  effects: "jsonl",
  createdAt: "2026-10-29T18:54:08.000Z",
  updatedAt: "2026-10-29T18:54:08.000Z",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Captured Burning ticks rise about 2.5 times, so its 500% joins the damage-done sum.",
    },
  ],
} as const satisfies TemperVision
