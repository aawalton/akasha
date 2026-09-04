import type { Module } from "@akasha/code-system/module"

export const servedTip = {
  id: "01a0691b-4f64-7e7b-882f-6c45e18374af",
  pageTypeSlug: "module",
  slug: "served-tip",
  definition: "the commit a branch stands at on the transport, and whether a commit stands locally",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The transport asked is origin.",
    },
    {
      invariantKind: "departure",
      statement:
        "A transport that does not answer, or answers nothing, is null rather than a throw.",
    },
    {
      invariantKind: "departure",
      statement: "Asking the transport is capped the way every network git call here is capped.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here fetches.",
    },
  ],
} as const satisfies Module
