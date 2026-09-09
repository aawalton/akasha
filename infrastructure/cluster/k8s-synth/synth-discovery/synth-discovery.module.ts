import type { Module } from "@akasha/code/module"

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
      statement: "The code file of the manifest a cluster service is applied as is a synth file.",
    },
    {
      invariantKind: "departure",
      statement: "Which pages are cluster services is read from the index rather than from a glob.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster service naming no manifest adds no synth file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest slug naming no manifest page is left out rather than refusing the answer.",
    },
  ],
} as const satisfies Module
