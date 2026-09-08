import type { Module } from "@akasha/code/module"

export const workspacePackages = {
  id: "01a08185-f019-7828-bbfa-041ef76d6fc8",
  pageTypeSlug: "module",
  slug: "workspace-packages",
  definition: "the packages a root manifest names, each with its source root and sibling deps",
  code: "ts",
} as const satisfies Module
