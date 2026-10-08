import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryConfig = {
  id: "01a06258-b52c-7969-963f-a8a8e93af876",
  type: "page-type/module",
  slug: "inventory-config",
  definition:
    "the settings in effect, read from the config file when present and from saved variables otherwise",
  code: "ts",
  createdAt: "2026-09-02T13:39:35.852Z",
  updatedAt: "2026-09-21T17:37:10.000Z",
} as const satisfies Module
