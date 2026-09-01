import type { Module } from "@akasha/code-system/module"

export const deviceSecretStanding = {
  id: "01a05b39-f50c-7ad6-a7d4-29b6957fb929",
  pageTypeSlug: "module",
  slug: "device-secret-standing",
  definition: "the account a device presenting a secret stands for, and how that secret is kept",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A presented secret is matched by its hash rather than by itself.",
    },
    {
      invariantKind: "departure",
      statement: "A page is asked for under the key it carries rather than under its slug.",
    },
    {
      invariantKind: "departure",
      statement: "The rows the store answers with are narrowed again here.",
    },
    {
      invariantKind: "departure",
      statement: "Pages that went unread are told apart from pages that matched nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A hash standing on two pages is read to neither.",
    },
    {
      invariantKind: "departure",
      statement: "Two hashes are compared in time that does not vary with how they differ.",
    },
    {
      invariantKind: "departure",
      statement: "A secret is minted only for an account a person states.",
    },
    {
      invariantKind: "departure",
      statement: "A device minting again keeps the page it already stands on.",
    },
    {
      invariantKind: "departure",
      statement: "A revoked secret keeps its page rather than losing it.",
    },
    {
      invariantKind: "absence",
      statement: "No refusal carries the secret that was presented.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what an account may reach.",
    },
    {
      invariantKind: "gap",
      statement: "When a secret was last presented is written nowhere.",
    },
  ],
} as const satisfies Module
