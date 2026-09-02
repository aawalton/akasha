import type { Module } from "@akasha/code-system/module"

export const capacityClassification = {
  id: "01a0623c-6939-7dce-a9f7-3cfecdd8823a",
  pageTypeSlug: "module",
  slug: "capacity-classification",
  definition: "what a 429 from upstream says about capacity",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A window status present and other than allowed is capacity.",
    },
    {
      invariantKind: "departure",
      statement: "Both window statuses allowed is not capacity.",
    },
    {
      invariantKind: "departure",
      statement: "A rejected overage under allowed windows is not capacity.",
    },
    {
      invariantKind: "departure",
      statement: "Both window headers absent with an overage disabled reason is not capacity.",
    },
    {
      invariantKind: "departure",
      statement: "Both window headers absent with a body naming fast-mode credits is not capacity.",
    },
    {
      invariantKind: "departure",
      statement: "A window status header absent leaves the 429 unclassified.",
    },
    {
      invariantKind: "departure",
      statement:
        "One window header present and one absent is unclassified whatever the overage headers hold.",
    },
    {
      invariantKind: "departure",
      statement: "The body is read only where both window headers are absent.",
    },
    {
      invariantKind: "departure",
      statement: "A header value is read with case folded away.",
    },
    {
      invariantKind: "departure",
      statement: "A header value that is blank is read as absent.",
    },
    {
      invariantKind: "departure",
      statement: "An unclassified 429 names the window headers that were absent.",
    },
    {
      invariantKind: "departure",
      statement: "Every class carries a reason naming what the headers said.",
    },
    {
      invariantKind: "stopgap",
      statement: "The body is matched for fast-mode credits by substring rather than by a parse.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what to do about a 429.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the account or the model the 429 came from.",
    },
  ],
} as const satisfies Module
