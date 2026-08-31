import type { Initiative } from "../initiative.page-type.ts"

export const astraIndexBoundary = {
  id: "01a05373-78ba-772e-be45-8404f3cfda5f",
  pageTypeSlug: "initiative",
  slug: "astra-index-boundary",
  domainSlug: "workspace-package/indexes",
  personaSlug: "astra",
  intents: [
    {
      statement: "Everything outside the indexes folder asks the index a question and is answered.",
      workingMemory:
        "Every reach from outside is now a name the manifest exports. The two residues went: the edge rule moved into `index-import`, and `akasha-hooks` stopped spelling the index's layout. Thirty-odd callers that read a missing index as an empty one now take a reader that refuses. What is left is `standingAt`, `idsNaming`, `namersOf`, `slugsOfType`, `schemaOf` and `standingAddressed`, each still answering empty where the tree it reads is not there.",
    },
    { statement: "A question no answer covers is answered by the indexes folder." },
    {
      statement:
        "What crosses the boundary is a question or its answer or the index as a change leaves it.",
    },
  ],
  constraints: [
    "`Reading` is three filesystem operations wearing a type, and it does not cross the boundary.",
    "Re-exports are refused here, so the public face is named modules rather than one file standing in front of the rest.",
    "Building the index into a named directory and loading the keeper by name are the index's own business rather than a caller's.",
  ],
} as const satisfies Initiative
