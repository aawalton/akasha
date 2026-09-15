import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorAccountConfig = {
  id: "01a0683e-3dbe-7000-8023-4fb6336e3734",
  type: "module",
  slug: "supervisor-account-config",
  definition: "the model, effort, timeouts and windows a seat spawns under",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The settings a seat spawns under are read from the seat conditions rather than the environment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A model the vocabulary does not name is refused rather than passed through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A window that cannot be read leaves the setting unset rather than throwing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No account is consulted for whether the long context window may be asked for.",
    },
  ],
} as const satisfies Module
