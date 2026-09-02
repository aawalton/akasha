import type { Module } from "@akasha/code-system/module"

export const watcherBuildStatusCard = {
  id: "01a06432-b190-7d94-813e-11eb504fe26c",
  pageTypeSlug: "module",
  slug: "watcher-build-status-card",
  definition: "the card telling what the watcher last built and how that build went",
  code: "tsx",
} as const satisfies Module
