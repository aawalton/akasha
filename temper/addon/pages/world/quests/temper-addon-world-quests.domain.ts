import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperAddonWorldQuests = {
  id: "01a0c6e3-c32e-7c78-96a8-837c1e4f5fcc",
  type: "page-type/domain",
  slug: "temper-addon-world-quests",
  definition: "a quest giver's dialogue answered in the player's place",
  parts: [
    "module/auto-quest-trace",
    "module/quests-auto-quest",
    "module/quests-chatter-name-tables",
    "module/quests-chatter-names",
    "module/quests-classify",
    "module/quests-constants",
    "module/quests-decide",
    "module/quests-entry",
    "module/quests-saved-variables",
    "module/quests-slash-command",
    "module/quests-trace",
    "module/quests-trace-buffer",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The options the dialogue offers are read afresh rather than remembered between reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest option is taken ahead of an option offering something else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An option already taken at one menu is not taken again at that menu.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A menu offering a service the player did not ask for is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The feature steps away once nothing in the dialogue is left to do.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game hands one dialogue option at a time rather than a whole menu.",
    },
  ],
  createdAt: "2026-09-22T02:13:30.542Z",
  updatedAt: "2026-09-22T02:23:36.000Z",
} as const satisfies Domain
