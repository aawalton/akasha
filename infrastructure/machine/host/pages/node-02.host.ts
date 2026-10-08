import type { Host } from "akasha/infrastructure/machine/host/host.page-type.types.ts"

export const node02 = {
  id: "01a06590-e94f-7708-ad8e-12241756fe19",
  type: "page-type/host",
  slug: "node-02",
  definition: "the machine named node-02 in the main cluster",
  title: "node-02",
  address: "192.168.68.88",
  loginUser: "walton",
  createdAt: "2026-09-03T04:39:50.863Z",
  updatedAt: "2026-09-15T17:10:29.000Z",
} as const satisfies Host
