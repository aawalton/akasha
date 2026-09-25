import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const changeLoading = {
  id: "01a08161-d992-7ad5-b5f9-6397f53d2002",
  type: "page-type/module",
  slug: "change-loading",
  definition: "the change filed at an address, loaded and run for the answer it gives",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An address is the page type and the slug the change is filed under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page at an address is read off the index rather than found by a search.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change's code is beside its page under the key its page type declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change exports its run under one name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An agent change states the arguments that change takes beside its run, under one name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An agent change states which of those arguments are passages beside its run, under one name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key no change reached by name takes is refused before that change runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One key is refused at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The arguments a change takes are said to a caller from the change's own list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change stating no arguments is said to take none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A help answer opens with the call and the change's own definition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change stating no definition is answered with the call alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Both spellings of the help flag are told apart from an argument here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The space at either end of what is piped in is not taken as part of the flag.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A change reached by another change has no key judged here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A change stating no arguments has no key judged here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address reaching no page is refused rather than answered with no edits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address naming no page and a body exporting no run are two refusals.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Loading a change and running that change are two acts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Loading a change reaches the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change is loaded from the path its code sits at rather than the path named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change reached more than once over one world is looked up once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A world reached over twice looks a change up again for the second world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lock a caller has over a store is held while a change reached inside loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The target subtype a change acts on is read off that change's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The subtype a change judges a path against is worked out once over one world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The path handed in is read under the name every change names a path by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path whose kind narrows the subtype the change acts on is run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other path is refused before the change is run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path handed to a change acting on a page subtype is judged as a page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A change acting on neither a file subtype nor a page subtype has no path judged here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A change acting on a file of any kind has no path judged.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A call handing in no path has no path judged here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No change is imported here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here has an address to the arguments that address takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change whose code throws while loading is refused, saying what it threw.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every answer a change gives is dropped from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer a change reached inside gives is dropped from at that rung too.",
    },
  ],
} as const satisfies Module
