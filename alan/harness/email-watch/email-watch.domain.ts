import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const emailWatch = {
  id: "01a06596-a92e-7000-b678-5d6232425a71",
  type: "page-type/domain",
  slug: "email-watch",
  definition: "how a new email in Alan's inbox is handled",
  parts: [
    "module/email-rule-deciding",
    "module/email-rule-reading",
    "module/email-rule-set",
    "module/inbox-pass",
    "module/inbox-run",
    "module/inbox-watching",
    "service-workstation/alan-email-worker",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is acted on once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The state a run owes the next run is kept outside the repository.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every action taken on a message is appended to a log.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rules a run reads are reached from akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message on a persona channel is decided before any rule sees that message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message on a persona channel Alan did not send is left alone rather than acted on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each persona is told only the claims made on her own channel.",
    },
  ],
} as const satisfies Domain
