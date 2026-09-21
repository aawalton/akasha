import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const akashaFindingsToZero = {
  id: "01a0884c-4471-76ab-86aa-bb94691c846a",
  type: "page-type/initiative",
  slug: "akasha-findings-to-zero",
  domain: "page-type/finding",
  persona: "persona/akasha",
  intentStack: [
    {
      statement: "No finding is left.",
      workingMemory:
        "262 are left, and the count rises as other seats file more. The first run is done: 344 read, 67 dropped. The second run is with Alan, in panel order down `kept-order.tsv` in the scratchpad, and has taken 21. Next is `book-dependencies-have-alternatives`, entry 28 of 275. The queue is inside the 56 under `alan-book/all-about-alan`, which are Alan's own notes rather than code. Verify each against the tree first; several were already dead, and the migration moved every path their evidence names.\n",
    },
  ],
  constraints: [
    "A finding is taken up one at a time, in the order the Findings panel draws, and read fully before the next is read.",
    "No sweep is made over the findings as a whole.",
    "The first run is taken alone, and drops every finding that is a clear removal.",
    "A finding that is no clear removal is kept for the second run.",
    "Nothing is mended, delegated or put to Alan during the first run.",
    "A finding is judged against the tree as it is now rather than against the tree its evidence describes.",
    "A finding that only records how something came to be is dropped, because git holds the history.",
    "A finding is kept only where it names work somebody could do.",
    "A page stating the decision a finding wanted does not drop that finding, because the code may not hold to it.",
    "A finding about Alan's own life or notes is left for the run Alan takes.",
    "The second run is taken with Alan, over the kept findings, one at a time.",
    "Alan is given the name, one plain sentence saying what the finding is about, and one proposal.",
    "The count resolved and the count left are said when a run ends.",
    "A finding is verified against the tree as it is now before it is put to Alan, and what was measured is said with it.",
  ],
} as const satisfies Initiative
