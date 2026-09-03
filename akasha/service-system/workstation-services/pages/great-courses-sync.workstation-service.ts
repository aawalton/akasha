import type { WorkstationService } from "../workstation-service.page-type.ts"

export const greatCoursesSync = {
  id: "01a06829-0194-71d6-8b3b-2687352034df",
  pageTypeSlug: "workstation-service",
  slug: "great-courses-sync",
  definition: "the service filing a Great Courses course as a page where none stands for it",
  runs: ["bun akasha/great-courses/catalogue-syncing/catalogue-syncing.module.code.ts"],
  enabled: true,
  needsSecrets: false,
  systemd: {
    schedule: "*-*-* 07:35:00",
    jitterSeconds: 300,
    catchUp: true,
    startTimeoutSeconds: 1800,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "A course sits on a shelf by that shelf's slug, `partOf` being a relation-slug.",
    },
    {
      invariantKind: "departure",
      statement: "A catalogue link naming no path is resolved against the catalogue's own address.",
    },
    {
      invariantKind: "departure",
      statement: "A read answering fewer pages than it counted is refused rather than returned.",
    },
    {
      invariantKind: "departure",
      statement: "The root's `lastSyncedAt` holds the sync off for thirty days after one lands.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is read or written except through the page query service.",
    },
  ],
} as const satisfies WorkstationService
