import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const backupInfo = {
  id: "01a06863-74e6-7d17-b5ef-a299f78c9080",
  pageTypeSlug: "module",
  slug: "backup-info",
  definition: "what a backup's own info file states about that backup",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A file missing any field the reader needs is an error rather than a partial read.",
    },
    {
      invariantKind: "departure",
      statement: "A line carrying no equals sign is passed over.",
    },
  ],
} as const satisfies Module
