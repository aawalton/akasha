import type { Initiative } from "../initiative.page-type.ts"

export const aineFindingsToZero = {
  id: "01a0884c-4471-76ab-86aa-bb94691c846a",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "aine-findings-to-zero",
  domain: "page-type/finding",
  persona: "aine",
  intents: [
    {
      statement: "No finding is left.",
      workingMemory:
        "500 are left, from 512 when this began, with 44 resolved. New findings arrive while old ones close, so the count falls slower than the work does. Most die because what the finding says stopped being true: the folder went, the page gained the invariant, another lane landed the mend. A few are carried onto a page first, and a few are worked or delegated.\n",
    },
  ],
  constraints: [
    "A finding is taken up one at a time, in LC_ALL=C alpha order, and resolved fully before the next is read.",
    "No sweep is made over the findings as a whole.",
    "A deletion needs no approval, and everything else is put to Alan before it is done.",
    "A finding is judged against the tree as it is now rather than against the tree its evidence describes.",
    "A small change is made directly and a large one is delegated.",
    "Alan is given the name, one plain sentence saying what the finding is about, and one proposal.",
    "The count resolved and the count left are said after each finding.",
  ],
} as const satisfies Initiative
