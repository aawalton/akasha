import type { Module } from "@akasha/code-system/module"

export const questsDecide = {
  id: "01a0635f-391c-78a5-84e9-0cc44f22b3f1",
  pageTypeSlug: "module",
  slug: "quests-decide",
  definition: "which dialogue option to take, worked out from the menu and what came before",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An offered quest is accepted before the menu is read.",
    },
    {
      invariantKind: "departure",
      statement: "A completion the game announced is answered before the menu is read.",
    },
    {
      invariantKind: "departure",
      statement: "Persuasion and intimidation come ahead of every other option.",
    },
    {
      invariantKind: "departure",
      statement: "Quest options come ahead of plain talk.",
    },
    {
      invariantKind: "departure",
      statement: "Plain talk is explored once per option per menu.",
    },
    {
      invariantKind: "departure",
      statement: "Selecting the same option at the same menu twice running is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A menu offering a service is left alone until a quest has been acted on.",
    },
    {
      invariantKind: "departure",
      statement: "Leaving the dialogue forgets what the dialogue built up.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here calls the game.",
    },
  ],
} as const satisfies Module
