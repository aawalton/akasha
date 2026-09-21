import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const errorsAddonLimits = {
  id: "01a060d8-0917-72f6-9712-2e34f6088161",
  type: "page-type/module",
  slug: "errors-addon-limits",
  definition: "how many error entries are kept and how long a recorded callstack may grow",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Fifty distinct errors are kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A callstack beyond 1900 characters ends in an ellipsis.",
    },
  ],
} as const satisfies Module
