import type { Host } from "akasha/infrastructure/machine/host/host.page-type.types.ts"

export const node05 = {
  id: "01a06590-e94f-73c1-a124-d6f31951e21a",
  type: "page-type/host",
  slug: "node-05",
  definition: "the machine named node-05 in the main cluster",
  title: "node-05",
  address: "192.168.68.78",
  loginUser: "walton",
  createdAt: "2026-09-03T04:39:50.863Z",
  updatedAt: "2026-09-15T17:10:29.000Z",
} as const satisfies Host
