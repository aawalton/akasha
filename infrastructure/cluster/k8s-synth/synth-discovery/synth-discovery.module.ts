import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const synthDiscovery = {
  id: "01a06810-0b68-74a9-bfee-d2c6c7d2f2fc",
  pageTypeSlug: "module",
  type: "module",
  slug: "synth-discovery",
  definition: "the synth files a checkout holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path component naming a folder every synth sits under names no package.",
    },
    {
      invariantKind: "departure",
      statement: "The code file of every `manifest` page the index holds is a synth file.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest page's synth file is the file that page states its code under.",
    },
    {
      invariantKind: "absence",
      statement: "No folder and no file name ending is spelled here.",
    },
  ],
} as const satisfies Module
