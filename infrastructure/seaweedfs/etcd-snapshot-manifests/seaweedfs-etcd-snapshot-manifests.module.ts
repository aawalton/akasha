import type { Module } from "@akasha/code/module"

export const seaweedfsEtcdSnapshotManifests = {
  id: "01a06816-68b0-7b64-b49b-a196ec6ae281",
  pageTypeSlug: "module",
  type: "module",
  slug: "seaweedfs-etcd-snapshot-manifests",
  definition: "the manifests writing a copy of the cluster's key store into a bucket",
  code: "ts",
  allowsTmpPaths: true,
} as const satisfies Module
