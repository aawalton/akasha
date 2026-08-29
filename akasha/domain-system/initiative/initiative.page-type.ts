import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { DomainSlug } from "../domain/properties/domain-slug.relation-property.ts"
import type { Invariants } from "../domain/properties/invariants.record-property.ts"
import type { ParentSlug } from "./properties/parent-slug.relation-property.ts"
import type { PersonaSlug } from "./properties/persona-slug.text-property.ts"

export type Initiative = Page & {
  domainSlug: DomainSlug
  personaSlug: PersonaSlug
  parentSlug?: ParentSlug
  invariants?: Invariants
}

export const initiative = {
  id: "01a04e58-5735-72b4-b945-56366461c776",
  pageTypeSlug: "page-type",
  slug: "initiative",
  definition: "work that closes gaps between how a domain is and how it should be",
  extendsSlug: "page-type/page",
  properties: [
    { propertySlug: "domain-slug", required: true, many: false },
    { propertySlug: "persona-slug", required: true, many: false },
    { propertySlug: "parent-slug", required: false, many: false },
    { propertySlug: "invariants", required: false, many: true },
  ],
  mortal: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An initiative stands under another initiative, or under none.",
    },
    {
      invariantKind: "departure",
      statement:
        "An initiative takes each intent off the domain that held it, and holds it as its own.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative is not limited to one domain.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative's name is its persona and its target domain.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative's purpose is done once every intent it holds is met.",
    },
    {
      invariantKind: "upkeep",
      statement: "An intent is written on a domain or on an initiative, never both.",
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
