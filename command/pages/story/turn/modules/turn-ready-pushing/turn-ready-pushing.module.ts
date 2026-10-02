import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnReadyPushing = {
  id: "01a0e3eb-c9e7-75fd-af32-1f1ab36836f3",
  type: "page-type/module",
  slug: "turn-ready-pushing",
  definition: "the push telling Alan the next part of a story is ready for him",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn ready for Alan is a notification in his feed, and the notifier pushes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That notification is titled with the story's title and says which turn is ready.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That notification links to the played story's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A written chapter at player is a notification too, titled with its story's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's notification names the chapter and links to the chapter's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A push that fails or throws is named in the report and never thrown.",
    },
  ],
} as const satisfies Module
