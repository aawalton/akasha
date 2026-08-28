import type { Module } from "../code-system/module/module.page-type.ts"

export const reading = {
  id: "01a04a20-6e04-7996-92dc-c404819515ea",
  pageTypeSlug: "module",
  slug: "reading",
  definition: "what an agent has read, and the body it read",
  code: "ts",
  requiredReadingSlugs: [
    "akasha-data",
    "akasha-text",
  ],
  design: [
    "A body's identity is the oid git would give it, computed here rather than asked of git, which stands outside akasha.",
  ],
} as const satisfies Module
