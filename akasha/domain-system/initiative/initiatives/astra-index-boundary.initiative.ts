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
        "Thirty-seven files outside reach `index-entries`, and what most take is a page-value reader touching no index: `Value`, `valueAt`, `valueIn`, `textAt`, `numberAt`, `slugAt`, `slugOf`, `loadedFrom`, `under`, `importedBy`. Eighteen take nothing else. Split that half into a pages-system module and six index-facing names are left: `pageTypesIn`, `schemaAt`, `filePropertiesAt`, `filePropertiesAnswered`, `pathsOf`, `Identifier`.",
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
