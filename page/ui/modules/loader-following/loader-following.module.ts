import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loaderFollowing = {
  id: "01a0d586-9230-7c24-9d73-9656d5d8fa48",
  type: "page-type/module",
  slug: "loader-following",
  definition: "a route's server data read again when a page type it reads changes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A route whose loader reads pages follows the lists that loader reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a route follows on the one stream the tab's page store holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A route following before anything opened that stream opens it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A route whose loader reads one page follows that page by id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change pushed to one of those lists runs the route's loaders again in place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every route following in a tab shares one pacing, since one run reads every loader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Changes pushed less than a second apart run the loaders once, a second after the last.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Changes pushed without a quiet second still run the loaders within three seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tab runs the loaders once at a time, and changes pushed meanwhile owe one run more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Code reading pages outside the store follows their lists through the same call.",
    },
  ],
} as const satisfies Module
