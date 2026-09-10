import type { Host } from "../host.page-type.types.ts"

export const node02 = {
  id: "01a06590-e94f-7708-ad8e-12241756fe19",
  pageTypeSlug: "host",
  type: "host",
  slug: "node-02",
  definition: "the machine named node-02 in the main cluster",
  title: "node-02",
  address: "192.168.68.88",
  loginUser: "walton",
} as const satisfies Host
