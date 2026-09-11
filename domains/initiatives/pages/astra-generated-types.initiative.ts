import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const astraGeneratedTypes = {
  id: "01a0873d-ec5d-73ba-a85f-16911e976158",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "astra-generated-types",
  domain: "domain/page",
  persona: "astra",
  constraints: [
    "A type moving out of a page's file is followed by every importer rather than by an alias.",
    "A mechanical change moves it, and that change is built before the types are moved.",
    "A many-valued property's own type carries its list, so a page states that type rather than an array of it.",
  ],
  intents: [],
} as const satisfies Initiative
