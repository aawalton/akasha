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
      statement: "An agent reading one initiative knows how to work it.",
    },
  ],
  notes: [
    "The resolver stands first because nothing below it is reachable until it moves. `initiativeOf` reads `initiative-slug` off the akasha seat page and then resolves it against `pages/initiative/`, the old markdown store, which holds one file that is not an initiative. So `refuseInitiative` builds an empty list of acceptable slugs and refuses every one proposed, including all twelve initiatives standing in akasha. The two ends of the relation live in different systems. Every warrant below would be correct and unreachable while that holds.",
    "The assignment comes before the warrants because the warrants read what it defines. A seat states an initiative as its assignment rather than alongside one, since an initiative already names its persona and its domain and a seat naming both would state them twice. That makes three entries on `assignment-slug` false: two gaps saying it is reached as `domain-slug` and is a relation to a domain, and a stopgap saying it is named for the assignment. All three are true today because persona and person each extend domain, so every assignment standing resolves as a domain page. Initiative extends page rather than domain, which is the break, and `Move When It Turns` puts their deletion in this change rather than a later one.",
    "The sweep lands with the warrant rather than after it. A deleted finding, `initiative-page-required`, records what happens otherwise: the old initiative warrant put the initiative's page into a seat's owed reading, and an initiative page is deleted once its intents are met, so the owed reading became unresolvable by the work succeeding. A seat assigned an initiative is swept when that initiative is done, so no seat outlives the page it owes a reading of. That is the whole answer to the old failure, and landing the warrant while the sweep is unwired rebuilds it exactly.",
    "The method intent stands last and is blocked by nothing above it. Order here is sequencing rather than dependency, so a lower place is not a claim that something above blocks it. It is sequenced last because what belongs on the initiative page type as a directive every reader gets free, and what belongs in one initiative's own notes, is still unsettled with Alan. The three invariants stating that intents are ordered and that the first is the one being worked landed on the initiative page type before this page was written, so this stack is read under them.",
  ],
} as const satisfies Initiative
