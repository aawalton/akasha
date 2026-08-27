import { describe, expect, test } from "bun:test"
import { requireMatchPositional } from "../../../../shared/utils-narrow/src/require-match-positional"
import { parse } from "yaml"
import { z } from "zod"
import { ALERT_RULES } from "./synth-alerts"

const ruleSchema = z.object({
  alert: z.string().optional(),
  expr: z.string().optional(),
  for: z.string().optional(),
  keep_firing_for: z.string().optional(),
  labels: z.record(z.string(), z.string()).optional(),
  annotations: z.record(z.string(), z.string()).optional(),
})
const alertsSchema = z.object({
  groups: z.array(z.object({ rules: z.array(ruleSchema) })),
})

type Rule = z.infer<typeof ruleSchema>

function alertRules(): readonly Rule[] {
  return alertsSchema.parse(parse(ALERT_RULES)).groups.flatMap((g) => g.rules)
}

function rule(name: string): Rule | undefined {
  return alertRules().find((r) => r.alert === name)
}

const PERIOD_FACTOR_RE = /([\d.]+) \* \(kube_cronjob_next_schedule_time/
const PERIOD_FACTOR = z.tuple([z.coerce.number().positive()])

describe("synth-alerts existing regressions (#14241)", () => {
  test("TargetDown fires on up==0, excludes sleep-prone personal hosts, waits 10m", () => {
    const td = rule("TargetDown")
    expect(td).toBeDefined()
    expect(td?.expr).toContain("up")
    expect(td?.expr).toContain("== 0")
    expect(td?.expr).toContain('tier!="personal"')
    expect(td?.for).toBe("10m")
    expect(td?.labels?.["severity"]).toBe("warning")
  })

  test("PodCrashLooping holds one continuous firing state via keep_firing_for 15m", () => {
    const pcl = rule("PodCrashLooping")
    expect(pcl).toBeDefined()
    expect(pcl?.keep_firing_for).toBe("15m")
  })
})

describe("synth-alerts workload-coverage rules (#14276)", () => {
  test("PodPending selects only Pending pods and waits 15m", () => {
    const r = rule("PodPending")
    expect(r).toBeDefined()
    expect(r?.expr).toContain('kube_pod_status_phase{phase="Pending"}')
    expect(r?.expr).toContain("== 1")
    expect(r?.for).toBe("15m")
    expect(r?.labels?.["severity"]).toBe("warning")
  })

  test("JobFailed collapses per-run job_name to a stable (namespace, owner_name) identity", () => {
    const r = rule("JobFailed")
    expect(r).toBeDefined()
    expect(r?.expr).toContain("kube_job_status_failed > 0")
    expect(r?.expr).toContain("group_left(owner_name)")
    expect(r?.expr).toContain("kube_job_owner")
    expect(r?.expr).toContain("max by (namespace, owner_name)")
    expect(r?.labels?.["severity"]).toBe("warning")
  })

  test("JobFailed bounds a failure by its own Job's start time", () => {
    const r = rule("JobFailed")
    expect(r?.expr).toContain("time() - kube_job_status_start_time")
    expect(r?.expr).toContain("and on (namespace, job_name)")
  })

  test("CronJobStale tolerance is 2x the CronJob's own derived period", () => {
    const r = rule("CronJobStale")
    expect(r).toBeDefined()
    expect(r?.expr).toContain("kube_cronjob_status_last_successful_time")
    expect(r?.expr).toContain("kube_cronjob_next_schedule_time")
    expect(r?.expr).toContain("kube_cronjob_status_last_schedule_time")
    expect(r?.labels?.["severity"]).toBe("warning")
  })

  test("BackupStale derives each backup's tolerance from its own period", () => {
    const r = rule("BackupStale")
    expect(r).toBeDefined()
    expect(r?.expr).not.toContain("86400")
    expect(r?.expr).toContain("kube_cronjob_next_schedule_time")
    expect(r?.expr).toContain("kube_cronjob_status_last_schedule_time")
  })

  test("BackupStale reads a backup sooner than CronJobStale reads any CronJob", () => {
    const factor = (name: string): number => {
      const [scale] = requireMatchPositional(
        PERIOD_FACTOR_RE,
        PERIOD_FACTOR,
        rule(name)?.expr ?? "",
        `${name}, which must scale a derived CronJob period`
      )
      return scale
    }
    const backup = factor("BackupStale")
    const generic = factor("CronJobStale")
    expect(backup).toBeGreaterThan(1)
    expect(backup).toBeLessThan(generic)
  })

  test("StatefulSetReplicasMismatch fires on ready != desired", () => {
    const r = rule("StatefulSetReplicasMismatch")
    expect(r).toBeDefined()
    expect(r?.expr).toContain("kube_statefulset_status_replicas_ready")
    expect(r?.expr).toContain("kube_statefulset_replicas")
    expect(r?.expr).toContain("!=")
    expect(r?.for).toBe("5m")
  })

  test("ContainerOOMKilled joins OOMKilled reason with a recent restart increase", () => {
    const r = rule("ContainerOOMKilled")
    expect(r).toBeDefined()
    expect(r?.expr).toContain('reason="OOMKilled"')
    expect(r?.expr).toContain("increase(kube_pod_container_status_restarts_total[1h])")
    expect(r?.expr).toContain("and on (namespace, pod, container)")
    expect(r?.keep_firing_for).toBe("15m")
  })

  test("ContainerMemoryNearLimit leads the OOM with a floored, coarse-labelled peak ratio", () => {
    const r = rule("ContainerMemoryNearLimit")
    expect(r).toBeDefined()
    expect(r?.expr).toContain("max_over_time(container_memory_working_set_bytes")
    expect(r?.expr).toContain("536870912")
    expect(r?.expr).toContain("> 0.9")
    expect(r?.expr).toContain("max by (namespace, container)")
    expect(r?.labels?.["severity"]).toBe("warning")
  })

  test("NodeNotReady watches kube_node_status_condition directly, keeps tier exclusion", () => {
    const r = rule("NodeNotReady")
    expect(r).toBeDefined()
    expect(r?.expr).toContain('kube_node_status_condition{condition="Ready"')
    expect(r?.expr).toContain('status="true"')
    expect(r?.expr).toContain("== 0")
    expect(r?.expr).toContain('tier!="personal"')
    expect(r?.for).toBe("10m")
  })

  test("PostgresReplicationLag scopes to CNPG physical replicas and measures seconds", () => {
    const r = rule("PostgresReplicationLag")
    expect(r).toBeDefined()
    expect(r?.expr).toContain("pg_stat_replication_reply_time")
    expect(r?.expr).toContain('application_name=~"postgres-cnpg-.*"')
    expect(r?.expr).toContain("> 300")
    expect(r?.labels?.["severity"]).toBe("warning")
  })
})

describe("synth-alerts cert-manager + seaweedfs liveness rules (#14277)", () => {
  test("both cert renewal tiers read the per-certificate renewal gauge", () => {
    for (const name of ["CertManagerCertRenewalOverdue", "CertManagerCertRenewalOverdueCritical"]) {
      const r = rule(name)
      expect(r).toBeDefined()
      expect(r?.expr).toContain("certmanager_certificate_renewal_timestamp_seconds")
    }
  })

  test("the retired fixed-day cert expiry tiers are gone", () => {
    expect(rule("CertManagerCertExpiringSoon")).toBeUndefined()
    expect(rule("CertManagerCertExpiringCritical")).toBeUndefined()
  })

  test("CertManagerCertNotReady fires on the explicit False ready condition", () => {
    const r = rule("CertManagerCertNotReady")
    expect(r).toBeDefined()
    expect(r?.expr).toContain('certmanager_certificate_ready_status{condition="False"}')
    expect(r?.expr).toContain("== 1")
    expect(r?.labels?.["severity"]).toBe("warning")
  })

  test("CertManagerCertExpiryMetricAbsent guards the cert-expiry gauge scrape", () => {
    const r = rule("CertManagerCertExpiryMetricAbsent")
    expect(r).toBeDefined()
    expect(r?.expr).toContain("absent(certmanager_certificate_expiration_timestamp_seconds)")
    expect(r?.labels?.["severity"]).toBe("warning")
  })

  test("SeaweedfsVolumeServerDown selects the volume component on up==0", () => {
    const r = rule("SeaweedfsVolumeServerDown")
    expect(r).toBeDefined()
    expect(r?.expr).toContain('up{job="seaweedfs",component="volume"}')
    expect(r?.expr).toContain("== 0")
    expect(r?.labels?.["severity"]).toBe("critical")
  })

  test("SeaweedfsVolumeHeartbeatStalled fires when the master stops receiving heartbeats", () => {
    const r = rule("SeaweedfsVolumeHeartbeatStalled")
    expect(r).toBeDefined()
    expect(r?.expr).toContain('rate(SeaweedFS_master_received_heartbeats{type="total"}[10m])')
    expect(r?.expr).toContain("== 0")
    expect(r?.labels?.["severity"]).toBe("critical")
  })

  test("SeaweedfsLivenessMetricAbsent guards the master metrics scrape", () => {
    const r = rule("SeaweedfsLivenessMetricAbsent")
    expect(r).toBeDefined()
    expect(r?.expr).toContain("absent(SeaweedFS_master_is_leader)")
    expect(r?.labels?.["severity"]).toBe("warning")
  })
})

describe("synth-alerts postgres storage-growth anomaly (#14410)", () => {
  test("PostgresStorageGrowthAnomaly keeps the ratio test AND an absolute growth floor", () => {
    const r = rule("PostgresStorageGrowthAnomaly")
    expect(r).toBeDefined()
    expect(r?.expr).toContain("deriv(pg_database_size_bytes[7d]) > 0")
    expect(r?.expr).toContain("2 * deriv(pg_database_size_bytes[7d])")
    expect(r?.expr).toContain("deriv(pg_database_size_bytes[1d]) > 10 * 1000")
    expect(r?.for).toBe("30m")
    expect(r?.labels?.["severity"]).toBe("warning")
  })
})
