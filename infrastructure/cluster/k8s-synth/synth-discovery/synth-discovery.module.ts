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
      statement: "A synth file reached through a `src` folder is no synth file here.",
    },
    {
      invariantKind: "departure",
      statement: "A path component naming a folder every synth sits under names no package.",
    },
    {
      invariantKind: "departure",
      statement: "The code file of every `manifest` page the index holds is a synth file.",
    },
  ],
} as const satisfies Module
