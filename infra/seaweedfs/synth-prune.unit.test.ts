import { describe, expect, test } from "bun:test"
import { pruneSessionsCronJobYaml, RETENTION_DAYS } from "./synth-prune.ts"

describe("pruneSessionsCronJobYaml", () => {
  const yaml = pruneSessionsCronJobYaml()

  test("declares a CronJob named seaweedfs-prune-sessions in a namespace of its own", () => {
    expect(yaml).toContain("kind: CronJob")
    expect(yaml).toContain("name: seaweedfs-prune-sessions")
    expect(yaml).toContain("namespace: seaweedfs-prune-sessions")
  })

  test("runs on a daily schedule with no overlap", () => {
    expect(yaml).toContain("schedule:")
    expect(yaml).toContain("concurrencyPolicy: Forbid")
  })

  test("deletes via rclone, scoped to the sessions/ prefix only", () => {
    expect(yaml).toContain("rclone delete")
    expect(yaml).toContain("src:agent-sessions/sessions")
    expect(yaml).not.toContain("src:agent-sessions ")
    expect(yaml).not.toContain('src:agent-sessions"')
  })

  test("keys expiry on server modtime and the retention window", () => {
    expect(RETENTION_DAYS).toBe(30)
    expect(yaml).toContain(`--min-age ${RETENTION_DAYS}d`)
    expect(yaml).toContain("--use-server-modtime")
  })

  test("reuses seaweedfs-creds via rclone env, against the s3-gateway", () => {
    expect(yaml).toContain("seaweedfs-creds")
    expect(yaml).toContain("RCLONE_CONFIG_SRC_ACCESS_KEY_ID")
    expect(yaml).toContain("s3-gateway.seaweedfs.svc.cluster.local:8333")
  })

  test("runs hardened non-root with a read-only rootfs", () => {
    expect(yaml).toContain("runAsNonRoot: true")
    expect(yaml).toContain("readOnlyRootFilesystem: true")
    expect(yaml).toContain("runAsUser: 1000")
  })
})
