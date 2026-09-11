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
      statement: "A page property states the code that writes its type.",
    },
    {
      statement: "A page property's written type says everything its hand-written type said.",
      workingMemory:
        "A written type names a property's type rather than restating it, so an extension the data leaves out and a relation that collapses to a slug bar nothing. Naming bars it. Of 1773 property pages, 1743 export the type named for the page's slug and 30 do not: 23 are named for the property slug, 7 for neither. Forty export an element type as well, and in every one the property's own type is the one named for the slug.\n",
    },
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
    {
      statement: "A calculation's return type is written from the kind its property states.",
      workingMemory:
        "The kind is stated twice: `holds` on the computed property page, and the second type argument of the `Work<Page, Held>` its code file exports. `Held` is free, so the compiler compares nothing and a disagreement lands. Only a reader catches it, at `pages/computing/page-computing.module.code.ts:91-103`. Of 33 calculations, 25 hold number and 8 hold text, so the kinds in use are the two a wrong return type would transpose. A check comparing the two files was weighed and not built.\n",
    },
  ],
} as const satisfies Initiative
