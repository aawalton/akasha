import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  type: "page-type/initiative",
  slug: "thea-checks-system",
  domain: "domain/check",
  persona: "persona/thea",
  intentStack: [
    {
      statement: "No arm of the codebase is built and reached by nothing.",
      workingMemory:
        "Alan is taking these one at a time, and the accidental arms are gone. What is left is declared: where a page's decision or definition names the capability, cutting it retracts an intent and Alan settles it; where nothing names it, it is an accident and goes. Held that way: the reorder chain, Start.pages, fiveHourResetsAtMs, subagent-kind, followAnchor, the voice design sampling block, ConvergenceOptions. Apart from these, the memory reaper's per-tree leg matches no live supervisor.",
    },
  ],
  constraints: [
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
