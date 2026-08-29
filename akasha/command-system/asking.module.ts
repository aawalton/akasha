import type { Module } from "../code-system/module/module.page-type.ts"

export const asking = {
  id: "01a04df0-ecce-7c46-bec3-1461348a7d55",
  pageTypeSlug: "module",
  slug: "asking",
  definition: "the change a command asks for, gated and landed and answered for",
  code: "ts",
  test: "ts",
  design: [
    {
      invariantKind: "departure",
      statement: "Every command asks for its change through this, so all of them answer alike.",
    },
    {
      invariantKind: "departure",
      statement: "A change that landed is answered as landed, whether or not the report was built.",
    },
    {
      invariantKind: "departure",
      statement: "Why a report could not be built is said in the report.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that threw is answered as operational, never as unclassified.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run gates under the hold and writes nothing.",
    },
  ],
  intent: [
    {
      invariantKind: "gap",
      statement: "A caller is never told nothing happened when something did.",
    },
  ],
} as const satisfies Module
