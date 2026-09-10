import type { Initiative } from "../initiative.page-type.types.ts"

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
        "492 are left, from 512 when this began, with 56 resolved. The work is now two runs. The first goes through every finding alone, drops the ones that are clearly gone, and keeps the rest. The second is taken with Alan over whatever the first kept. Most findings die because what they say stopped being true: the folder went, the page gained the invariant, another lane landed the mend.\n",
    },
  ],
  constraints: [
    "A finding is taken up one at a time, in LC_ALL=C alpha order, and read fully before the next is read.",
    "No sweep is made over the findings as a whole.",
    "The first run is taken alone, and drops every finding that is a clear removal.",
    "A finding that is no clear removal is kept for the second run.",
    "Nothing is mended, delegated or put to Alan during the first run.",
    "A finding is judged against the tree as it is now rather than against the tree its evidence describes.",
    "A finding that only records how something came to be is dropped, because git holds the history.",
    "A finding is kept only where it names work somebody could do.",
    "A page stating the invariant a finding wanted does not drop that finding, because the code may not hold to it.",
    "A finding about Alan's own life or notes is left for the run Alan takes.",
    "The second run is taken with Alan, over the kept findings, one at a time.",
    "Alan is given the name, one plain sentence saying what the finding is about, and one proposal.",
    "The count resolved and the count left are said when a run ends.",
  ],
} as const satisfies Initiative
