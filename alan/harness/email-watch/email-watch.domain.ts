import type { Domain } from "../../../domains/domain.page-type.ts"

export const emailWatch = {
  id: "01a06596-a92e-7000-b678-5d6232425a71",
  pageTypeSlug: "domain",
  slug: "email-watch",
  definition: "what becomes of a message that arrives in Alan's inbox",
  parts: [
    "module/email-rule-deciding",
    "module/email-rule-reading",
    "module/email-rule-set",
    "module/inbox-pass",
    "module/inbox-run",
    "module/inbox-watching",
    "workstation-service/alan-email-worker",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message is acted on once.",
    },
    {
      invariantKind: "departure",
      statement: "The state a run owes the next run is kept outside the repository.",
    },
    {
      invariantKind: "departure",
      statement: "Every action taken on a message is appended to a log.",
    },
    {
      invariantKind: "gap",
      statement: "The rules a run reads are reached from akasha.",
    },
  ],
} as const satisfies Domain
