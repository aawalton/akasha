import type { Module } from "@akasha/code-system/module"

export const captureError = {
  id: "01a05bd6-c529-7e1b-b455-c42e0f069da5",
  pageTypeSlug: "module",
  slug: "capture-error",
  definition: "an error a client met, filed as a page",
  code: "ts",
  invariants: [
    {
      invariantKind: "gap",
      statement: "A capture refuses and files nothing.",
    },
    {
      invariantKind: "absence",
      statement: "akasha declares no `error` page type for a capture to be filed under.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names the page type akasha would need before a capture could be filed again.",
    },
    {
      invariantKind: "absence",
      statement: "A refused capture leaves how often the error broke this way unchanged.",
    },
  ],
} as const satisfies Module
