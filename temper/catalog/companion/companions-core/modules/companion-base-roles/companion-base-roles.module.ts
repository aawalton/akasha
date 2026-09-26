import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionBaseRoles = {
  id: "01a06108-0764-711e-b931-1a61746c79b0",
  type: "page-type/module",
  slug: "companion-base-roles",
  definition: "every duty a companion is built to cover, with the gear each duty is built around",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A base role is read from its page, in the order the pages state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ids a rule names stay in code, and every other fact comes from the pages.",
    },
  ],
} as const satisfies Module
