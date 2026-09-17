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
        "Alan is taking these one at a time. Lately gone: the page-type writers and every guard that served them, the property definition patch arm whose every caller could only throw, the select option a page never added, and the whole idle game, whose save and draw could only throw once the store went. Held for Alan: the reorder verb chain, DisplayFrame's followAnchor, the voice design sampling block, ConvergenceOptions.",
    },
  ],
  constraints: [
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
