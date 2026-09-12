import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const changeLoading = {
  id: "01a08161-d992-7ad5-b5f9-6397f53d2002",
  type: "module",
  slug: "change-loading",
  definition: "the change filed at an address loaded with the guards that change names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An address is the page type and the slug the change is filed under.",
    },
    {
      invariantKind: "departure",
      statement: "The page at an address is read off the index rather than found by a search.",
    },
    {
      invariantKind: "departure",
      statement: "A change's code is beside its page under the key its page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "Every change exports its run under one name.",
    },
    {
      invariantKind: "departure",
      statement: "A change states the arguments that change takes beside its run, under one name.",
    },
    {
      invariantKind: "departure",
      statement: "A key no change reached by name takes is refused before that change runs.",
    },
    {
      invariantKind: "departure",
      statement: "One key is refused at a time.",
    },
    {
      invariantKind: "absence",
      statement: "A change reached by another change has no key judged here.",
    },
    {
      invariantKind: "absence",
      statement: "A change stating no arguments has no key judged here.",
    },
    {
      invariantKind: "departure",
      statement: "A guard is loaded by the slug the change's page names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A guard runs over the outermost change's answer rather than over each rung's answer.",
    },
    {
      invariantKind: "departure",
      statement: "A guard a change reached inside names runs at the outermost change.",
    },
    {
      invariantKind: "departure",
      statement: "A guard reached at more than one rung of one composition runs once.",
    },
    {
      invariantKind: "departure",
      statement: "The guards a change runs are the guards that change names and no other guard.",
    },
    {
      invariantKind: "departure",
      statement: "A change naming no guard runs no guard.",
    },
    {
      invariantKind: "departure",
      statement: "An answer already refused runs no guard.",
    },
    {
      invariantKind: "departure",
      statement: "An address reaching no page is refused rather than answered with no edits.",
    },
    {
      invariantKind: "departure",
      statement: "An address naming no page and a body exporting no run are two refusals.",
    },
    {
      invariantKind: "departure",
      statement: "Loading a change and running that change are two acts.",
    },
    {
      invariantKind: "departure",
      statement: "Loading a change reaches the disk.",
    },
    {
      invariantKind: "departure",
      statement: "A change is loaded from the path its code sits at rather than the path named.",
    },
    {
      invariantKind: "departure",
      statement: "A change reached more than once over one world is looked up once.",
    },
    {
      invariantKind: "departure",
      statement: "A world reached over twice looks a change up again for the second world.",
    },
    {
      invariantKind: "departure",
      statement: "A lock a caller has over a store is held while a change reached inside loads.",
    },
    {
      invariantKind: "departure",
      statement: "The guards are loaded alongside the change rather than after the change answers.",
    },
    {
      invariantKind: "departure",
      statement: "The world a guard judges against is read before the outermost change runs.",
    },
    {
      invariantKind: "departure",
      statement:
        "The world a guard judges is read whether or not the outermost change names a guard.",
    },
    {
      invariantKind: "departure",
      statement: "The target subtype a change acts on is read off that change's page.",
    },
    {
      invariantKind: "departure",
      statement: "The subtype a change judges a path against is worked out once over one world.",
    },
    {
      invariantKind: "departure",
      statement: "The path handed in is read under the name every change names a path by.",
    },
    {
      invariantKind: "departure",
      statement: "A path whose kind narrows the subtype the change acts on is run.",
    },
    {
      invariantKind: "departure",
      statement: "Every other path is refused before the change is run.",
    },
    {
      invariantKind: "absence",
      statement: "A change acting on no file subtype has no path judged here.",
    },
    {
      invariantKind: "absence",
      statement: "A change acting on a file of any kind has no path judged.",
    },
    {
      invariantKind: "absence",
      statement: "A call handing in no path has no path judged here.",
    },
    {
      invariantKind: "absence",
      statement: "No change is imported here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here has an address to the arguments that address takes.",
    },
    {
      invariantKind: "gap",
      statement:
        "A change whose code throws while loading refuses the run rather than the landing.",
    },
    {
      invariantKind: "departure",
      statement: "Every answer a change gives is dropped from before that answer is guarded.",
    },
    {
      invariantKind: "departure",
      statement: "An answer a change reached inside gives is dropped from at that rung too.",
    },
  ],
} as const satisfies Module
