import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const temperInventoryMaster = {
  id: "01a07c17-6b8c-778e-a1bb-83fe9f5fd164",
  type: "page-type/namespace",
  slug: "temper-inventory-master",
  definition: "the master writs a character holds",
  parts: [
    "command/temper-inventory-master-consumable-trace",
    "command/temper-inventory-master-craft-trace",
    "command/temper-inventory-master-writ-probe",
  ],
  name: "master",
  createdAt: "2026-09-07T13:38:24.780Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
