import type { Route } from "@akasha/code-system/route"

export const claudeUsage = {
  id: "01a072ae-4955-71e6-bf45-d5a4c5a59670",
  pageTypeSlug: "route",
  slug: "claude-usage",
  definition: "what the Claude fleet has spent of its two windows",
  code: "ts",
  test: "ts",
  urlPath: "api/claude-usage",
} as const satisfies Route
