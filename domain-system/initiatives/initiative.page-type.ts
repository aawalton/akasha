import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { DomainSlug } from "../domains/properties/domain-slug.relation-property.ts"
import type { Constraints } from "./properties/constraints.text-property.ts"
import type { InitiativePersonaSlug } from "./properties/initiative-persona-slug.relation-property.ts"
import type { Intents } from "./properties/intents.record-property.ts"
import type { ParentSlug } from "./properties/parent-slug.relation-property.ts"

export type Initiative = Page & {
  domainSlug: DomainSlug
  personaSlug: InitiativePersonaSlug
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
    "relation-property/initiative-persona-slug",
    "relation-property/initiative-slug",
    "relation-property/parent-slug",
    "relation-property/persona-slug",
    "text-property/constraints",
    "text-property/intent-statement",
    "text-property/working-memory",
  ],
  extendsSlug: "page-type/page",
  properties: [
    { pagePropertySlug: "domain-slug", required: true, many: false },
    { pagePropertySlug: "persona-slug", required: true, many: false },
    { pagePropertySlug: "parent-slug", required: false, many: false },
    { pagePropertySlug: "intents", required: false, many: true, max: null },
    { pagePropertySlug: "constraints", required: false, many: true, max: 30 },
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
        "An initiative takes each intent off the domain that held the intent and holds the intent as its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "An intent an initiative meets returns to the domain the intent came from or is deleted.",
    },
    {
      invariantKind: "departure",
      statement: "An intent returning to its domain is a design or condition invariant.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative is not limited to one domain.",
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
        "An initiative dies when the initiative is reached rather than standing as a domain that is done.",
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
} as const satisfies PageType
