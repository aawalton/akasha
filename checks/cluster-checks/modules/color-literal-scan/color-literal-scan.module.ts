import type { Module } from "@akasha/code/module"

export const colorLiteralScan = {
  id: "01a08128-3044-7bd0-8547-9d782b97cade",
  pageTypeSlug: "module",
  slug: "color-literal-scan",
  definition: "the colors a stylesheet or a TypeScript file states outright rather than as a token",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shell's www folder holds what a build put there rather than what anyone wrote.",
    },
    {
      invariantKind: "departure",
      statement: "That folder is matched under ios-apps rather than at one shell's own path.",
    },
  ],
} as const satisfies Module
