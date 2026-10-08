import type { Host } from "akasha/infrastructure/machine/host/host.page-type.types.ts"

export const workstation = {
  id: "01a06590-e94f-7a8c-a9bf-dd26522b8fd3",
  type: "page-type/host",
  slug: "workstation",
  definition: "Alan's Linux desktop",
  title: "Workstation",
  createdAt: "2026-09-03T04:39:50.863Z",
  updatedAt: "2026-09-15T17:10:29.000Z",
} as const satisfies Host
