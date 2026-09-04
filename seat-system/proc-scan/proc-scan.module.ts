import type { Module } from "@akasha/code-system/module"

export const procScan = {
  id: "01a0695a-d2ea-7a46-91a8-5f8779a67282",
  pageTypeSlug: "module",
  slug: "proc-scan",
  definition:
    "every process under /proc carrying an AGENT_ID, with its command line, parent and state",
  code: "ts",
} as const satisfies Module
