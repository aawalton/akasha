import type { Module } from "@akasha/code-system/module"

export const tunnelConfig = {
  id: "01a06865-abff-7030-8fe7-5f70cda3c706",
  pageTypeSlug: "module",
  slug: "tunnel-config",
  definition: "the cloudflared ConfigMap written from every tunnel route the checkout declares",
  code: "ts",
} as const satisfies Module
