import type { Module } from "@akasha/code/module"

export const ssh = {
  id: "01a06813-7b0f-75fc-a396-3b035d2ca601",
  pageTypeSlug: "module",
  type: "module",
  slug: "ssh",
  definition: "a spawned `ssh` piping a bash script to a host's standard input",
  code: "ts",
} as const satisfies Module
