import type { Module } from "@akasha/code/module"

export const seaweedfsMaintenanceManifests = {
  id: "01a06816-68b1-7dc6-9dfb-e7b1ad628ddc",
  pageTypeSlug: "module",
  slug: "seaweedfs-maintenance-manifests",
  definition: "the manifests setting the bucket quotas and vacuuming the volumes",
  code: "ts",
  allowsTmpPaths: true,
} as const satisfies Module
