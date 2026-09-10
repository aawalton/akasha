import type { Host } from "../host.page-type.types.ts"

export const node03 = {
  id: "01a06590-e94f-7b00-b6ef-c798573fd41a",
  pageTypeSlug: "host",
  type: "host",
  slug: "node-03",
  definition: "the machine named node-03 in the main cluster",
  title: "node-03",
  address: "192.168.68.75",
  loginUser: "walton",
} as const satisfies Host
