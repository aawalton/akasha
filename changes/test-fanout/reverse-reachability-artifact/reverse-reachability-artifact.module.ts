import type { Module } from "@akasha/code-system/module"

export const reverseReachabilityArtifact = {
  id: "01a0685e-023f-7016-8ab5-546fb44374db",
  pageTypeSlug: "module",
  slug: "reverse-reachability-artifact",
  definition:
    "the file naming, for each workspace, which test files each of its files is reached by at one commit",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tree holding no lockfile is no checkout of the code repo and is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The reading is taken at a named commit rather than at the working tree.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace curation leaves out is named as outside the map rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A curation naming nothing audits every workspace rather than none.",
    },
    {
      invariantKind: "departure",
      statement:
        "The artifact is written to a scratch name and moved into place, so no reader sees half of it.",
    },
    {
      invariantKind: "departure",
      statement: "A test file under no workspace is left out of the map.",
    },
    {
      invariantKind: "departure",
      statement: "A test file is charged to the longest workspace root that holds it.",
    },
  ],
} as const satisfies Module
