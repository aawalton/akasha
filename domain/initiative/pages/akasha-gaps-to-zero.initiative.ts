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
        "Second run with Alan is under way, in Gaps panel order. Every gap from the agent hooks to the end of the panel is handed to agents in blocks: the model gateway, the model accounts, agent, change and command, and page in two halves. The hook gaps wait on the bash parser switch. The domain gaps under domain/ are kept for Alan. Deploys are owed at the end: temper-web, service-workstation, the model gateway, and every temper addon an agent names.",
    },
  ],
  constraints: [
    "A gap is put to Alan one at a time, in the order the Gaps panel draws.",
    "The gaps after the one put to Alan are measured ahead, so each proposal is ready when its turn comes.",
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
    "Nothing is put to Alan while every agent slot is taken; the run waits until a slot frees.",
  ],
} as const satisfies Initiative
