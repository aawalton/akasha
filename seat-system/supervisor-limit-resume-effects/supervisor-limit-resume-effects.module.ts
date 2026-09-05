import type { Module } from "@akasha/code-system/module"

export const supervisorLimitResumeEffects = {
  id: "01a06838-5a84-7006-be45-2e23ffbbeeca",
  pageTypeSlug: "module",
  slug: "supervisor-limit-resume-effects",
  definition: "a rate-limit death read out of a transcript, and the decide module asked about it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A rate limit is read from the last assistant line of a transcript, not from any line.",
    },
    {
      invariantKind: "departure",
      statement: "A line that is no JSON object is passed over rather than ending the read.",
    },
    {
      invariantKind: "departure",
      statement: "A death is a rate limit only where that line is an api error at status 429.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript carrying no assistant line is no rate-limit death.",
    },
    {
      invariantKind: "departure",
      statement: "The decision is made by the decide module rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "The decide module is imported from beside this one and its function called.",
    },
    {
      invariantKind: "departure",
      statement:
        "A decide that throws is at fault, and the fault carries that decide's own message.",
    },
  ],
} as const satisfies Module
