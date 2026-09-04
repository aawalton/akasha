import type { Command } from "@akasha/command-system/command"

export const partCensus = {
  id: "01a06980-1555-7a08-bb32-1356070862a7",
  pageTypeSlug: "command",
  slug: "part-census",
  definition: "the command naming every page no page names among its parts, or more than one does",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--paths",
      takes: "say only the path of each page the parts fail to name once, one on each line",
    },
    { said: "--counts", takes: "say beside the census how many pages each page type gave it" },
  ],
  helpNotes: [
    "this is the backstop for the mechanical road: a mechanical landing runs no check, and this reads the whole tree for the one fault that road lands most.",
    "the predicate is that the parts are a spanning tree: every page under `domain` but `domain/akasha` is a part of exactly one page above it.",
    "the check reads one change. this reads every page, so a fault landed before the check existed is found too.",
    "it costs about half a second and a third of a gigabyte in one process, against `akasha audit` at fifteen minutes and seventeen gigabytes.",
    "clear a page no page names by adding the page's `<page type>/<slug>` to the `partSlugs` of the page above it.",
    "clear a page more than one page names by taking that address out of the `partSlugs` of every page naming it but one.",
    "a page named in a manifest landed before the page took its id reads as unnamed until that manifest lands again.",
    "a reading taken across a landing reports pages that landing has since named, so read it twice before believing a rise.",
    "the code is 0 where exactly one page names every page and 2 where any one page is named otherwise.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every page under `domain` is judged rather than the pages a change carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run naming any page the parts fail to name once answers with a code of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A page no page names and a page more than one names answer with that one code.",
    },
    {
      invariantKind: "departure",
      statement: "The pages naming a page more than one page names are said beside that page.",
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
