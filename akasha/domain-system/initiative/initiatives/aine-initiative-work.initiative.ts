import type { Initiative } from "../initiative.page-type.ts"

export const aineInitiativeWork = {
  id: "01a05880-88a6-7000-a691-020063d8e4b3",
  pageTypeSlug: "initiative",
  slug: "aine-initiative-work",
  domainSlug: "domain/domain-system",
  personaSlug: "aine",
  intents: [
    {
      statement:
        "An initiative's intents and constraints and working memory stand as its own properties.",
      workingMemory:
        "The three property pages and the page type landed additively, so intents and constraints and working memory stand beside invariants and notes. What is left is the migration itself: thirteen pages rewritten, `invariantKind` dropped from sixty-one entries, forty-six notes become constraints or go, then invariants and notes come off the page type and the notes property is deleted. ryn owes her failure cases as intents of her own once this lands.",
    },
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
    "A note that becomes no constraint and no working memory is dropped rather than kept.",
  ],
} as const satisfies Initiative
