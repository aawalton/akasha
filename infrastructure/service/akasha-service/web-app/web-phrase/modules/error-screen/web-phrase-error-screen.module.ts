import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const webPhraseErrorScreen = {
  id: "01a0e344-470f-7fb6-9408-404668d99144",
  type: "page-type/module",
  slug: "web-phrase-error-screen",
  definition: "the screen a site's root draws in place of a route that failed",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every word the screen says of the failure is a web phrase.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The screen says the phrases the root's loader read, read again as a phrase changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A site names the phrases it says for a missing page and a failure of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An address no route answers is thrown not found by a route, so the root's loader runs.",
    },
  ],
} as const satisfies Module
