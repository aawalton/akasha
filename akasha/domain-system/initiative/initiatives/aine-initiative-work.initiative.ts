import type { Initiative } from "../initiative.page-type.ts"

export const aineInitiativeWork = {
  id: "01a05880-88a6-7000-a691-020063d8e4b3",
  pageTypeSlug: "initiative",
  slug: "aine-initiative-work",
  domainSlug: "workspace-package/domain-system",
  personaSlug: "aine",
  intents: [
    {
      statement: "A seat is swept when the initiative it is assigned is done.",
      workingMemory:
        "The sweep is built and live but keys on the wrong field. `seat-sweep.ts` reads an initiative page's absence as finished; `turn-end-decide.ts` then stops and deletes a seat that is not on call. It reaches the initiative through `initiativeOf` in `seat-initiative.ts`, which reads `initiative-slug`, a field no seat states. My seat now carries the assignment qualified and the writer keeps it, so repoint `initiativeOf` there and `initiativeSlug` can go.",
    },
    { statement: "An initiative's name states what its work is toward." },
  ],
} as const satisfies Initiative
