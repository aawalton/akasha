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
        "The first run is done. 344 were read in panel order, 67 dropped, 277 left: 221 kept for the second run and 56 under `alan-book/all-about-alan` passed over unread, being Alan's own notes. Most died because what they said stopped being true: the folder went with the workspace folding, the index was rebuilt, or another lane landed the mend. The second run is taken with Alan over the 221, one at a time. `run-one.log` in the scratchpad holds a line per finding.\n",
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
  ],
} as const satisfies Initiative
