import type { Initiative } from "../initiative.page-type.types.ts"

export const astraGeneratedTypes = {
  id: "01a0873d-ec5d-73ba-a85f-16911e976158",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "astra-generated-types",
  domain: "workspace-package/page",
  persona: "astra",
  constraints: [
    "A type moving out of a page's file is followed by every importer rather than by an alias.",
    "A mechanical change moves it, and that change is built before the types are moved.",
    "A many-valued property's own type carries its list, so a page states that type rather than an array of it.",
  ],
  intents: [
    {
      statement: "One written type has a page type's stored keys and its calculations.",
      workingMemory:
        "`file-property/worked` holds the calculations alone today, written on every apply by `command-system/worked-typing`. The new file replaces it rather than sitting beside it.\n",
    },
    {
      statement: "A page type's written type says everything its hand-written type said.",
      workingMemory:
        "Page type files also export declarations that are not the page's shape and stay hand-written: `Reach` and `Work` on `computed-property`, `List` on `page-property`, `Declaration` on `properties`, `Rung` on `rank-property`. Those need a home, and `module-types` is what the same file property means on a module.\n",
    },
    {
      statement: "No page type's type is written by hand.",
      workingMemory:
        "`change-agent/add-page-type-types` turns one page type over in one landing: it states the key, moves the hand-written type beside the page, repoints importers, and the generator writes that file again before the checks judge it. Sixty-four are turned over. It refuses a page type whose type spells a key as a list of another type, naming the key; thirty-seven spell one that way. Ten more wait on property pages whose exported type is named for the property slug.\n",
    },
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
        "A property page's type is named for that page's slug in all but thirty of eighteen hundred, twenty-three are named for the property slug instead, and three name one type between them. A select property's type reads its own const back, and one computed property module exports no type at all.\n",
    },
    {
      statement: "Every generated type is written by the generator the page it belongs to states.",
      workingMemory:
        "Five generators ride `change-preparing`: the manifest lockfile, worked types, the change address map, spacing steps and source globs. The rest run from commands by hand. Four path heuristics disagree about what counts as generated, and the one machine-readable marker, `record-property/generated`, reaches type declarations alone.\n",
    },
    {
      statement: "A calculation's return type is written from the kind its property states.",
      workingMemory:
        "The kind is stated twice: `holds` on the computed property page, and the second type argument of the `Work<Page, Held>` its code file exports. `Held` is free, so the compiler compares nothing and a disagreement lands. Only a reader catches it, at `pages/computing/page-computing.module.code.ts:91-103`. Of 33 calculations, 25 hold number and 8 hold text, so the kinds in use are the two a wrong return type would transpose. A check comparing the two files was weighed and not built.\n",
    },
  ],
} as const satisfies Initiative
