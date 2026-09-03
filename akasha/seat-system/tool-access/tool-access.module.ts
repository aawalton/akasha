import type { Module } from "@akasha/code-system/module"

export const toolAccess = {
  id: "01a06964-d998-7eb2-b409-f7b943e17909",
  pageTypeSlug: "module",
  slug: "tool-access",
  definition: "which tools an agent may reach, read off the tool-access settings page",
  code: "ts",
} as const satisfies Module
