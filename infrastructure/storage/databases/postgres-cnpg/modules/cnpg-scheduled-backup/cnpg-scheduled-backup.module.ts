import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const cnpgScheduledBackup = {
  id: "01a073ae-5d71-78e1-a154-bc5ad7798436",
  type: "module",
  slug: "cnpg-scheduled-backup",
  definition: "the daily backup the database operator takes",
  code: "ts",
} as const satisfies Module
