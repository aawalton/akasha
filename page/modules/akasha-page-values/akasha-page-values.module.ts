import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const akashaPageValues = {
  id: "01a068a4-60f0-7005-b761-625a83147b3e",
  type: "page-type/module",
  slug: "akasha-page-values",
  definition:
    "the values an akasha page declares, in the shape the query engine gives a markdown page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page's camel keys become the kebab spelling every reader below this module uses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key already kebab is unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Kebabising a kebab key answers the same key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A slug and a page type come off the file name only where the body states no slug and no page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page whose body will not load answers with nothing rather than with an empty page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The values a page keeps outside the commit are put back before any value is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry property is left as its declaration says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows beside a page are found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An akasha page and a markdown page are one population.",
    },
  ],
} as const satisfies Module
