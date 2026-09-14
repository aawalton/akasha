import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const modelProvider = {
  id: "01a0a20a-0678-73be-983a-777f3d76d8bb",
  type: "page-type",
  slug: "model-provider",
  definition: "an outside system that serves models",
  pluralSlug: "model-providers",
  extends: ["page-type/domain"],
  parts: ["model-provider/anthropic", "url-property/api-base"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A provider is a domain whose subject is one outside system.",
    },
    {
      invariantKind: "constraint",
      statement: "A gateway sends the Anthropic wire shape, so a provider takes that shape.",
    },
  ],
  types: "ts",
  properties: [{ pageProperty: "url-property/api-base", required: true, many: false }],
} as const satisfies PageType
