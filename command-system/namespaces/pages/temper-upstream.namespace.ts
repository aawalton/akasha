import type { Namespace } from "../namespace.page-type.ts"

export const temperUpstream = {
  id: "01a07c18-0bcd-7973-83a4-7b9398147317",
  pageTypeSlug: "namespace",
  slug: "temper-upstream",
  definition: "the data Temper takes in from outside",
  partSlugs: ["command/temper-upstream-data-port", "command/temper-upstream-data-verify"],
} as const satisfies Namespace
