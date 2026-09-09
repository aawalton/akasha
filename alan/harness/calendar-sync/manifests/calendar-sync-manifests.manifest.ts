import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const calendarSyncManifests = {
  id: "01a07380-89a5-7448-b62a-4ab0da0d59f7",
  pageTypeSlug: "manifest",
  slug: "calendar-sync-manifests",
  definition: "the CronJob that brings the day's calendar events in",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
