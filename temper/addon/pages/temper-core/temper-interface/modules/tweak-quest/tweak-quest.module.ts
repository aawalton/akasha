import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tweakQuest = {
  id: "01a06115-1ad3-722d-9be5-f889e3b30b29",
  type: "page-type/module",
  slug: "tweak-quest",
  definition: "the quest tracker the interface tweaks change",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tap of T cycles the focused quest whether the game's quest tracker is shown or hidden.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Holding T still cycles Golden Pursuits as the game has it.",
    },
  ],
  createdAt: "2026-09-02T07:46:08.211Z",
  updatedAt: "2026-10-08T17:57:00.672Z",
} as const satisfies Module
