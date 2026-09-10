import type { Host } from "../host.page-type.types.ts"

export const node01 = {
  id: "01a06590-e94f-7936-a87c-f8d006e7f8a8",
  pageTypeSlug: "host",
  type: "host",
  slug: "node-01",
  definition: "the machine named node-01 in the main cluster",
  title: "node-01",
  address: "192.168.68.87",
  loginUser: "walton",
} as const satisfies Host
