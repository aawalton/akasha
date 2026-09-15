import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const modelProvider = {
  id: "01a0a20a-0678-73be-983a-777f3d76d8bb",
  type: "page-type",
  slug: "model-provider",
  definition: "an outside system that serves models",
  extends: ["page-type/domain"],
  parts: [
    "model-provider/anthropic",
    "model-provider/deepseek",
    "text-property/api-key",
    "url-property/api-base",
  ],
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
  properties: [
    { pageProperty: "url-property/api-base", required: true, many: false },
    { pageProperty: "text-property/api-key", required: false, many: false, secret: true },
  ],
} as const satisfies PageType
