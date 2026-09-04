import type { Module } from "@akasha/code-system/module"

export const buildInputSources = {
  id: "01a05cee-e560-7116-bb78-4e76e90508fe",
  pageTypeSlug: "module",
  slug: "build-input-sources",
  definition: "the two repo-and-paths pairs a mobile build's inputs sit in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The shell side names the same repo paths the sim run tree delivers to the macbook.",
    },
    {
      invariantKind: "departure",
      statement: "The code side names a fixed path list that no app varies.",
    },
  ],
} as const satisfies Module
