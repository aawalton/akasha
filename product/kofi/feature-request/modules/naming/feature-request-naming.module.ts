import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const featureRequestNaming = {
  id: "01a0c506-47e8-72fc-b65b-87da14672240",
  type: "page-type/module",
  slug: "feature-request-naming",
  definition: "the name a feature request is reached by, minted from the ask it carries",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request is named by its ask folded to a stem and cut to eighty characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask is folded by `page-stem` rather than folded again here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cut leaving a dash at either end is folded again, so no name ends in one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask folding to nothing is named `request`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name another request holds takes a number, the first offered being two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number another request holds gives way to the next number up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number is added past the eighty rather than fitted inside them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads which names are taken, the caller handing those in.",
    },
  ],
} as const satisfies Module
