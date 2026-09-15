import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueMisc = {
  id: "01a0a5d6-fc2e-7ca4-92a1-55ebb59698b5",
  type: "page-type/initiative",
  slug: "nimue-misc",
  domain: "domain/technology",
  persona: "persona/nimue",
  intentStack: [
    {
      statement: "What a page states as what must be true of it is named a decision.",
      workingMemory:
        "The concept is spelled invariant today, across the property a page states, the kinds an invariant is one of, the sentence shape an invariant statement takes, the group page type, the code reading the key, the checks, and the prose. Alan wants the frame of a decision made rather than a truth found.",
    },
  ],
} as const satisfies Initiative
