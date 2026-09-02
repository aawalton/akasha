import type { Module } from "../../modules/module.page-type.ts"

export const appBuilding = {
  id: "01a059b8-3354-76d3-b596-b5329132b15d",
  pageTypeSlug: "module",
  slug: "app-building",
  definition: "what building one iOS app takes, read from that app's page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What a build needs is read from the app's page and the pages the app's page names.",
    },
    {
      invariantKind: "departure",
      statement: "The program stating a name of its own is the one shipped inside the app.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two programs stating a name of their own is refused rather than one program being picked.",
    },
    {
      invariantKind: "departure",
      statement: "An app naming no build script is refused rather than walked to.",
    },
    {
      invariantKind: "departure",
      statement: "An app naming one half of its staging and not the other is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a machine.",
    },
  ],
} as const satisfies Module
