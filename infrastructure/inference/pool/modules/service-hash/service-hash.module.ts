import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceHash = {
  id: "01a0685d-4b35-7005-a6aa-76a9e30cc3fe",
  type: "page-type/module",
  slug: "service-hash",
  definition: "one hash folding a service's code files together with what it is told to run",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A changed command or port or working directory changes the hash even where no source file changed.",
    },
  ],
  createdAt: "2026-09-03T17:42:19.701Z",
  updatedAt: "2026-10-30T16:09:33.965Z",
} as const satisfies Module
