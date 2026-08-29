import type { Command } from "../command.page-type.ts"

export const write = {
  id: "01a04a63-dbf3-7000-9ac4-2cb2dc42ca8e",
  pageTypeSlug: "command",
  slug: "write",
  definition: "whole file bodies carried in, gated together and landed or refused as one",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: ["page-type/command", "module/landing", "module/reading", "module/corpus"],
  design: [
    "A write carries whole bodies, never a patch.",
    "A body arrives as a file, never as an argument.",
  ],
} as const satisfies Command
