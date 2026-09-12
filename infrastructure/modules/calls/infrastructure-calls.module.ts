import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const infrastructureCalls = {
  id: "01a0953e-1dc9-7000-bf51-cd67b1cd4894",
  type: "module",
  slug: "infrastructure-calls",
  definition: "the calls a provisioning script makes, composed from the pages naming their levels",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call here is worked out from the pages rather than spelled as words.",
    },
    {
      invariantKind: "departure",
      statement: "A level renamed on its page is a call renamed here with no edit.",
    },
    {
      invariantKind: "departure",
      statement: "A script that runs on a machine reaches its calls here rather than spelling one.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index or the disk.",
    },
    {
      invariantKind: "absence",
      statement: "No call here is run from here.",
    },
    {
      invariantKind: "gap",
      statement:
        "A level put between two named here is left whole in the call until this names it.",
    },
  ],
} as const satisfies Module
