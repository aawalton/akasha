import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTaskHudView = {
  id: "01a11c82-12cd-76b2-8e5b-fdf64ecca3ec",
  type: "page-type/module",
  slug: "characters-task-hud-view",
  definition: "which quest the task display takes as focused, published for another add-on to read",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The view is published as the global `TemperCharactersTaskHudView` with one reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The view says the quest the display marks focused and the name it last synced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The view says how often the display has redrawn and when it last did.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each open quest says whether the game calls it assisted when asked with zero and with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading that throws answers nothing rather than reaching its reader.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here changes what the display draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The view reads back each row the last redraw kept, with its labels' text and color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The view reads back the display's window, its fragment and both window names it could have.",
    },
  ],
  createdAt: "2026-10-08T17:14:08.972Z",
  updatedAt: "2026-10-08T17:30:12.694Z",
} as const satisfies Module
