import type { Module } from "@akasha/code-system/module"

export const supervisorDecidePayload = {
  id: "01a0683e-3dbe-7017-8a20-75a3afbbc779",
  pageTypeSlug: "module",
  slug: "supervisor-decide-payload",
  definition: "the questions the deciding command is asked, read out of untyped JSON",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field that is not what it should be names its own path in the fault.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides anything.",
    },
  ],
} as const satisfies Module
