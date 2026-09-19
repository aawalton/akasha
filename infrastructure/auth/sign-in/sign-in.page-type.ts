import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const signIn = {
  id: "01a0baea-de7e-759b-9308-31ab255cc263",
  type: "page-type/page-type",
  slug: "sign-in",
  definition: "the account at a provider that one contributor signs in with",
  extends: ["page-type/page"],
  parts: [
    "text-property/sign-in-provider",
    "text-property/sign-in-subject-hash",
    "relation-property/sign-in-contributor",
  ],
  properties: [
    { pageProperty: "text-property/sign-in-provider", required: true, many: false },
    { pageProperty: "text-property/sign-in-subject-hash", required: true, many: false },
    { pageProperty: "relation-property/sign-in-contributor", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sign-in is named by its provider and its hash together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sign-in is reached by name rather than looked for.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
