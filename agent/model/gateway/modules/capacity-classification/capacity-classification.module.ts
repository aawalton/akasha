import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const capacityClassification = {
  id: "01a0623c-6939-7dce-a9f7-3cfecdd8823a",
  type: "page-type/module",
  slug: "capacity-classification",
  definition: "what a 429 from upstream says about capacity",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A window status present with a value other than allowed is capacity.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Both window statuses allowed is not capacity.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rejected overage under allowed windows is not capacity.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Both window headers absent with an overage disabled reason is not capacity.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Both window headers absent with a body naming fast-mode credits is not capacity.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A window status header absent leaves the 429 unclassified.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "One window header present and one absent is unclassified whatever the overage headers have.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body is read only where both window headers are absent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A header value is read with case folded away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A header value that is blank is read as absent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unclassified 429 names the window headers that were absent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every class has a reason naming the values the headers held.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "The body is matched for fast-mode credits by substring rather than by a parse.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides the answer to a 429.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the account or the model the 429 came from.",
    },
  ],
} as const satisfies Module
