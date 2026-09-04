import type { Module } from "@akasha/code-system/module"

export const navCountBadgeDecider = {
  id: "01a05c40-2194-7494-a518-786df4acb4e9",
  pageTypeSlug: "module",
  slug: "nav-count-badge-decider",
  definition: "Decides whether a nav item shows a count badge, from its flag and its count.",
  code: "ts",
} as const satisfies Module
