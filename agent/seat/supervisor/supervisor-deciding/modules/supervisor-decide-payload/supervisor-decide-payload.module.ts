import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorDecidePayload = {
  id: "01a0683e-3dbe-7017-8a20-75a3afbbc779",
  type: "page-type/module",
  slug: "supervisor-decide-payload",
  definition: "the questions the deciding command is asked, read out of untyped JSON",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field of the wrong type names its own path in the fault.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides anything.",
    },
  ],
} as const satisfies Module
