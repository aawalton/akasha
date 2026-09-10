import type { Host } from "../host.page-type.types.ts"

export const workstation = {
  id: "01a06590-e94f-7a8c-a9bf-dd26522b8fd3",
  pageTypeSlug: "host",
  type: "host",
  slug: "workstation",
  definition: "Alan's Linux desktop",
  title: "Workstation",
} as const satisfies Host
