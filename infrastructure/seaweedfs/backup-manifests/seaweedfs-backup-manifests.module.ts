import type { Module } from "@akasha/code/module"

export const seaweedfsBackupManifests = {
  id: "01a06816-68b0-7fd4-bbb3-f018c687f369",
  pageTypeSlug: "module",
  slug: "seaweedfs-backup-manifests",
  definition: "the manifests copying the Postgres backups and the bulk data off to another disk",
  code: "ts",
  allowsTmpPaths: true,
} as const satisfies Module
