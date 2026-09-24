import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { lastDue } from "akasha/infrastructure/service/cluster/modules/cron-due/cron-due.module.code.ts"
import { CLUSTER_SERVICE_TYPE } from "akasha/infrastructure/service/cluster/modules/web-app-reading/web-app-reading.module.code.ts"
import {
  type Ran,
  runKubectl,
} from "akasha/infrastructure/service/cluster/modules/workload-deploying/workload-deploying.module.code.ts"
import type { Verdict } from "akasha/infrastructure/service/workstation/modules/service-wellness/service-wellness.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  numberAt,
  textAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const DEPLOYMENT = "Deployment"
const STATEFUL_SET = "StatefulSet"
const DAEMON_SET = "DaemonSet"
const CRON_JOB = "CronJob"
const REPLICA_SET = "ReplicaSet"
const JOB = "Job"
const POD = "Pod"
const KINDS_ASKED = "deployments,statefulsets,daemonsets,cronjobs,jobs,replicasets,pods"
export const ASKED: readonly string[] = ["get", KINDS_ASKED, "--all-namespaces", "--output", "json"]
const CRASH_LOOP = "CrashLoopBackOff"
const PROGRESSING = "Progressing"
const PAST_DEADLINE = "ProgressDeadlineExceeded"
const ROLLED_OUT = "NewReplicaSetAvailable"
const TRUE = "True"
const FAILED = "Failed"
const COMPLETE = "Complete"
const ENDED: ReadonlySet<string> = new Set(["Succeeded", "Failed"])
export const MISSED_AFTER_MS = 120_000

export type Watched = {
  readonly slug: string
  readonly pagePath: string
  readonly kind: string
  readonly namespace: string
  readonly name: string
  readonly image: string
  readonly replicas: number | null
  readonly schedule: string | null
}

export type Held = Readonly<Record<string, unknown>>

export type Seen = readonly Held[]

function recordAt(held: Held | null, key: string): Held | null {
  const one = held?.[key]
  return isRecord(one) ? one : null
}

function recordsAt(held: Held | null, key: string): readonly Held[] {
  const many = held?.[key]
  return Array.isArray(many) ? many.filter(isRecord) : []
}

function textOf(held: Held | null, key: string): string | null {
  const one = held?.[key]
  return typeof one === "string" ? one : null
}

function countOf(held: Held | null, key: string): number | null {
  const one = held?.[key]
  return typeof one === "number" ? one : null
}

function metadataOf(held: Held): Held | null {
  return recordAt(held, "metadata")
}

function nameOf(held: Held): string {
  return textOf(metadataOf(held), "name") ?? ""
}

function statusOf(held: Held): Held | null {
  return recordAt(held, "status")
}

function specOf(held: Held): Held | null {
  return recordAt(held, "spec")
}

function labelOf(one: Watched): string {
  return `${one.kind} ${one.namespace}/${one.name}`
}

export function seenIn(text: string): Seen | string {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return "the cluster answered with no JSON"
  }
  if (!isRecord(parsed) || !Array.isArray(parsed.items)) {
    return "the cluster answered with no list of resources"
  }
  return parsed.items.filter(isRecord)
}

function ofKindIn(seen: Seen, kind: string, namespace: string): readonly Held[] {
  return seen.filter(
    (held) => textOf(held, "kind") === kind && textOf(metadataOf(held), "namespace") === namespace
  )
}

function ownedBy(held: Held, kind: string, name: string): boolean {
  return recordsAt(metadataOf(held), "ownerReferences").some(
    (owner) => textOf(owner, "kind") === kind && textOf(owner, "name") === name
  )
}

function ownedIn(seen: Seen, one: Watched, kind: string, owner: string, name: string): Held[] {
  return ofKindIn(seen, kind, one.namespace).filter((held) => ownedBy(held, owner, name))
}

function between(kind: string): string | null {
  if (kind === DEPLOYMENT) return REPLICA_SET
  return kind === CRON_JOB ? JOB : null
}

function live(pod: Held): boolean {
  if (textOf(metadataOf(pod), "deletionTimestamp") !== null) return false
  return !ENDED.has(textOf(statusOf(pod), "phase") ?? "")
}

export function podsOf(seen: Seen, one: Watched): readonly Held[] {
  const through = between(one.kind)
  const pods =
    through === null
      ? ownedIn(seen, one, POD, one.kind, one.name)
      : ownedIn(seen, one, through, one.kind, one.name).flatMap((held) =>
          ownedIn(seen, one, POD, through, nameOf(held))
        )
  return pods.filter(live)
}

function loopingIn(pod: Held): string | null {
  const status = statusOf(pod)
  const containers = [
    ...recordsAt(status, "initContainerStatuses"),
    ...recordsAt(status, "containerStatuses"),
  ]
  for (const one of containers) {
    const waiting = recordAt(recordAt(one, "state"), "waiting")
    if (textOf(waiting, "reason") !== CRASH_LOOP) continue
    const restarts = countOf(one, "restartCount") ?? 0
    return `pod ${nameOf(pod)} is crash-looping in container ${textOf(one, "name") ?? ""}, restarted ${restarts} times`
  }
  return null
}

function repositoryOf(image: string): string {
  const bare = image.split("@")[0] ?? image
  const colon = bare.lastIndexOf(":")
  return colon > bare.lastIndexOf("/") ? bare.slice(0, colon) : bare
}

export function sameImage(stated: string, running: string): boolean {
  if (stated === running) return true
  if (repositoryOf(stated) !== stated) return false
  return repositoryOf(running) === stated
}

function imagesIn(podSpec: Held | null): readonly string[] {
  return recordsAt(podSpec, "containers")
    .map((one) => textOf(one, "image"))
    .filter((one): one is string => one !== null)
}

function templateOf(resource: Held, kind: string): Held | null {
  const spec = specOf(resource)
  const held = kind === CRON_JOB ? recordAt(recordAt(spec, "jobTemplate"), "spec") : spec
  return recordAt(recordAt(held, "template"), "spec")
}

function runs(images: readonly string[], stated: string): boolean {
  return images.some((one) => sameImage(stated, one))
}

function imageBrokenIn(
  one: Watched,
  resource: Held,
  pods: readonly Held[],
  rolling: boolean
): string | null {
  const made = imagesIn(templateOf(resource, one.kind))
  if (!runs(made, one.image)) {
    return `${labelOf(one)} makes its pods run ${made.join(", ") || "no image"} rather than ${one.image}, which its page states`
  }
  if (rolling) return null
  for (const pod of pods) {
    const images = imagesIn(specOf(pod))
    if (runs(images, one.image)) continue
    return `pod ${nameOf(pod)} runs ${images.join(", ")} rather than ${one.image}, which its page states`
  }
  return null
}

function conditionOf(resource: Held, type: string): Held | null {
  return (
    recordsAt(statusOf(resource), "conditions").find((one) => textOf(one, "type") === type) ?? null
  )
}

function generationBehind(resource: Held): boolean {
  const generation = countOf(metadataOf(resource), "generation")
  if (generation === null) return false
  const observed = countOf(statusOf(resource), "observedGeneration")
  return observed === null || observed < generation
}

export function rollingOut(kind: string, resource: Held): boolean {
  if (generationBehind(resource)) return true
  const status = statusOf(resource)
  if (kind === DAEMON_SET) {
    const desired = countOf(status, "desiredNumberScheduled") ?? 0
    return (countOf(status, "updatedNumberScheduled") ?? 0) < desired
  }
  if (kind !== DEPLOYMENT && kind !== STATEFUL_SET) return false
  const updated = countOf(status, "updatedReplicas") ?? 0
  if (updated < (countOf(specOf(resource), "replicas") ?? 1)) return true
  if (kind === STATEFUL_SET) {
    const update = textOf(status, "updateRevision")
    return update !== null && update !== textOf(status, "currentRevision")
  }
  if ((countOf(status, "replicas") ?? 0) > updated) return true
  const progressing = conditionOf(resource, PROGRESSING)
  if (progressing === null || textOf(progressing, "status") !== TRUE) return false
  return textOf(progressing, "reason") !== ROLLED_OUT
}

function replicasBrokenIn(one: Watched, resource: Held, rolling: boolean): string | null {
  const progressing = conditionOf(resource, PROGRESSING)
  if (progressing !== null && textOf(progressing, "reason") === PAST_DEADLINE) {
    return `${labelOf(one)} passed its progress deadline: ${textOf(progressing, "message") ?? ""}`
  }
  if (rolling) return null
  const ready = countOf(statusOf(resource), "readyReplicas") ?? 0
  const wanted = one.replicas ?? countOf(specOf(resource), "replicas") ?? 1
  if (ready >= wanted) return null
  return `${labelOf(one)} has ${ready} of the ${wanted} replicas its page states ready`
}

function scheduledBrokenIn(one: Watched, resource: Held): string | null {
  const status = statusOf(resource)
  const desired = countOf(status, "desiredNumberScheduled") ?? 0
  const ready = countOf(status, "numberReady") ?? 0
  if (ready >= desired) return null
  return `${labelOf(one)} has ${ready} of the ${desired} pods it scheduled ready`
}

function endingOf(job: Held): Held | null {
  return (
    recordsAt(statusOf(job), "conditions").find(
      (one) =>
        textOf(one, "status") === TRUE &&
        (textOf(one, "type") === FAILED || textOf(one, "type") === COMPLETE)
    ) ?? null
  )
}

function startedOf(job: Held): number {
  const at = textOf(statusOf(job), "startTime") ?? textOf(metadataOf(job), "creationTimestamp")
  const said = at === null ? Number.NaN : Date.parse(at)
  return Number.isFinite(said) ? said : 0
}

function lastRunBrokenIn(one: Watched, seen: Seen): string | null {
  const ended = ownedIn(seen, one, JOB, CRON_JOB, one.name).filter((job) => endingOf(job) !== null)
  const last = ended.sort((a, b) => startedOf(b) - startedOf(a))[0]
  if (last === undefined) return null
  const ending = endingOf(last)
  if (textOf(ending, "type") !== FAILED) return null
  const why = textOf(ending, "message") ?? textOf(ending, "reason") ?? "no reason given"
  return `${labelOf(one)} last ran as job ${nameOf(last)}, which failed: ${why}`
}

function missedIn(one: Watched, resource: Held, now: Date): string | null {
  const schedule = one.schedule ?? textOf(specOf(resource), "schedule")
  if (schedule === null) return null
  const due = lastDue(schedule, new Date(now.getTime() - MISSED_AFTER_MS))
  if (due === null) return null
  const made = Date.parse(textOf(metadataOf(resource), "creationTimestamp") ?? "")
  if (Number.isFinite(made) && made > due.getTime()) return null
  const last = textOf(statusOf(resource), "lastScheduleTime")
  const lastAt = last === null ? Number.NaN : Date.parse(last)
  if (Number.isFinite(lastAt) && lastAt >= due.getTime()) return null
  const since = last === null ? "has never run" : `last ran at ${last}`
  return `${labelOf(one)} was due to run at ${due.toISOString()}, and ${since}`
}

function kindBrokenIn(
  one: Watched,
  resource: Held,
  seen: Seen,
  now: Date,
  rolling: boolean
): string | null {
  if (one.kind === DEPLOYMENT || one.kind === STATEFUL_SET) {
    return replicasBrokenIn(one, resource, rolling)
  }
  if (one.kind === DAEMON_SET) return scheduledBrokenIn(one, resource)
  if (one.kind !== CRON_JOB) return null
  return lastRunBrokenIn(one, seen) ?? missedIn(one, resource, now)
}

export function brokenIn(one: Watched, seen: Seen, now: Date = new Date()): string | null {
  const resource = ofKindIn(seen, one.kind, one.namespace).find((held) => nameOf(held) === one.name)
  if (resource === undefined) return `${labelOf(one)} is not in the cluster`
  const pods = podsOf(seen, one)
  for (const pod of pods) {
    const looping = loopingIn(pod)
    if (looping !== null) return `${labelOf(one)} has ${looping}`
  }
  const rolling = rollingOut(one.kind, resource)
  return (
    kindBrokenIn(one, resource, seen, now, rolling) ?? imageBrokenIn(one, resource, pods, rolling)
  )
}

export function healthIn(
  watched: readonly Watched[],
  seen: Seen,
  now: Date = new Date()
): readonly Verdict[] {
  return watched.map((one) => ({
    slug: one.slug,
    pagePath: one.pagePath,
    broken: brokenIn(one, seen, now),
  }))
}

export function watchedIn(root: string): readonly Watched[] {
  const found: Watched[] = []
  for (const one of valuesOfType(root, CLUSTER_SERVICE_TYPE)) {
    const said = partedIn(one.path)
    if (said === null || said.sections.length > 0) continue
    const kind = textAt(one.value, "resourceKind")
    const namespace = textAt(one.value, "namespace")
    const name = textAt(one.value, "resourceName")
    const image = textAt(one.value, "image")
    if (kind === null || namespace === null || name === null || image === null) continue
    found.push({
      slug: said.slug,
      pagePath: one.path,
      kind,
      namespace,
      name,
      image,
      replicas: numberAt(one.value, "replicas"),
      schedule: textAt(one.value, "schedule"),
    })
  }
  return found
}

function asking(): Ran {
  return runKubectl(ASKED)
}

export function healthFor(
  root: string,
  ask: () => Ran = asking,
  now: Date = new Date()
): readonly Verdict[] | string {
  const ran = ask()
  if (ran.code !== 0) {
    return `kubectl ${ran.argv.join(" ")} exited ${ran.code}: ${ran.stderr.trim()}`
  }
  const seen = seenIn(ran.stdout)
  if (typeof seen === "string") return seen
  return healthIn(watchedIn(root), seen, now)
}
