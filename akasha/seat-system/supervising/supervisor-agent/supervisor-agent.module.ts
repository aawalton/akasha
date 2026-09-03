import type { Module } from "@akasha/code-system/module"

export const supervisorAgent = {
  id: "01a0683e-3dbe-7003-8c74-a74611900fdd",
  pageTypeSlug: "module",
  slug: "supervisor-agent",
  definition: "the account a seat runs under and the credential written for it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An expired pinned account is refused headless and re-authenticated interactively.",
    },
    {
      invariantKind: "departure",
      statement: "A pinned account with no credential falls back only where it was not pinned.",
    },
    {
      invariantKind: "departure",
      statement:
        "A credential that cannot be read is a fault rather than an account that is absent.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here renews a token.",
    },
  ],
} as const satisfies Module
