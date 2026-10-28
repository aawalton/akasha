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
      statement: "A skill's card whose kind holds slots is headed by that title and Unlocked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The kind is read off the world skill the card's skill is titled as.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The heading is left blank until the kind is read, so no wrong name shows first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A status card naming an ability of a kind holding slots shows neither a reward nor steps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A status card holds back a reward and steps until its name is read as no such ability.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A status card stating an ability's tier is headed as that tier's crossing.",
    },
  ],
  createdAt: "2026-09-02T17:25:53.928Z",
  updatedAt: "2026-10-28T14:44:27.149Z",
} as const satisfies Module
