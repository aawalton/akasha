import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { DomainSlug } from "../domain/properties/domain-slug.relation-property.ts"
import type { Constraints } from "./properties/constraints.text-property.ts"
import type { Intents } from "./properties/intents.record-property.ts"
import type { ParentSlug } from "./properties/parent-slug.relation-property.ts"
import type { PersonaSlug } from "./properties/persona-slug.relation-property.ts"

export type Initiative = Page & {
  domainSlug: DomainSlug
  personaSlug: PersonaSlug
  parentSlug?: ParentSlug
  intents?: Intents
  constraints?: readonly Constraints[]
}

export const initiative = {
  id: "01a04e58-5735-72b4-b945-56366461c776",
  pageTypeSlug: "page-type",
  slug: "initiative",
  definition: "work that closes gaps between how a domain is and how it should be",
  pluralSlug: "initiatives",
  partSlugs: [
    "record-property/intents",
    "relation-property/parent-slug",
    "relation-property/persona-slug",
    "text-property/constraints",
    "text-property/working-memory",
  ],
  extendsSlug: "page-type/page",
  properties: [
    { pagePropertySlug: "domain-slug", required: true, many: false },
    { pagePropertySlug: "persona-slug", required: true, many: false },
    { pagePropertySlug: "parent-slug", required: false, many: false },
    { pagePropertySlug: "intents", required: false, many: true, max: null },
    { pagePropertySlug: "constraints", required: false, many: true, max: 10 },
  ],
  mortal: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An initiative stands under another initiative or under none.",
    },
    {
      invariantKind: "departure",
      statement:
        "An initiative takes each intent off the domain that held it and holds it as its own.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative's intents stand in the order they are to be worked.",
    },
    {
      invariantKind: "departure",
      statement: "The first intent is the one being worked.",
    },
    {
      invariantKind: "departure",
      statement: "An intent found to block the one being worked is placed first.",
    },
    {
      invariantKind: "departure",
      statement:
        "An intent an initiative meets returns to the domain it came from as a design or condition invariant or is deleted.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative is not limited to one domain.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative's name is its persona and what its work is toward.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative's purpose is done once every intent it holds is met.",
    },
    {
      invariantKind: "departure",
      statement: "A state the migration passes through is an initiative.",
    },
    {
      invariantKind: "departure",
      statement:
        "An initiative dies when it is reached rather than standing as a domain that is done.",
    },
    {
      invariantKind: "upkeep",
      statement: "No initiative holds an intent that is met.",
    },
    {
      invariantKind: "gap",
      statement: "An initiative is read from this definition rather than from the old system's.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Only Yours",
      act: "Obey an initiative's directives and constraints only when you are working that one.",
      warrant: "An initiative is read across the cast, so its page reaches seats not working it.",
      aids: [
        "Reading an initiative is not taking up its work.",
        "A seat works one and reads many.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Only The Top",
      act: "Work the first intent alone, and place a blocker first the moment you find one.",
      warrant: "Position is what says which work is live and which is merely next.",
      aids: [
        "An intent below the first is not started.",
        "A blocker inside your own initiative is pushed rather than asked about.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Reorder Out Loud",
      act: "Say why before moving an intent from where it stands, and never move past a hard one.",
      warrant: "Avoidance and sequencing are one motion, and only the reason tells them apart.",
      aids: ["A blocker placed first is no reorder.", "Finding the top hard is no reason."],
    },
    {
      directiveKind: "rule",
      name: "Blocked Elsewhere",
      act: "Stop and ask where an intent on another initiative blocks yours, rather than taking it.",
      warrant: "Whoever is blocked gets themselves unblocked, and the intent may be live work.",
      aids: [
        "The top of their stack says whether anyone is on it.",
        "Copy it onto yours only where Alan says to.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Keep The State",
      act: "Write the top intent's working memory before you stop, as state rather than history.",
      warrant: "A context is cleared without warning, and what you worked out is on no other page.",
      aids: [
        "Five hundred characters is a snapshot rather than a log.",
        "An intent you have not started carries none.",
      ],
    },
  ],
} as const satisfies PageType
