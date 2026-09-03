import type { Module } from "@akasha/code-system/module"

export const seaweedfsEtcdSnapshotManifests = {
  id: "01a06816-68b0-7b64-b49b-a196ec6ae281",
  pageTypeSlug: "module",
  slug: "seaweedfs-etcd-snapshot-manifests",
  definition: "the manifests writing a copy of the cluster's key store into a bucket",
  code: "ts",
} as const satisfies Module
