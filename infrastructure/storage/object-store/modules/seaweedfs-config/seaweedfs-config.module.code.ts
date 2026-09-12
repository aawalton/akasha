import { z } from "zod"

export type SeaweedFSConfig = {
  filerUrl?: string
  s3Endpoint: string
  bucket: string
  accessKey: string
  secretKey: string
  region?: string
}

const OPTIONAL_ENV_SCHEMA = z.string().optional()
const REQUIRED_ENV_SCHEMA = z.string()
const REGION_ENV_SCHEMA = z.string().default("us-east-1")

const REQUIRED_SEAWEEDFS_ENV_VARS = [
  "SEAWEEDFS_S3_ENDPOINT",
  "SEAWEEDFS_BUCKET",
  "SEAWEEDFS_ACCESS_KEY",
  "SEAWEEDFS_SECRET_KEY",
] as const

export function seaweedFsMissingEnvVars(): readonly string[] {
  return REQUIRED_SEAWEEDFS_ENV_VARS.filter(
    (name) => OPTIONAL_ENV_SCHEMA.parse(process.env[name]) == null
  )
}

export function seaweedFsConfigFromEnv(): SeaweedFSConfig | null {
  const missing = seaweedFsMissingEnvVars()
  if (missing.length > 0) {
    console.error(
      `[object-store] SeaweedFS config incomplete — streaming disabled (missing: ${missing.join(", ")})`
    )
    return null
  }
  const filerUrl = OPTIONAL_ENV_SCHEMA.parse(process.env.SEAWEEDFS_FILER_URL)
  const s3Endpoint = REQUIRED_ENV_SCHEMA.parse(process.env.SEAWEEDFS_S3_ENDPOINT)
  const bucket = REQUIRED_ENV_SCHEMA.parse(process.env.SEAWEEDFS_BUCKET)
  const accessKey = REQUIRED_ENV_SCHEMA.parse(process.env.SEAWEEDFS_ACCESS_KEY)
  const secretKey = REQUIRED_ENV_SCHEMA.parse(process.env.SEAWEEDFS_SECRET_KEY)
  const mode = filerUrl != null ? "filer-append" : "s3-put-fallback"
  console.error(`[object-store] SeaweedFS configured in ${mode} mode`)
  return {
    filerUrl: filerUrl != null ? filerUrl.replace(/\/+$/, "") : undefined,
    s3Endpoint: s3Endpoint.replace(/\/+$/, ""),
    bucket,
    accessKey,
    secretKey,
    region: REGION_ENV_SCHEMA.parse(process.env.SEAWEEDFS_REGION),
  }
}
