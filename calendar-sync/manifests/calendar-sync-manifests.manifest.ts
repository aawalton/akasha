import type { Manifest } from "@akasha/k8s-types/manifest"

export const calendarSyncManifests = {
  id: "01a07380-89a5-7448-b62a-4ab0da0d59f7",
  pageTypeSlug: "manifest",
  slug: "calendar-sync-manifests",
  definition: "the CronJob that brings the day's calendar events in",
  code: "ts",
} as const satisfies Manifest
