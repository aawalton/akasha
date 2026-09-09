import type { Host } from "../host.page-type.ts"

export const node04 = {
  id: "01a06590-e94f-7438-8d18-bce4cb569f8d",
  pageTypeSlug: "host",
  type: "host",
  slug: "node-04",
  definition: "the machine named node-04 in the main cluster",
  title: "node-04",
  address: "192.168.68.90",
  loginUser: "walton",
} as const satisfies Host
