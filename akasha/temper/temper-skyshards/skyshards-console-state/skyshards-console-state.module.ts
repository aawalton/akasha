import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skyshardsConsoleState = {
  id: "01a061a8-9c62-73ea-8b10-41c97e9a32b4",
  pageTypeSlug: "module",
  slug: "skyshards-console-state",
  definition:
    "what the console half keeps for the session: the player's choices and its shard counts",
  code: "ts",
} as const satisfies Module
