import type { Module } from "@akasha/code-system/module"

export const talosSsh = {
  id: "01a06813-7b0f-75fc-a396-3b035d2ca601",
  pageTypeSlug: "module",
  slug: "talos-ssh",
  definition: "a spawned `ssh` piping a bash script to a host's standard input",
  code: "ts",
} as const satisfies Module
