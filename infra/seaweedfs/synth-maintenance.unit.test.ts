import { describe, expect, test } from "bun:test"
import { BUCKET_QUOTAS_MB, maintenanceCronJobYaml } from "./synth-maintenance.ts"

describe("maintenanceCronJobYaml", () => {
  const yaml = maintenanceCronJobYaml()

  test("declares a CronJob named seaweedfs-maintenance in a namespace of its own", () => {
    expect(yaml).toContain("kind: CronJob")
    expect(yaml).toContain("name: seaweedfs-maintenance")
    expect(yaml).toContain("namespace: seaweedfs-maintenance")
  })

  test("runs weekly with no overlap and a bounded wall", () => {
    expect(yaml).toContain("schedule: 43 6 * * 0")
    expect(yaml).toContain("concurrencyPolicy: Forbid")
    expect(yaml).toContain("activeDeadlineSeconds:")
  })

  test("runs the allowed maintenance verbs under the exclusive lock", () => {
    expect(yaml).toContain("weed shell")
    expect(yaml).toContain("master.seaweedfs.svc.cluster.local:9333")
    expect(yaml).toContain("lock")
    expect(yaml).toContain("unlock")
    expect(yaml).toContain("volume.vacuum -garbageThreshold=0.1")
    expect(yaml).toContain("s3.bucket.quota.enforce -apply")
  })

  test("never carries a data-relocating or re-encoding verb", () => {
    expect(yaml).not.toContain("volume.move")
    expect(yaml).not.toContain("volume.tier")
    expect(yaml).not.toContain("ec.encode")
    expect(yaml).not.toContain("ec.decode")
    expect(yaml).not.toContain("ec.rebuild")
    expect(yaml).not.toContain("ec.balance")
  })

  test("sets the settled per-bucket quotas idempotently", () => {
    expect(BUCKET_QUOTAS_MB).toEqual({
      "postgres-cnpg-backups": 350 * 1024,
      "atlas-basemap": 50 * 1024,
      "agent-sessions": 30 * 1024,
      "loki-chunks": 20 * 1024,
    })
    for (const [bucket, sizeMB] of Object.entries(BUCKET_QUOTAS_MB)) {
      expect(yaml).toContain(`s3.bucket.quota -name=${bucket} -op=set -sizeMB=${sizeMB}`)
    }
  })

  test("runs hardened non-root with a read-only rootfs", () => {
    expect(yaml).toContain("runAsNonRoot: true")
    expect(yaml).toContain("readOnlyRootFilesystem: true")
    expect(yaml).toContain("runAsUser: 1000")
  })
})
