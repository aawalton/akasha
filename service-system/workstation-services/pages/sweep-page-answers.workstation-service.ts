import type { WorkstationService } from "../workstation-service.page-type.ts"

export const sweepPageAnswers = {
  id: "019ffe91-4c22-7a30-b5f1-6d3a7c4e8b02",
  pageTypeSlug: "workstation-service",
  slug: "sweep-page-answers",
  definition: "the service taking away a kept page answer once it has stood for a day",
  runs: ["bun pages-system/page-answer-sweeping/page-answer-sweeping.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*-*-* *:23:00",
    jitterSeconds: 60,
    catchUp: true,
    startTimeoutSeconds: 600,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Answers from different states stand together, so no writing path takes an old one.",
    },
    {
      invariantKind: "departure",
      statement: "How long an answer has stood is read from the file rather than from the state.",
    },
    {
      invariantKind: "departure",
      statement: "An answer still wanted is worked out again on the next miss.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep that deletes nothing says nothing.",
    },
  ],
} as const satisfies WorkstationService
