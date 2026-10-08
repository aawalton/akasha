import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const temperUpstream = {
  id: "01a07c18-0bcd-7973-83a4-7b9398147317",
  type: "page-type/namespace",
  slug: "temper-upstream",
  definition: "the data Temper takes in from outside",
  parts: ["command/temper-upstream-data-port", "command/temper-upstream-data-verify"],
  name: "upstream",
  createdAt: "2026-09-07T13:39:05.805Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
