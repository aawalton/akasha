import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const capacityClassification = {
  id: "01a0623c-6939-7dce-a9f7-3cfecdd8823a",
  type: "page-type/module",
  slug: "capacity-classification",
  definition: "what an error from Anthropic shows about a model account's budget",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A window status present with a value other than allowed is capacity.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Both window statuses allowed is not capacity.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rejected overage under allowed windows is not capacity.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Both window headers absent with an overage disabled reason is not capacity.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Both window headers absent with a body naming fast-mode credits is not capacity.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window status header absent leaves the 429 unclassified.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One window header present and one absent is unclassified whatever the overage headers have.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body is read only where both window headers are absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A header value is read with case folded away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A header value that is blank is read as absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unclassified 429 names the window headers that were absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every class has a reason naming the values the headers held.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The body is matched for fast-mode credits by substring rather than by a parse.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides the answer to a 429.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the account or the model the 429 came from.",
    },
  ],
} as const satisfies Module
