import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const domainKeys = {
  id: "01a06071-0c79-7e98-87f3-f277a3b41182",
  type: "module",
  slug: "domain-keys",
  definition: "the key each catalog domain is saved under, held to the payload's own fields",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The key list is checked against the payload where the compiler runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A metadata field of the payload is named by no key here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key here is a field of the payload of the same name.",
    },
  ],
} as const satisfies Module
