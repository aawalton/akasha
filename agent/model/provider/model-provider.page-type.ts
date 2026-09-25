import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const modelProvider = {
  id: "01a0a20a-0678-73be-983a-777f3d76d8bb",
  type: "page-type/page-type",
  slug: "model-provider",
  definition: "an external service that runs models",
  extends: ["page-type/domain"],
  parts: [
    "model-provider/anthropic",
    "model-provider/deepseek",
    "module/model-provider-reading",
    "text-property/provider-model",
    "url-property/api-base",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A provider is a domain whose subject is one external service.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A gateway sends the Anthropic wire shape, so a provider takes that shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every provider akasha reaches is a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The base a call goes to is read from the provider's page rather than from code.",
    },
  ],
  types: "ts",
  properties: [
    { pageProperty: "url-property/api-base", required: true, many: false },
    { pageProperty: "text-property/provider-model", required: false, many: false },
  ],
  schema: "jsonl",
} as const satisfies PageType
