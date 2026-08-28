import { describe, expect, test } from "bun:test"
import { EXPIRING_PREFIXES, NON_EXPIRING_PREFIXES } from "./synth-constants.ts"
import { assetCopyScript, backupAssetsCronJobYaml } from "./synth-longtail-assets.ts"

describe("the expiring / non-expiring split", () => {
  const expiring: readonly string[] = EXPIRING_PREFIXES
  const nonExpiring: readonly string[] = NON_EXPIRING_PREFIXES

  test("is disjoint", () => {
    expect(nonExpiring.filter((prefix) => expiring.includes(prefix))).toEqual([])
  })

  test("puts sessions on the expiring side and never the other", () => {
    expect(expiring).toContain("sessions")
    expect(nonExpiring).not.toContain("sessions")
  })

  test("keeps the irreplaceable voice references on the non-expiring side", () => {
    expect(nonExpiring).toContain("persona-voices")
  })
})

describe("assetCopyScript", () => {
  const script = assetCopyScript()

  test("copies, and neither syncs nor deletes", () => {
    expect(script).toContain("rclone copy ")
    expect(script).not.toContain("rclone sync")
    expect(script).not.toContain("rclone delete")
    expect(script).not.toContain("--delete")
  })

  test("never takes the retention-carrying prefix as a source", () => {
    expect(script).not.toContain("src:agent-sessions/sessions")
    expect(script).not.toContain("src:agent-sessions ")
    expect(script).not.toContain('src:agent-sessions"')
  })

  test("copies the voice references the tier exists for", () => {
    expect(script).toContain("src:agent-sessions/$p")
    expect(script).toContain("persona-voices")
  })

  test("reads the live bucket rather than the node-06 mirror", () => {
    expect(script).not.toContain("/backup/agent-sessions")
  })

  test("lands outside every subtree the barman placer prunes", () => {
    expect(script).toContain('"/backup/_longtail/agent-sessions/$p"')
    expect(script).not.toContain("/_longtail/monthly")
    expect(script).not.toContain("/_longtail/annual")
  })

  test("keeps each prefix an independent unit and names the failures", () => {
    expect(script).toContain("set -u")
    expect(script).not.toContain("set -e")
    expect(script).toContain("prefixes failed:")
  })

  test("reports the tier's own size against its own declared budget", () => {
    expect(script).toContain("asset-longtail: $used/53687091200 bytes, review at 42949672960")
    expect(script).toContain('if [ "$used" -gt 42949672960 ]; then')
    expect(script).toContain("over 80% of the declared budget")
    expect(script).toContain('du -sk "/backup/_longtail/agent-sessions"')
    expect(script).not.toContain('du -sk "/backup"')
    expect(script).toContain("${used_kib:-0}")
  })

  test("treats a budget breach as a review, never as a delete", () => {
    const breach = script.slice(script.indexOf("-gt"))
    expect(breach).toContain("exit 1")
    expect(breach).not.toContain("rm ")
    expect(breach).not.toContain("rclone")
  })
})

describe("backupAssetsCronJobYaml", () => {
  const yaml = backupAssetsCronJobYaml()

  test("carries the name the existing backup alerts select on", () => {
    expect(yaml).toContain("name: seaweedfs-backup-assets")
  })

  test("declares a CronJob in a namespace of its own that does not overlap itself", () => {
    expect(yaml).toContain("kind: CronJob")
    expect(yaml).toContain("namespace: seaweedfs-backup-assets")
    expect(yaml).toContain("schedule:")
    expect(yaml).toContain("concurrencyPolicy: Forbid")
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

  test("mounts the node-06 backup PVC the tier lives on", () => {
    expect(yaml).toContain("claimName: seaweedfs-backup-assets")
  })
})
