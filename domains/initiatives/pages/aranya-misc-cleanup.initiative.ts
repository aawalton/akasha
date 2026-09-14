import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aranyaMiscCleanup = {
  id: "01a0a006-83f6-7675-ba1d-e39b950540c7",
  type: "initiative",
  slug: "aranya-misc-cleanup",
  domain: "domain/infrastructure",
  persona: "aranya",
  intentStack: [
    {
      statement: "What a page states as what must be true of it is named a decision.",
      workingMemory:
        "The concept is spelled invariant today, across the property a page states, the kinds an invariant is one of, the sentence shape an invariant statement takes, the group page type, the code reading the key, the checks, and the prose. Alan wants the frame of a decision made rather than a truth found.",
    },
  ],
} as const satisfies Initiative
