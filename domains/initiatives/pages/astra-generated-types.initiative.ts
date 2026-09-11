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
  intents: [
    {
      statement: "No page property's type is written by hand.",
      workingMemory:
        "1758 of 1759 property pages have their type written beside them, and every kind but one is whole. The one left is `record-property/properties`, whose `Declaration` is two arms parted on the literal `many`: `maxCount` is required in one arm, `default` and `fixed` admitted only in the other. A flat list of fields says neither that a field waits on another field's value nor that a field is pinned to a literal. Alan has the case.",
    },
    {
      statement: "Every generated type is written by the generator the page it belongs to states.",
      workingMemory:
        "A landing runs six writers through `change-preparing`. Four write no type: a lockfile, Swift spacing steps, source globs, a Containerfile. `type-generating` runs the generator a page type states, and `page-type` and `page-property` each state one. The sixth, `address-mapping`, writes the change runners' address maps, which are types, by hand. Porting it waits on the guard deciding whether a generator runs: `type-generating`'s reads path names and misses a change adding a change agent.",
    },
  ],
} as const satisfies Initiative
