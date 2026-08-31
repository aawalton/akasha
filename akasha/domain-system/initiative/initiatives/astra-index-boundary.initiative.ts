import type { Initiative } from "../initiative.page-type.ts"

export const astraIndexBoundary = {
  id: "01a05373-78ba-772e-be45-8404f3cfda5f",
  pageTypeSlug: "initiative",
  slug: "astra-index-boundary",
  domainSlug: "workspace-package/indexes",
  personaSlug: "astra",
  intents: [
    {
      statement:
        "What crosses the boundary is a question or its answer or the index as a change leaves it.",
      workingMemory:
        "`Reading` crosses as a shape `index-shape` declares, Alan having dropped the constraint that barred it. What is left is `NOT_A_RELATION`, which is neither a question nor an answer: `index-relation`, `move-renaming` and `type-respelling` each carry the same loop over a page's value, skipping those three keys, asking `known` which property a key is and reaching one record deep. That rule belongs in one place and is asked of rather than copied.",
    },
  ],
  constraints: [
    "Re-exports are refused here, so the public face is named modules rather than one file standing in front of the rest.",
    "Building the index into a named directory and loading the keeper by name are the index's own business rather than a caller's.",
  ],
} as const satisfies Initiative
