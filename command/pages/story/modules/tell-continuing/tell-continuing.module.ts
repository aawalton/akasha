import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tellContinuing = {
  id: "01a0f379-63a6-7346-9559-d04cd3c9abec",
  type: "page-type/module",
  slug: "tell-continuing",
  definition: "where a new fact or a secret is told when the lore page named is full",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A new fact or a secret taking its page past the length ceiling is told on a continuation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A secret told on a continuation leaves its page's secrets file all the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A continuation is a lore page about the page's target, in its world's lore folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming no target is the target of its own continuations.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A continuation's slug is its first page's slug with the next free count from 2.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A continuation named is continued from its first page, so no slug takes two counts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A slug ending in a count continues the slug before it where both have one target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A continuation's title is its first page's title, continued once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The newest continuation with room takes the fact, and a new one is made where it has none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page of that slug about another target is no continuation, and its count is passed over.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A fact already told on the page is never moved to a continuation.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies Module
