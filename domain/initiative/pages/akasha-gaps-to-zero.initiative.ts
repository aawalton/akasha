import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const akashaGapsToZero = {
  id: "01a0884c-4471-76ab-86aa-bb94691c846a",
  type: "page-type/initiative",
  slug: "akasha-gaps-to-zero",
  domain: "decision-kind/gap",
  persona: "persona/akasha",
  intentStack: [
    {
      statement: "No gap decision is left.",
      workingMemory:
        "First run done: 32 settled, 1049 left. Second run with Alan starts at the top of the Gaps panel. Panel order is listed by walking assembleGapTree. About 200 left are one hazard: a table entry moved breaks every build hash saved.",
    },
  ],
  constraints: [
    "A gap is taken up one at a time, in the order the Gaps panel draws, and read fully before the next is read.",
    "No sweep is made over the gaps as a whole.",
    "The first run is taken alone, and settles every gap whose answer the tree already gives.",
    "A gap the tree already keeps becomes a departure.",
    "A gap nothing in its domain still means is deleted.",
    "A gap the tree neither keeps nor has left behind is kept for the second run.",
    "Nothing is mended, delegated or put to Alan during the first run.",
    "A gap is judged against the tree as it is now rather than against the tree it was written over.",
    "A gap about Alan's own life or notes is left for the run Alan takes.",
    "The second run is taken with Alan, over the kept gaps, one at a time.",
    "Alan is given the page, the gap, one plain sentence saying what the gap is about, and one proposal.",
    "The proposal is stated in one line rather than asked as a question, so the last line is a proposal.",
    "The gap is put on a line of its own opening with Gap in bold, and the proposal on the last line opening with Proposal in bold.",
    "The count resolved and the count left are said when a run ends.",
    "A gap is verified against the tree as it is now before it is put to Alan, and what was measured is said with it.",
    "A proposal to turn or delete a gap is taken as approved, and only a proposal to do work is put to Alan.",
    "A deletion is never put to Alan, even where the gap's meaning cannot be found in the tree.",
  ],
} as const satisfies Initiative
