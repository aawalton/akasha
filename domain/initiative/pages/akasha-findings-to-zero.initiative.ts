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
        "130 are left. The first run is done: 344 read, 67 dropped. The second run is with Alan, in panel order down `kept-order.tsv` in the scratchpad. Next after this is entry 179 of 275. Entry 177 was put to Alan and is unanswered; entry 178 is being built. Entry 167 was held for the ESO generator and is measurable again. A drop needs no answer; only a proposal to do work is put to Alan. Other seats delete findings as this runs, so check each slug is still there. Verify by running, not reading.\n",
    },
    {
      statement: "No module nothing reaches is left.",
      workingMemory:
        "21 are left, and every one is reviewed with Alan rather than removed on the check's word. `no-unused-modules` names them, run against the full checkout: its audit phase is blind on a depth-1 clone where the 24-hour grace spares everything. Groups: monarch 7, core 6, design components 4, harness 3, `synth-running` 1. Three false positives cleared at 333cc32f640. A module may be run by hand with `bun <path>`, which no route sees.",
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
    "The proposal is stated in one line rather than asked as a question, so the last line is a proposal.",
    "The count resolved and the count left are said when a run ends.",
    "A finding is verified against the tree as it is now before it is put to Alan, and what was measured is said with it.",
    "A proposal to drop a finding is taken as approved, and only a proposal to do work is put to Alan.\n",
  ],
} as const satisfies Initiative
