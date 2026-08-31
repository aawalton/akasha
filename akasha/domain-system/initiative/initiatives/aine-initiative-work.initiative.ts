import type { Initiative } from "../initiative.page-type.ts"

export const aineInitiativeWork = {
  id: "01a05880-88a6-7000-a691-020063d8e4b3",
  pageTypeSlug: "initiative",
  slug: "aine-initiative-work",
  domainSlug: "domain/domain-system",
  personaSlug: "aine",
  intents: [
    { statement: "An agent reading one initiative knows how to work it." },
    { statement: "A seat's initiative is resolved against the initiatives standing in akasha." },
    { statement: "A seat states an initiative as its assignment." },
    {
      statement:
        "A seat assigned an initiative warrants that initiative and its domain and the initiatives above it.",
    },
    { statement: "A seat is swept when the initiative it is assigned is done." },
    { statement: "An initiative's name states what its work is toward." },
  ],
  constraints: [
    "The method stands on the initiative page type rather than on any initiative.",
    "The sweep lands with the warrant rather than after it.",
  ],
} as const satisfies Initiative
