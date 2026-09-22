import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceHash = {
  id: "01a0685d-4b35-7005-a6aa-76a9e30cc3fe",
  type: "page-type/module",
  slug: "service-hash",
  definition: "a hash folding a service's source files together with what it is told to run",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A changed command or port or working directory changes the hash even where no source file changed.",
    },
  ],
} as const satisfies Module
