import type { Module } from "@akasha/code-system/module"

export const commandEntry = {
  id: "01a06984-c6f0-7000-9534-1a2b1f6c2b43",
  pageTypeSlug: "module",
  slug: "command-entry",
  definition: "a direct run of an ops command file, refused before it loads",
  code: "ts",
} as const satisfies Module
