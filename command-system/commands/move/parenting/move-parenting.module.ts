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
      statement: "A folder is held by the one page whose own file sits in that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A page a carried page holds is not the page holding that carried page.",
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
      statement: "A destination no page holds leaves the carried page's parent as that parent was.",
    },
    {
      invariantKind: "departure",
      statement: "A page left under the parent that page has is named in the answer with why.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page left under the parent that page has is asked nothing of the page holding where that page was.",
    },
    {
      invariantKind: "departure",
      statement: "The page holding where a carried page was is asked to name that page first.",
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
      statement:
        "A page arriving under the page that already named that arriving page changes no parts.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page the holder of where that page arrives already names is asked nothing of its source.",
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
      statement:
        "The files a folder holds are read as the move leaves that folder rather than as that folder is now.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page losing a part while the move carries that page is named where that page arrives.",
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
