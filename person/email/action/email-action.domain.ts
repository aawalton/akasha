import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const emailAction = {
  id: "01a0675b-16e1-7884-8c3c-300e5949ac31",
  type: "page-type/domain",
  slug: "email-action",
  definition: "something done in response to a piece of mail",
  parts: [
    "domain/email-action-archive",
    "domain/email-action-forward",
    "domain/email-action-notify",
    "domain/email-action-skip",
    "domain/email-action-unsubscribe",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Archiving and skipping exclude each other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every action taken on a piece of mail is recorded with whatever took that action and when.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record of an action is written once and never changed.",
    },
  ],
  createdAt: "2026-09-03T13:00:18.017Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Domain
