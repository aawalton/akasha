import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const serviceLifecycle = {
  id: "01a0ca94-c323-755d-aaa4-e6bbe1b3ce6e",
  type: "page-type/page-type",
  slug: "service-lifecycle",
  definition: "how a service is held on the machine it runs on",
  parts: ["service-lifecycle/always-on", "service-lifecycle/pool"],
  extends: ["page-type/domain"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
