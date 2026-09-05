import type { Module } from "@akasha/code-system/module"

export const exporterDaemonsets = {
  id: "01a073ae-7e8e-76d1-895f-c3358a86c953",
  pageTypeSlug: "module",
  slug: "exporter-daemonsets",
  definition: "the node and graphics card exporters that run one copy per node",
  code: "ts",
} as const satisfies Module
