import type { Command } from "@akasha/command-system/command"

export const partCensus = {
  id: "01a06980-1555-7a08-bb32-1356070862a7",
  pageTypeSlug: "command",
  slug: "part-census",
  definition: "the command naming every page no page above it names among its parts",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--paths", takes: "say only the path of each page left unnamed, one on each line" },
    { said: "--counts", takes: "say beside the census how many pages each page type gave it" },
  ],
  helpNotes: [
    "this is the backstop for the mechanical road: a mechanical landing runs no check, and this reads the whole tree for the one fault that road lands most.",
    "the predicate is the `domain-is-named-by-a-parent` check's own: a page under `domain` is a part of a page above it.",
    "the check reads one change. this reads every page, so a fault landed before the check existed is found too.",
    "it costs about half a second and a third of a gigabyte in one process, against `akasha audit` at fifteen minutes and seventeen gigabytes.",
    "clear what it names by adding the page's `<page type>/<slug>` to the `partSlugs` of the page above it.",
    "a page named in a manifest landed before the page took its id reads as unnamed until that manifest lands again.",
    "a reading taken across a landing reports pages that landing has since named, so read it twice before believing a rise.",
    "the code is 0 where every page is named and 2 where any one of them is not.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every page under `domain` is judged rather than the pages a change carries.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming any page left unnamed answers with a code of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The paths come back in the order of the page type and slug each page holds.",
    },
    {
      invariantKind: "departure",
      statement: "A run asked for paths alone says nothing besides those paths.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is written by this command.",
    },
  ],
} as const satisfies Command
