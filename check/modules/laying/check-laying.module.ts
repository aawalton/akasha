import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkLaying = {
  id: "01a0d904-eea5-7fca-a200-f1b698a3f53f",
  type: "page-type/module",
  slug: "check-laying",
  definition: "the checks and what they import laid out on disk as a change leaves them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change alters the checks where a path it touches is named as a check page is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tree laid out holds every path as the root holds it, save what the change moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the change leaves as the root holds it is a link to the root's own file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the change moved is written as the change leaves it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file a check imports is written again where it reaches a path the change moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A check page or code the change takes away stays, so the check is taken away by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An import is followed where it names this code by its own name or by a relative path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tree laid out is swept by the caller once the checks are loaded and have judged.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here loads a check.",
    },
  ],
} as const satisfies Module
