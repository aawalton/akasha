import type { Host } from "akasha/infrastructure/machine/host/host.page-type.types.ts"

export const headscale = {
  id: "01a0c97e-2bdb-7ad8-82ec-0d9638e8983e",
  type: "page-type/host",
  slug: "headscale",
  definition: "the headscale control plane in the main cluster",
  title: "headscale.alanwalton.com",
  address: "192.168.68.240",
} as const satisfies Host
