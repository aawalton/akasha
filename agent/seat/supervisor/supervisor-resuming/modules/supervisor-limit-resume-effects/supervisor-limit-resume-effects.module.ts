import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorLimitResumeEffects = {
  id: "01a06838-5a84-7006-be45-2e23ffbbeeca",
  type: "page-type/module",
  slug: "supervisor-limit-resume-effects",
  definition: "a rate-limit death read out of a transcript, and the decide module asked about it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A rate limit is read from the last assistant line of a transcript rather than from any line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line that is no JSON object is passed over rather than ending the read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A death is a rate limit only where that line is an api error at status 429.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A transcript with no assistant line is no rate-limit death.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The decision is made by the decide module rather than here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The decide module is imported from beside this module and its function called.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A decide that throws is at fault.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fault carries that decide's own message.",
    },
  ],
} as const satisfies Module
