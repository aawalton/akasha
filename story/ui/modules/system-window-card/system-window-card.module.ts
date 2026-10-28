import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const systemWindowCard = {
  id: "01a06327-e488-7762-ad43-9a83d08d2b73",
  type: "page-type/module",
  slug: "system-window-card",
  definition: "a system window drawn as its type's card",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill's card is headed by its ability kind's title, or by Skill where none is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The kind is read off the world skill the card's skill is titled as.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The heading is left blank until the kind is read, so no wrong name shows first.",
    },
  ],
  createdAt: "2026-09-02T17:25:53.928Z",
  updatedAt: "2026-10-28T00:59:16.919Z",
} as const satisfies Module
