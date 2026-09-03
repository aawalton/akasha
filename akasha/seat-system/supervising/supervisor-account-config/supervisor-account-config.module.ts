import type { Module } from "@akasha/code-system/module"

export const supervisorAccountConfig = {
  id: "01a0683e-3dbe-7000-8023-4fb6336e3734",
  pageTypeSlug: "module",
  slug: "supervisor-account-config",
  definition: "the model, effort, timeouts and windows a seat spawns under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What a seat spawns under is read from the seat conditions rather than from the environment.",
    },
    {
      invariantKind: "departure",
      statement: "A model the vocabulary does not name is refused rather than passed through.",
    },
    {
      invariantKind: "departure",
      statement: "A window that cannot be read leaves the setting unset rather than throwing.",
    },
    {
      invariantKind: "absence",
      statement: "No account is consulted for whether the long context window may be asked for.",
    },
  ],
} as const satisfies Module
