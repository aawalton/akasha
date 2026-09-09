import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { PageDomain } from "../properties/page-domain.relation-property.ts"
import type { Constraints } from "./properties/constraints.standard-agent-english-property.ts"
import type { InitiativeParent } from "./properties/initiative-parent.relation-property.ts"
import type { InitiativePersona } from "./properties/initiative-persona.relation-property.ts"
import type { Intents } from "./properties/intents.record-property.ts"

export type Initiative = Page & {
  domain: PageDomain
  persona: InitiativePersona
  parent?: InitiativeParent
  intents?: Intents
  constraints?: readonly Constraints[]
}

export const initiative = {
  id: "01a04e58-5735-72b4-b945-56366461c776",
  pageTypeSlug: "page-type",
  slug: "initiative",
  definition: "work that closes gaps between how a domain is and how it should be",
  pluralSlug: "initiatives",
  parts: [
    "record-property/intents",
    "relation-property/initiative-persona",
    "relation-property/initiative",
    "relation-property/initiative-parent",
    "standard-agent-english-property/constraints",
    "standard-agent-english-property/intent-statement",
    "text-property/working-memory",
  ],
  extends: ["page-type/page"],
  properties: [
    { pagePropertySlug: "relation-property/page-domain", required: true, many: false },
    { pagePropertySlug: "relation-property/initiative-persona", required: true, many: false },
    { pagePropertySlug: "relation-property/initiative-parent", required: false, many: false },
    { pagePropertySlug: "record-property/intents", required: false, many: true, maxCount: null },
    {
      pagePropertySlug: "standard-agent-english-property/constraints",
      required: false,
      many: true,
      maxCount: 30,
    },
  ],
  mortal: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An initiative sits under another initiative or under no initiative.",
    },
    {
      invariantKind: "departure",
      statement:
        "An initiative takes each intent off the domain that had the intent and has the intent as its own.",
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
      statement: "An initiative's purpose is done once every intent that initiative has is met.",
    },
    {
      invariantKind: "departure",
      statement: "A state the migration passes through is an initiative.",
    },
    {
      invariantKind: "departure",
      statement:
        "An initiative dies when the initiative is reached rather than remaining as a domain that is done.",
    },
    {
      invariantKind: "upkeep",
      statement: "No initiative has an intent that is met.",
    },
    {
      invariantKind: "gap",
      statement: "An initiative is read from this definition rather than from the old system's.",
    },
  ],
} as const satisfies PageType
