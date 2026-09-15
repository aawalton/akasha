import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAccountMaking = {
  id: "01a0686c-6c89-7001-b558-43fec5b9b833",
  type: "module",
  slug: "model-account-making",
  definition: "making the page a new model-account is reached by",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder a new account is written into is read off the pages already there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A root holding no account throws rather than guessing that folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's file is named for its slug and its page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An account states its id and its page type and its slug and its address and its alias slot.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The rest of the values an account states is left for the upstream probe to answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The export a page is bound to is that page's slug with each dash dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An alias slot is written as a number rather than as text.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A page composed here parses whatever characters the address carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every text written into the page is written as a quoted literal is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page's text closes with one newline.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page composed names its type from the root rather than by a relative path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name the account shape refuses is refused before anything is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address with a space or naming no host is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An alias slot that is no whole number from 1 up is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name is weighed before the address and the address before the alias slot.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account a page already exists for is answered as standing rather than made.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An identity the caller names is written rather than a fresh identity.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is written through the landing rather than onto the disk here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The change adding a file writes the page rather than an edit composed here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing that refused says why in the words the landing refused with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Making a page answers with an outcome rather than throwing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A make that threw after the landing committed names that commit in what it refuses with.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The repository root reaches this module as a parameter.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The reading of the index reaches this module as a parameter.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The landing reaches this module as a parameter.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a secret.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here fetches.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here prints.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An address is judged as holding one `@` between two runs of non-space.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "Neither the address nor the alias slot is weighed against the accounts there are.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A new account's page is written into a folder of its own beside the other accounts' folders.",
    },
  ],
} as const satisfies Module
