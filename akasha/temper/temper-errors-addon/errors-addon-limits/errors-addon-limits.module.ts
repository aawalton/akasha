import type { Module } from "@akasha/code-system/module"

export const errorsAddonLimits = {
  id: "01a060d8-0917-72f6-9712-2e34f6088161",
  pageTypeSlug: "module",
  slug: "errors-addon-limits",
  definition: "how many error entries are kept and how long a recorded callstack may grow",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Fifty distinct errors are kept.",
    },
    {
      invariantKind: "departure",
      statement: "A callstack beyond 1900 characters ends in an ellipsis.",
    },
  ],
} as const satisfies Module
