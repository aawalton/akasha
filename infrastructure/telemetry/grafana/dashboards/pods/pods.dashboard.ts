import type { Dashboard } from "akasha/infrastructure/telemetry/dashboard/dashboard.page-type.types.ts"

export const pods = {
  id: "01a07c67-c792-7942-ba2f-031531a70cfa",
  type: "page-type/dashboard",
  slug: "pods",
  definition: "what a chart server draws over the pods",
  layout: "json",
  createdAt: "2026-09-07T15:06:11.218Z",
  updatedAt: "2026-09-15T17:07:05.000Z",
} as const satisfies Dashboard
