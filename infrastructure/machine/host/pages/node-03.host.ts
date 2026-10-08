import type { Host } from "akasha/infrastructure/machine/host/host.page-type.types.ts"

export const node03 = {
  id: "01a06590-e94f-7b00-b6ef-c798573fd41a",
  type: "page-type/host",
  slug: "node-03",
  definition: "the machine named node-03 in the main cluster",
  title: "node-03",
  address: "192.168.68.75",
  loginUser: "walton",
  createdAt: "2026-09-03T04:39:50.863Z",
  updatedAt: "2026-09-15T17:10:29.000Z",
} as const satisfies Host
