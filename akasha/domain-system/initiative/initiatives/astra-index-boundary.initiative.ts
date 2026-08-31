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
    },
    {
      statement:
        "Nothing outside the indexes folder knows where the index stands or what shape the files under it take or how one of them is read.",
    },
    { statement: "A question no answer covers is answered by the indexes folder." },
    {
      statement:
        "What crosses the boundary is a question or its answer or the index as a change leaves it.",
    },
    {
      statement:
        "The boundary is held by a rule over the folder rather than by a list of the names it refuses.",
    },
    { statement: "Every check standing over the boundary judges on every phase." },
  ],
  constraints: [
    "`Reading` is three filesystem operations wearing a type, and it does not cross the boundary.",
    "Re-exports are refused here, so the public face is named modules rather than one file standing in front of the rest.",
    "Turning the checks on before the answers exist refuses thirty-one files that have nowhere to go.",
    "Building the index into a named directory and loading the keeper by name are the index's own business rather than a caller's.",
  ],
} as const satisfies Initiative
