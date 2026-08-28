import type { Module } from "../code-system/module/module.page-type.ts"

export const reading = {
  id: "01a04a20-6e04-7996-92dc-c404819515ea",
  pageTypeSlug: "module",
  slug: "reading",
  definition: "what an agent has read, and the body it read",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: [
    "akasha-data",
    "akasha-text",
  ],
  design: [
    "The record holds an oid and when it was seen and nothing else, because the old reader writes the same file and knows no other field.",
    "A reading the old path marked expired is not a reading here either.",
    "A body is kept in a store of its own keyed by its oid, so one body read by two seats is one entry and pruning it touches no reading.",
    "The body a read recorded is kept beside its oid, so what moved is answered here rather than asked of git.",
    "A body's identity is the oid git would give it, computed here rather than asked of git, which is outside akasha.",
  ],
} as const satisfies Module
