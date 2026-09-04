import type { Module } from "@akasha/code-system/module"

export const claudeAccountMaking = {
  id: "01a0686c-6c89-7001-b558-43fec5b9b833",
  pageTypeSlug: "module",
  slug: "claude-account-making",
  definition: "making the page a new claude-account is reached by",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder a new account is written into is read off the pages already standing.",
    },
    {
      invariantKind: "departure",
      statement: "A root standing no account throws rather than guessing that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A page's file is named for its slug and its page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account states its id, its page type, its slug, its address and its alias slot.",
    },
    {
      invariantKind: "departure",
      statement: "The rest of what an account states is left for the upstream probe to answer.",
    },
    {
      invariantKind: "departure",
      statement: "The export a page is bound to is that page's slug with each dash dropped.",
    },
    {
      invariantKind: "departure",
      statement: "An alias slot is written as a number rather than as text.",
    },
    {
      invariantKind: "departure",
      statement: "The page's text closes with one newline.",
    },
    {
      invariantKind: "departure",
      statement: "A name the account shape refuses is refused before anything is read.",
    },
    {
      invariantKind: "departure",
      statement: "An address holding a space or naming no host is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An alias slot that is no whole number from 1 up is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The name is weighed before the address and the address before the alias slot.",
    },
    {
      invariantKind: "departure",
      statement: "An account a page already stands for is answered as standing rather than made.",
    },
    {
      invariantKind: "departure",
      statement: "An identity the caller names is written rather than a fresh one.",
    },
    {
      invariantKind: "departure",
      statement: "A page is written through the landing rather than onto the disk here.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that refused says why in the words the landing refused with.",
    },
    {
      invariantKind: "departure",
      statement: "Making a page answers with an outcome rather than throwing.",
    },
    {
      invariantKind: "constraint",
      statement: "The repository root reaches this module as a parameter.",
    },
    {
      invariantKind: "constraint",
      statement: "The reading of the index reaches this module as a parameter.",
    },
    {
      invariantKind: "constraint",
      statement: "The landing reaches this module as a parameter.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a secret.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here fetches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here prints.",
    },
    {
      invariantKind: "gap",
      statement: "An address is judged as holding one `@` between two runs of non-space.",
    },
    {
      invariantKind: "gap",
      statement: "Neither the address nor the alias slot is weighed against the accounts standing.",
    },
  ],
} as const satisfies Module
