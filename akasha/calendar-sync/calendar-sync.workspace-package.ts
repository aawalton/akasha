import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const calendarSync = {
  id: "01a05c22-7bc9-7008-a9a5-27f7d4d1c0c0",
  pageTypeSlug: "workspace-package",
  slug: "calendar-sync",
  definition: "the events a public library publishes, brought into the page store each day",
  manifest: "json",
  partSlugs: [
    "module/caldata-schema",
    "module/zoned-time",
    "module/caldata-client",
    "module/event-to-page",
    "module/sync-result",
    "module/sync-source",
    "module/track-sync-run",
    "module/sync-all",
    "module/run-sync",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A source is added by writing a page rather than by changing this package.",
    },
    {
      invariantKind: "departure",
      statement: "An event is written under the identifier its source gave the event.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a calendar the other way.",
    },
    {
      invariantKind: "departure",
      statement: "The cluster runs the sync on a schedule.",
    },
    {
      invariantKind: "departure",
      statement: "The workload running the sync is outside akasha.",
    },
  ],
} as const satisfies WorkspacePackage
