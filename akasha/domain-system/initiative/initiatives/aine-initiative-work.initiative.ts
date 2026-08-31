import type { Initiative } from "../initiative.page-type.ts"

export const aineInitiativeWork = {
  id: "01a05880-88a6-7000-a691-020063d8e4b3",
  pageTypeSlug: "initiative",
  slug: "aine-initiative-work",
  domainSlug: "domain/domain-system",
  personaSlug: "aine",
  intents: [
    {
      statement: "A seat's initiative is resolved against the initiatives standing in akasha.",
      workingMemory:
        "`tools/lib/seat-initiative.ts` globs `pages/initiative/**/*.md` through `PLACES`, and that store holds no initiative, so `refuseInitiative` refuses every slug proposed. `initiativesDrawn` in `akasha/editor-extension/work-initiatives` already answers slug and path and parent and persona for every akasha initiative through the index, and tools may import from akasha because the dependency runs one way. A slug is unique among the pages of its page type, so the spelling machinery collapses.",
    },
    { statement: "A seat states an initiative as its assignment." },
    {
      statement:
        "A seat assigned an initiative warrants that initiative and its domain and the initiatives above it.",
    },
    { statement: "A seat is swept when the initiative it is assigned is done." },
    { statement: "An initiative's name states what its work is toward." },
  ],
  constraints: ["The sweep lands with the warrant rather than after it."],
} as const satisfies Initiative
