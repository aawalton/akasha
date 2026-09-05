import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const backupRetention = {
  id: "01a06863-74df-7622-85ad-e931851aec9d",
  pageTypeSlug: "workspace-package",
  slug: "backup-retention",
  definition: "what thins the database's backups as the backups age",
  manifest: "json",
  partSlugs: [
    "module/keep-decision",
    "module/backup-info",
    "module/barman-output",
    "module/retention-env",
    "module/decide-keeps",
    "module/decide-longtail",
    "module/backup-attestation",
    "module/barman",
    "module/rclone",
    "module/promote-keeps",
    "module/copy-longtail",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One backup out of each week is kept once that week is over.",
    },
    {
      invariantKind: "departure",
      statement: "One backup out of each month is kept once that month is over.",
    },
    {
      invariantKind: "departure",
      statement: "A keep marking this package did not make is left untouched.",
    },
    {
      invariantKind: "departure",
      statement: "A keep marking this package did not make is reported.",
    },
    {
      invariantKind: "departure",
      statement:
        "The barman version installed in the image is the version the backup plugin's sidecar runs.",
    },
    {
      invariantKind: "departure",
      statement: "A copy on to slower storage is complete only once the copy's hashes are written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page.",
    },
    {
      invariantKind: "departure",
      statement: "The cluster starts both of these runs on a schedule.",
    },
  ],
} as const satisfies WorkspacePackage
