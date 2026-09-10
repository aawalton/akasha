import type { Namespace } from "../../../../namespaces/namespace.page-type.types.ts"

export const temperInventoryMaster = {
  id: "01a07c17-6b8c-778e-a1bb-83fe9f5fd164",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "temper-inventory-master",
  definition: "the master writs a character holds",
  parts: [
    "command/temper-inventory-master-consumable-trace",
    "command/temper-inventory-master-craft-trace",
    "command/temper-inventory-master-writ-probe",
  ],
} as const satisfies Namespace
