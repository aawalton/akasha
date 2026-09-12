import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  type: "initiative",
  slug: "thea-checks-system",
  domain: "domain/check",
  persona: "thea",
  intents: [
    {
      statement: "No finding is filed on checks-system or any part beneath it.",
      workingMemory:
        "1 in scope, from 17. Two more are out: a-name-place-check-reaches-the-vendored-lua-runtime, whose subject states experimental, and thirteen-flat-pages-folders, filed on folder-matches-a-shape, which states experimental as well. The deploy gate went at fef3cd37b3 as stale, Alan's call. The one left is the install that never prunes, and a6eee5327 wired the workspace root in as a package, so manifest-names-what-is-reached refuses a reach at a dead @akasha name now.",
    },
  ],
  constraints: [
    "An experimental check is out of scope.",
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
