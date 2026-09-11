import {
  type SecretEnv,
  secretEnv,
} from "akasha/infrastructure/cluster/k8s-types/k8s-secret-env/k8s-secret-env.module.code.ts"
import { S3_GATEWAY_ENDPOINT } from "../constants/seaweedfs-constants.module.code.ts"

const SRC_SECRET = "seaweedfs-creds"

export type RcloneEnv = ({ name: string; value: string } | SecretEnv)[]

export function rcloneEnv(): RcloneEnv {
  return [
    { name: "HOME", value: "/tmp" },
    { name: "RCLONE_CONFIG_SRC_TYPE", value: "s3" },
    { name: "RCLONE_CONFIG_SRC_PROVIDER", value: "Other" },
    { name: "RCLONE_CONFIG_SRC_ENDPOINT", value: S3_GATEWAY_ENDPOINT },
    secretEnv("RCLONE_CONFIG_SRC_ACCESS_KEY_ID", SRC_SECRET, "access_key"),
    secretEnv("RCLONE_CONFIG_SRC_SECRET_ACCESS_KEY", SRC_SECRET, "secret_key"),
  ]
}
