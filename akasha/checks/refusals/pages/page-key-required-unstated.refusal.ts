import type { Refusal } from "../refusal.page-type.ts"

export const pageKeyRequiredUnstated = {
  id: "01a06611-3992-7beb-a599-755ca7f73460",
  pageTypeSlug: "refusal",
  slug: "page-key-required-unstated",
  title: "Page key required unstated",
  text: "`{key}` is required on `{on}` and this states none",
} as const satisfies Refusal
