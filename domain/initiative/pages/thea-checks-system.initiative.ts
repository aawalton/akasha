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
        "Alan is taking these one at a time. Lately gone: the seat pendency verdict, the reaper's redaction half, the supervisor's rebind-on-rotation path, green-day points, the ESO companion build search, the page-type writers and every guard that served them, and the property definition patch arm whose every caller could only throw. The generic write path writes a page type now, at the path the write names.",
    },
  ],
  constraints: [
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
