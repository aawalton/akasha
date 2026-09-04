import type { Domain } from "../../../../domains/domain.page-type.ts"

export const emailAction = {
  id: "01a0675b-16e1-7884-8c3c-300e5949ac31",
  pageTypeSlug: "domain",
  slug: "email-action",
  definition: "something done in response to a piece of mail",
  partSlugs: [
    "domain/email-action-archive",
    "domain/email-action-forward",
    "domain/email-action-notify",
    "domain/email-action-skip",
    "domain/email-action-unsubscribe",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Archiving and skipping exclude each other.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every action taken on a piece of mail is recorded with whatever took it and when.",
    },
    {
      invariantKind: "departure",
      statement: "A record of an action is written once and never changed.",
    },
  ],
} as const satisfies Domain
