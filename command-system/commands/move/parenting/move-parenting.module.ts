import type { Module } from "@akasha/code-system/module"

export const moveParenting = {
  id: "01a06d2b-a523-7de4-a400-2f0a9f2abda6",
  pageTypeSlug: "module",
  slug: "move-parenting",
  definition: "which page names a carried page among its parts, read from the folders",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's one parent is the page holding the folder the page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A folder is held by the one page whose own file sits in it.",
    },
    {
      invariantKind: "departure",
      statement: "A page type and the package named for its plural hold a folder together.",
    },
    {
      invariantKind: "departure",
      statement: "A folder called `modules` or `pages` or `properties` or `scripts` holds nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no page is climbed past rather than answered.",
    },
    {
      invariantKind: "departure",
      statement: "A climb reaching the repository root has found no page holding the folder.",
    },
    {
      invariantKind: "departure",
      statement: "A destination no page holds is refused rather than carried to.",
    },
    {
      invariantKind: "departure",
      statement: "The page holding where a carried page was is asked to name it first.",
    },
    {
      invariantKind: "departure",
      statement: "A source whose holding page names nothing carried is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An index that cannot answer leaves the parts alone and says so.",
    },
    {
      invariantKind: "departure",
      statement: "A page arriving under the page that already named it changes no parts.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page the holder of where it arrives already names is asked nothing of its source.",
    },
    {
      invariantKind: "departure",
      statement: "A page carried within one folder changes no parts.",
    },
    {
      invariantKind: "departure",
      statement: "A file that is no page's own file changes no parts.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose type is under no domain changes no parts.",
    },
    {
      invariantKind: "departure",
      statement: "What a folder holds is read as the move leaves it rather than as it is now.",
    },
    {
      invariantKind: "departure",
      statement: "A part is added in the place its spelling sorts to.",
    },
    {
      invariantKind: "departure",
      statement: "A part taken out takes its line with it.",
    },
    {
      invariantKind: "departure",
      statement: "A part already named is named once rather than twice.",
    },
    {
      invariantKind: "departure",
      statement: "A page holding where a part arrives and stating no parts is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Two changes to one page are worked into one body rather than into two.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "gap",
      statement: "A move leaves no page that no page names.",
    },
  ],
} as const satisfies Module
