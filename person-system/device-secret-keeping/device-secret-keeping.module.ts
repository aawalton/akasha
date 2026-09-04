import type { Module } from "@akasha/code-system/module"

export const deviceSecretKeeping = {
  id: "01a05b39-f50c-7ad6-a7d4-29b6957fb929",
  pageTypeSlug: "module",
  slug: "device-secret-keeping",
  definition: "the account a device presenting a secret represents, and how that secret is kept",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A presented secret is matched by its hash rather than by itself.",
    },
    {
      invariantKind: "departure",
      statement: "A page is asked for under the key the page carries rather than under its slug.",
    },
    {
      invariantKind: "departure",
      statement: "The pages are asked of the pages system service rather than opened.",
    },
    {
      invariantKind: "departure",
      statement: "The rows the service answers with are narrowed again here.",
    },
    {
      invariantKind: "departure",
      statement: "Pages that went unread are told apart from pages that matched nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A hash standing on two pages is read to neither page.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two hashes are compared in time that does not vary with how the two hashes differ.",
    },
    {
      invariantKind: "departure",
      statement: "A secret is minted only for an account a person states.",
    },
    {
      invariantKind: "departure",
      statement: "A device minting again keeps the page the device already stands on.",
    },
    {
      invariantKind: "departure",
      statement: "A page is written as a whole body carried to the pages system service.",
    },
    {
      invariantKind: "departure",
      statement: "A page written over names the commit its body was read at.",
    },
    {
      invariantKind: "departure",
      statement: "A minting that does not land answers why rather than a secret.",
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
