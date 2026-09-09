import type { PageType } from "@akasha/pages/page-type"
import type { MonarchRecord } from "../records/monarch-record.page-type.ts"
import type { AppliesWhen } from "./properties/applies-when.text-property.ts"
import type { Directs } from "./properties/directs.text-property.ts"

export type MonarchDirection = MonarchRecord & {
  appliesWhen: AppliesWhen
  directs: Directs
}

export const monarchDirection = {
  id: "01a0680a-1a00-7019-8e94-6c1d5b7f1119",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "monarch-direction",
  definition: "what an agent settling a transaction is told to weigh, and where it applies",
  pluralSlug: "monarch-directions",
  extends: ["page-type/monarch-record"],
  parts: ["text-property/applies-when", "text-property/directs"],
  properties: [
    { pageProperty: "text-property/applies-when", required: true, many: false },
    { pageProperty: "text-property/directs", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A direction has no Monarch identity.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing yet reads a direction.",
    },
  ],
} as const satisfies PageType
