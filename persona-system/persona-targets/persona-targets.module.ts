import type { Module } from "@akasha/code-system/module"

export const personaTargets = {
  id: "01a0657d-a75e-7009-bc7f-b3d878fd5671",
  pageTypeSlug: "module",
  slug: "persona-targets",
  definition: "each persona akasha holds, beside the rules by which a message starts her seat",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No persona page states a rule by which a message starts a seat.",
    },
    {
      invariantKind: "departure",
      statement:
        "The empty list is the answer the persona pages give rather than a reading that failed.",
    },
  ],
} as const satisfies Module
