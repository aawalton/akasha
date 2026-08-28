import type { Module } from "../code-system/module/module.page-type.ts"

export const landing = {
  id: "01a04a20-6e04-73e0-95c9-91570b3bf2dd",
  pageTypeSlug: "module",
  slug: "landing",
  definition: "the door a change reaches the tree through",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: [
    "akasha-check",
    "akasha-type",
  ],
  design: [
    "A removal reaches disk through the same door as a write, so nothing changes the tree unseen.",
    "The door is the only way to disk, so an index the door keeps cannot drift from the tree it describes.",
    "The witness is a mark on the type and never on the value, so no witness carries it once the code runs.",
    "A witness comes into being in one function, and that assertion is the only one.",
    "The door re-derives what it was handed, so the cheapest way to forge a witness is to do the read it is proof of.",
  ],
} as const satisfies Module
