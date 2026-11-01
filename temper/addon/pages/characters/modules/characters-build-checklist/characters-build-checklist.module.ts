import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersBuildChecklist = {
  id: "01a18414-31ea-7f5e-aa76-4640a561f46c",
  type: "page-type/module",
  slug: "characters-build-checklist",
  definition: "what the current character has against its target build, part by part",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The targets are read from the characters config by the current character's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The target is the one chosen in the game, else the first the config lists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The target carries what was saved over it in the game and not yet read back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A choice made over a build the config no longer lists first is ignored.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build made in the game is chosen by the change that made it, and shown as saved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A discipline is met when every star holds the points the plan gives it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bar slot is met when the slotted ability bears the target's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gear slot is met by its set and, where the target names one, its trait.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Mundus and food are met by their buff being on the character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A curse is met when the character's curse has the name the target gives, or none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive is met when it is bought to its target rank or higher.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Passives come last, so their many lines push no other part off the panel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part the target leaves empty is no line.",
    },
  ],
  createdAt: "2026-10-28T19:54:38.440Z",
  updatedAt: "2026-11-01T23:27:56.424Z",
} as const satisfies Module
