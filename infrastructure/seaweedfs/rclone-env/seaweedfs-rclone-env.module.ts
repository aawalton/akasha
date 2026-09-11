import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const seaweedfsRcloneEnv = {
  id: "01a08de0-e084-7ef2-ba43-857f87f1476f",
  type: "module",
  slug: "seaweedfs-rclone-env",
  definition: "the environment an rclone job reaches the object store's S3 gateway through",
  code: "ts",
  allowsTmpPaths: true,
} as const satisfies Module
