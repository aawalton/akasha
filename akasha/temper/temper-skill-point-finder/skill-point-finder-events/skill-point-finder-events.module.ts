import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillPointFinderEvents = {
  id: "01a060ec-583b-7c95-865c-bc8ca2bf1835",
  pageTypeSlug: "module",
  slug: "skill-point-finder-events",
  definition: "what the skill point window redraws in answer to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A redraw is asked for by a game event rather than by a timer.",
    },
  ],
} as const satisfies Module
