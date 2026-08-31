import type { Initiative } from "../initiative.page-type.ts"

export const aineInitiativeWork = {
  id: "01a05880-88a6-7000-a691-020063d8e4b3",
  pageTypeSlug: "initiative",
  slug: "aine-initiative-work",
  domainSlug: "domain/domain-system",
  personaSlug: "aine",
  intents: [
    {
      statement: "A seat states an initiative as its assignment.",
      workingMemory:
        'The warrants stand and answer. Two things on a seat now name an initiative: the old optional `initiativeSlug` and `assignmentSlug`; the old one and its relation-property page go. `assignment-slug`\'s definition still reads "the domain whose work a seat answers to" and must widen to a domain or an initiative. The constraint binds this to land with the sweep below it.',
    },
    { statement: "A seat is swept when the initiative it is assigned is done." },
    { statement: "An initiative's name states what its work is toward." },
  ],
  constraints: ["The sweep lands with the warrant rather than after it."],
} as const satisfies Initiative
