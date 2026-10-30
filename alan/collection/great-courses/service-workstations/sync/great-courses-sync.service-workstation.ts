import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const greatCoursesSync = {
  id: "01a06829-0194-71d6-8b3b-2687352034df",
  type: "page-type/service-workstation",
  slug: "great-courses-sync",
  definition: "the service that runs the sync of The Great Courses",
  enabled: true,
  needsSecrets: false,
  systemd: {
    schedule: "*-*-* 07:35:00",
    jitterSeconds: 300,
    catchUp: true,
    startTimeoutSeconds: 1800,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A course sits on a shelf by that shelf's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`partOf` is a relation-slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalogue link naming no path is resolved against the catalogue's own address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A read answering fewer pages than that read counted is refused rather than returned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The root's `lastSyncedAt` holds the sync off for thirty days after one lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is read or written except through the page query service.",
    },
  ],
  createdAt: "2026-09-03T16:45:12.980Z",
  updatedAt: "2026-10-30T15:22:01.074Z",
} as const satisfies ServiceWorkstation
