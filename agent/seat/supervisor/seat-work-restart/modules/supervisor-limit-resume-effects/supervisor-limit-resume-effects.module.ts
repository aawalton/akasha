import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorLimitResumeEffects = {
  id: "01a06838-5a84-7006-be45-2e23ffbbeeca",
  type: "page-type/module",
  slug: "supervisor-limit-resume-effects",
  definition: "a rate-limit death read out of a transcript",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rate limit is read from the last assistant line of a transcript rather than from any line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line that is no JSON object is passed over rather than ending the read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A death is a rate limit only where that line is an api error at status 429.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript with no assistant line is no rate-limit death.",
    },
  ],
} as const satisfies Module
