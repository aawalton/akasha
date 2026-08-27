import { readFileSync, statfsSync } from "node:fs"
import { z } from "zod"

export const INODE_WARN_PERCENT = 50

export const INODE_CRITICAL_PERCENT = 80

const MAX_PLAUSIBLE_INODE_CAP = 2n ** 32n

export type InodeThresholds = {
  warnPercent: number
  criticalPercent: number
}

export const DEFAULT_INODE_THRESHOLDS: InodeThresholds = {
  warnPercent: INODE_WARN_PERCENT,
  criticalPercent: INODE_CRITICAL_PERCENT,
}

export type InodeReading = {
  mountPoint: string
  filesystemType: string
  totalInodes: bigint
  freeInodes: bigint
}

export type InodeBand = "ok" | "warn" | "critical"

export type MountInodeState =
  | {
      kind: "measured"
      mountPoint: string
      filesystemType: string
      band: InodeBand
      usedPercent: number
      usedInodes: number
      totalInodes: number
    }
  | {
      kind: "unmeasurable"
      mountPoint: string
      filesystemType: string
      reason: string
    }

export type InodePressureVerdict = "ok" | "pressure" | "indeterminate"

export type InodePressureAssessment = {
  verdict: InodePressureVerdict
  reason: string
  mounts: readonly MountInodeState[]
}

function unmeasurable(r: InodeReading, reason: string): MountInodeState {
  return {
    kind: "unmeasurable",
    mountPoint: r.mountPoint,
    filesystemType: r.filesystemType,
    reason,
  }
}

export function classifyMountInodes(
  reading: InodeReading,
  thresholds: InodeThresholds
): MountInodeState {
  const { totalInodes, freeInodes } = reading
  if (totalInodes === 0n) {
    return unmeasurable(
      reading,
      "filesystem reports no inode ceiling (allocates inodes dynamically)"
    )
  }
  if (totalInodes < 0n) {
    return unmeasurable(reading, "filesystem reports a sentinel inode ceiling, not a capacity")
  }
  if (freeInodes < 0n) {
    return unmeasurable(reading, "filesystem reports a negative free-inode count")
  }
  if (freeInodes > totalInodes) {
    return unmeasurable(reading, "filesystem reports more free inodes than it has total")
  }
  if (totalInodes > MAX_PLAUSIBLE_INODE_CAP) {
    return unmeasurable(
      reading,
      "filesystem reports an inode ceiling beyond any plausible capacity"
    )
  }
  const usedInodes = totalInodes - freeInodes
  const usedPercent = Number((usedInodes * 10_000n) / totalInodes) / 100
  const band: InodeBand =
    usedPercent >= thresholds.criticalPercent
      ? "critical"
      : usedPercent >= thresholds.warnPercent
        ? "warn"
        : "ok"
  return {
    kind: "measured",
    mountPoint: reading.mountPoint,
    filesystemType: reading.filesystemType,
    band,
    usedPercent,
    usedInodes: Number(usedInodes),
    totalInodes: Number(totalInodes),
  }
}

export function assessInodePressure(
  readings: readonly InodeReading[],
  thresholds: InodeThresholds
): InodePressureAssessment {
  const mounts = readings.map((r) => classifyMountInodes(r, thresholds))
  const measured = mounts.filter((m) => m.kind === "measured")
  const pressured = measured.filter((m) => m.kind === "measured" && m.band !== "ok")
  const excluded = mounts.length - measured.length
  const skipped = excluded === 0 ? "" : `; ${excluded} without an inode ceiling not gauged`
  if (measured.length === 0) {
    return {
      verdict: "indeterminate",
      reason: `no mount reports an inode ceiling — inode utilization is undefined on all ${mounts.length} mounts read`,
      mounts,
    }
  }
  if (pressured.length > 0) {
    const worst = pressured
      .map((m) => (m.kind === "measured" ? m : null))
      .filter((m) => m !== null)
      .reduce((a, b) => (b.usedPercent > a.usedPercent ? b : a))
    return {
      verdict: "pressure",
      reason: `${worst.mountPoint} at ${worst.usedPercent}% of its inode ceiling (${worst.band}); ${measured.length} mounts gauged${skipped}`,
      mounts,
    }
  }
  return {
    verdict: "ok",
    reason: `all ${measured.length} gauged mounts below ${thresholds.warnPercent}% of their inode ceiling${skipped}`,
    mounts,
  }
}

export const MIN_FREE_INODES = 200_000

export const INODE_ADMISSION_OUTCOMES = [
  "headroom",
  "no-candidate-mounts",
  "below-floor",
  "nothing-gauged",
] as const

export type InodeAdmissionOutcome = (typeof INODE_ADMISSION_OUTCOMES)[number]

export type InodeAdmissionDecision = {
  allow: boolean
  outcome: InodeAdmissionOutcome
  reason: string
}

export type InodeAdmissionInput = {
  assessment: InodePressureAssessment
  minFreeInodes: number
  kindLabel: string
}

function admit(outcome: InodeAdmissionOutcome, reason: string): InodeAdmissionDecision {
  return { allow: true, outcome, reason }
}

function refuse(outcome: InodeAdmissionOutcome, reason: string): InodeAdmissionDecision {
  return { allow: false, outcome, reason }
}

function freeInodesOf(m: MountInodeState & { kind: "measured" }): number {
  return m.totalInodes - m.usedInodes
}

export function assessInodeAdmission(input: InodeAdmissionInput): InodeAdmissionDecision {
  const { assessment, minFreeInodes, kindLabel } = input
  const mounts = assessment.mounts
  if (mounts.length === 0) {
    return refuse(
      "nothing-gauged",
      `refusing to spawn ${kindLabel}: no mount could be read, so inode headroom was never observed — an unreadable reading is not headroom`
    )
  }
  const candidates = mounts
    .map((m) => (m.kind === "measured" && m.totalInodes > MIN_FREE_INODES ? m : null))
    .filter((m) => m !== null)
  if (candidates.length === 0) {
    return admit(
      "no-candidate-mounts",
      `${kindLabel}: none of the ${mounts.length} mounts read carries an inode ceiling above the ${MIN_FREE_INODES} one spawn's scratch needs, so no mount here can run out of inodes under a spawn`
    )
  }
  const tightest = candidates.reduce((a, b) => (freeInodesOf(b) < freeInodesOf(a) ? b : a))
  const free = freeInodesOf(tightest)
  if (free <= minFreeInodes) {
    return refuse(
      "below-floor",
      `refusing to spawn ${kindLabel}: ${tightest.mountPoint} has ${free} free inodes of ${tightest.totalInodes} (${tightest.usedPercent}% used), at or under the ${minFreeInodes} floor — the exhausted resource is INODES, not bytes, so df will report the mount healthy; clear scratch trees off ${tightest.mountPoint} before spawning`
    )
  }
  return admit(
    "headroom",
    `${kindLabel}: ${tightest.mountPoint} has the least inode headroom at ${free} free (>${minFreeInodes} floor); ${candidates.length} of ${mounts.length} mounts gauged against it`
  )
}

const MOUNT_LINE_SCHEMA = z.tuple([z.string(), z.string(), z.string()]).rest(z.string())

function unescapeMountField(raw: string): string {
  return raw.replace(/\\([0-7]{3})/g, (_m, oct: string) =>
    String.fromCharCode(Number.parseInt(oct, 8))
  )
}

export function readMountInodes(): readonly InodeReading[] {
  const body = readFileSync("/proc/mounts", "utf8")
  const byMountPoint = new Map<string, InodeReading>()
  for (const line of body.split("\n")) {
    if (line.trim() === "") continue
    const parsed = MOUNT_LINE_SCHEMA.safeParse(line.split(" "))
    if (!parsed.success) continue
    const [, rawMountPoint, filesystemType] = parsed.data
    const mountPoint = unescapeMountField(rawMountPoint)
    try {
      const s = statfsSync(mountPoint, { bigint: true })
      byMountPoint.set(mountPoint, {
        mountPoint,
        filesystemType,
        totalInodes: s.files,
        freeInodes: s.ffree,
      })
    } catch {}
  }
  return [...byMountPoint.values()]
}

export type HostInodePressure = {
  assessment: InodePressureAssessment
  thresholds: InodeThresholds
  admission: InodeAdmissionDecision
}

export function readHostInodePressure(
  kindLabel = "a spawn",
  thresholds: InodeThresholds = DEFAULT_INODE_THRESHOLDS
): HostInodePressure {
  const assessment = assessInodePressure(readMountInodes(), thresholds)
  return {
    assessment,
    thresholds,
    admission: assessInodeAdmission({
      assessment,
      minFreeInodes: resolveMinFreeInodes(),
      kindLabel,
    }),
  }
}

const INODE_FLOOR_OVERRIDE_SCHEMA = z.coerce.number().int().positive().finite()

function resolveMinFreeInodes(): number {
  const parsed = INODE_FLOOR_OVERRIDE_SCHEMA.safeParse(process.env.SPAWN_MIN_FREE_INODES)
  return parsed.success ? parsed.data : MIN_FREE_INODES
}

export function enforceInodeAdmission(kindLabel: string): undefined {
  const { admission } = readHostInodePressure(kindLabel)
  if (!admission.allow) {
    throw new Error(admission.reason)
  }
}
