import type { Initiative } from "../initiative.page-type.ts"

export const aineInitiativeWork = {
  id: "01a05880-88a6-7000-a691-020063d8e4b3",
  pageTypeSlug: "initiative",
  slug: "aine-initiative-work",
  domainSlug: "domain/domain-system",
  personaSlug: "aine",
  invariants: [
    {
      invariantKind: "gap",
      statement:
        "An initiative's intents and constraints and working memory stand as its own properties.",
    },
    {
      invariantKind: "gap",
      statement: "An agent reading one initiative knows how to work it.",
    },
    {
      invariantKind: "gap",
      statement: "A seat's initiative is resolved against the initiatives standing in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "A seat states an initiative as its assignment.",
    },
    {
      invariantKind: "gap",
      statement:
        "A seat assigned an initiative warrants that initiative and its domain and the initiatives above it.",
    },
    {
      invariantKind: "gap",
      statement: "A seat is swept when the initiative it is assigned is done.",
    },
    {
      invariantKind: "gap",
      statement: "An initiative's name states what its work is toward.",
    },
  ],
  notes: [
    "The shape stands first because it is unblocked where everything from the resolver down is not, and because working memory is what makes a long stack survivable. Building it first means the rest of this initiative is worked with it rather than without it. It reaches every initiative standing: sixty-one entries lose an `invariantKind` stating the only value it could hold, and forty-six notes become at most ten constraints each, or working memory, or nothing. The migration is mostly deletion, and a note recording a decision already settled simply goes.",
    "The method follows the shape because it describes working a stack and the shape is what defines one. It goes on the initiative page type as directives rather than on any initiative, since it is the same for every initiative and a local override is wrong. It needs a guard of the kind the persona page type carries as `Only Hers`, because a directive standing there reaches everyone who opens any initiative rather than only the seat working it.",
    "The resolver stands above the rest of the seat chain because nothing in that chain is reachable until it moves. `initiativeOf` reads `initiative-slug` off the akasha seat page and then resolves it against `pages/initiative/`, the old markdown store, which holds one file that is not an initiative. So `refuseInitiative` builds an empty list of acceptable slugs and refuses every one proposed, including every initiative standing in akasha. The two ends of the relation live in different systems.",
    "The assignment precedes the warrants because the warrants read what it defines. A seat states an initiative as its assignment rather than alongside one, since an initiative already names its persona and its domain and a seat naming both would state them twice. That makes three entries on `assignment-slug` false: two gaps saying it is reached as `domain-slug` and is a relation to a domain, and a stopgap saying it is named for the assignment. All three hold today because persona and person each extend domain, so every assignment standing resolves as a domain page. Initiative extends page rather than domain, which is the break.",
    "The sweep lands with the warrant rather than after it. A deleted finding, `initiative-page-required`, records what happens otherwise: the old initiative warrant put the initiative's page into a seat's owed reading, and an initiative page is deleted once its intents are met, so the owed reading became unresolvable by the work succeeding. A seat assigned an initiative is swept when that initiative is done, so no seat outlives the page it owes a reading of. Landing the warrant while the sweep is unwired rebuilds the old failure exactly.",
    "The naming intent stands last and is blocked by nothing above it. Order here is sequencing rather than dependency, so a lower place is no claim that anything above blocks it. Every initiative standing names its persona correctly, so the work is the other half of the invariant: a name is meant to say what the work is toward, and `thea-checks-system` and `vera-graph-system` and `akasha-seats` name a place instead.",
  ],
} as const satisfies Initiative
