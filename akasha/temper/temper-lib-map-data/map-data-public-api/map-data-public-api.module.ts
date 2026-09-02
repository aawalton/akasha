import type { Module } from "@akasha/code-system/module"

export const mapDataPublicApi = {
  id: "01a061e1-aeb1-7d98-8492-0c8d3bfad094",
  pageTypeSlug: "module",
  slug: "map-data-public-api",
  definition: "the names the library puts where every other add-on reaches them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name the game reads keeps its upstream spelling on the global table.",
    },
  ],
} as const satisfies Module
