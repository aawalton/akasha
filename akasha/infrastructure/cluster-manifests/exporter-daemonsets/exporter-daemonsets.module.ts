import type { Module } from "@akasha/code-system/module"

export const exporterDaemonsets = {
  id: "01a06810-1263-787b-9195-38665bcd1e92",
  pageTypeSlug: "module",
  slug: "exporter-daemonsets",
  definition: "the node and graphics card exporters that run one copy per node",
  code: "ts",
} as const satisfies Module
