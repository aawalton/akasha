import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCaptureCodec = {
  id: "01a0616b-afa7-7b04-bf56-f33d15a63898",
  type: "page-type/module",
  slug: "character-capture-codec",
  definition: "the whole character build read out of the game into codec indices",
  code: "ts",
  hashIndexed: [
    "CHARACTER_ARMOR_SLOTS",
    "CHARACTER_JEWELRY_SLOTS",
    "CHARACTER_WEAPON_BARS",
    "CHARACTER_SKILL_SLOT_INDICES",
    "CHARACTER_CP_SLOT_INDICES",
    "CHARACTER_DISCIPLINE_INDICES",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A scribed skill on a bar is read by its grimoire and focus script.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A purchased passive is found by the id of any of its ranks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A purchased passive's rank is the upgrade level the game reports for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive the game reports no upgrade level for is captured with no rank.",
    },
  ],
  createdAt: "2026-09-02T09:20:42.407Z",
  updatedAt: "2026-10-19T23:36:54.423Z",
} as const satisfies Module
