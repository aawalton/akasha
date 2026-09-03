import type { Refusal } from "../refusal.page-type.ts"

export const hookRegisteredTwice = {
  id: "01a06611-3989-7693-85e3-3c86705e909d",
  pageTypeSlug: "refusal",
  slug: "hook-registered-twice",
  title: "Hook registered twice",
  text: "`{target}` is registered under {event} by two files, under {times} keys the merge cannot collapse, so it RUNS {times} TIMES: {parts}.",
} as const satisfies Refusal
