import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const googleCalendar = {
  id: "01a05c02-c732-7b6e-b180-61f29e1b42e7",
  pageTypeSlug: "workspace-package",
  slug: "google-calendar",
  definition: "Alan's Google calendar events read, made, changed and answered",
  manifest: "json",
  partSlugs: [
    "module/calendar-credentials",
    "module/calendar-auth",
    "module/calendar-client",
    "module/calendar-event-shapes",
    "module/calendar-event-schema",
    "module/calendar-events",
    "module/send-updates-narrowing",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An event naming no calendar lands on Alan's own.",
    },
    {
      invariantKind: "departure",
      statement: "Attendees are emailed unless the caller says otherwise.",
    },
  ],
} as const satisfies WorkspacePackage
