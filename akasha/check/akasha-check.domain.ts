import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const akashaCheck = {
  id: "01a049e9-651c-7008-b4db-b19f7b063ac1",
  pageTypeSlug: "domain",
  slug: "akasha-check",
  definition: "a judgement passed on a change before it lands",
  invariants: [
    {
      invariantKind: "stopgap",
      statement:
        "No check stands only to test what the compiler tests apart from the one that runs it.",
    },
    {
      invariantKind: "gap",
      statement: "A check that only repeats the compiler does not land.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Do The Work",
      act: "Never add a check for a set of work to be completed; complete the work instead.",
      warrant:
        "A check with nothing left to catch reads like one still working, and every author pays for it.",
      aids: [
        "Ask whether a new violation can arrive tomorrow.",
        "Never refuse a check for arriving in a migration.",
      ],
    },
  ],
} as const satisfies Domain
