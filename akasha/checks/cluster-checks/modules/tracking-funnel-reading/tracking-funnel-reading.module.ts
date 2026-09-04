import type { Module } from "@akasha/code-system/module"

export const trackingFunnelReading = {
  id: "01a069d5-1d2a-7000-ac6c-e3235e124853",
  pageTypeSlug: "module",
  slug: "tracking-funnel-reading",
  definition: "which files outside akasha reach the day store, and by which road each one reaches",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The population is every TypeScript file in the repository outside akasha.",
    },
    {
      invariantKind: "departure",
      statement: "A reach is followed to a fixed point rather than one hop.",
    },
    {
      invariantKind: "departure",
      statement: "A file naming a day road is read as reaching it.",
    },
    {
      invariantKind: "gap",
      statement: "An exemption naming a file nobody has exempts nothing and reads as coverage.",
    },
    {
      invariantKind: "gap",
      statement: "Every path this module states by hand has rotted and none of them is checked.",
    },
    {
      invariantKind: "gap",
      statement: "The prose here is comments rather than invariants.",
    },
  ],
} as const satisfies Module
