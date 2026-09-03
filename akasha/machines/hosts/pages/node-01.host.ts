import type { Host } from "../host.page-type.ts"

export const node01 = {
  id: "01a0658e-e3ce-7b11-97eb-5a3fd251f2bb",
  pageTypeSlug: "host",
  slug: "node-01",
  definition: "the machine named node-01 in the main cluster",
} as const satisfies Host
