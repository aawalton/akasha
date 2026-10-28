import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersBuildBars = {
  id: "01a18445-63e2-79b0-b525-1660f1845bcb",
  type: "page-type/module",
  slug: "characters-build-bars",
  definition: "slotting a character's target skills on the front and back bars",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is slotted through the game's own bar manager, which sends the change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot is matched by the name the game shows for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target skill not bought is bought, and one in another morph is morphed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Buying and a first morph happen without a respec where the points suffice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A changed morph, or points too few, starts a skill respec and does the work in it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A respec refunds active skills off the target only while points are too few.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No passive and no scribed skill is refunded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill respec's gold is paid without asking, and its cost is said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A scribed skill is named rather than slotted, since its target has no ability id.",
    },
  ],
  createdAt: "2026-10-28T20:48:22.497Z",
  updatedAt: "2026-10-28T21:08:49.086Z",
} as const satisfies Module
