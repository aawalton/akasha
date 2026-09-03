import type { Module } from "@akasha/code-system/module"

export const supervisorAskRule = {
  id: "01a0683e-3dbe-700b-947c-d3d4194c1ae8",
  pageTypeSlug: "module",
  slug: "supervisor-ask-rule",
  definition: "a rule asked of the deciding command",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule that cannot be reached is answered with the safe value and a notice.",
    },
    {
      invariantKind: "departure",
      statement: "A rule that cannot be reached is never a throw the caller must catch.",
    },
  ],
} as const satisfies Module
