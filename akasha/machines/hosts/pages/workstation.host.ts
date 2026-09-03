import type { Host } from "../host.page-type.ts"

export const workstation = {
  id: "01a0658e-e3ce-7fa9-867a-4b80810640de",
  pageTypeSlug: "host",
  slug: "workstation",
  definition: "Alan's Linux desktop",
} as const satisfies Host
