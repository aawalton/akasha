import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const seaweedfsDeployments = {
  id: "01a06816-68b0-7032-92cb-02e742a97bc7",
  type: "module",
  slug: "seaweedfs-deployments",
  definition: "the deployment manifests for the master, the volume, the filer and the S3 gateway",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The S3 gateway's pod template carries the hash of the seaweedfs-creds secret.",
    },
    {
      invariantKind: "departure",
      statement: "The key hashed from the seaweedfs-creds secret is s3-config.json.",
    },
    {
      invariantKind: "departure",
      statement: "The S3 gateway mounts only s3-config.json from that secret.",
    },
  ],
} as const satisfies Module
