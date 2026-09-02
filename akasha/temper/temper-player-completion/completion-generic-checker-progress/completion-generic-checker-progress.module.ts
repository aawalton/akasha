import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionGenericCheckerProgress = {
  id: "01a0640c-1e9b-7ffc-918b-ac7e203ae58d",
  pageTypeSlug: "module",
  slug: "completion-generic-checker-progress",
  definition: "how far along a completion card is, added up over the leaves its picker enumerates",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A total is what the static catalog holds rather than what saved data records.",
    },
    {
      invariantKind: "departure",
      statement: "A leaf stating its own numbers is taken over counting it as one of one.",
    },
    {
      invariantKind: "departure",
      statement: "A leaf detail is read only where the path is already a leaf.",
    },
    {
      invariantKind: "departure",
      statement: "A card no checker names returns nothing rather than a count.",
    },
  ],
} as const satisfies Module
