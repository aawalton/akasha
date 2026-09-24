import { expect, test } from "bun:test"
import {
  brokenIn,
  type Held,
  healthFor,
  MISSED_AFTER_MS,
  sameImage,
  seenIn,
  type Watched,
  watchedIn,
} from "akasha/infrastructure/service/cluster/modules/cluster-health/cluster-health.module.code.ts"

const NOW = new Date("2026-09-24T18:32:10.000Z")

const IMAGE = "prom/prometheus:v2.54.1"

const DEPLOYED: Watched = {
  slug: "held-web",
  pagePath: "pages/held-web.service-cluster.ts",
  kind: "Deployment",
  namespace: "held",
  name: "web",
  image: IMAGE,
  replicas: 2,
  schedule: null,
}

const TIMED: Watched = {
  ...DEPLOYED,
  slug: "held-sweep",
  kind: "CronJob",
  name: "sweep",
  replicas: null,
  schedule: "*/5 * * * *",
}

function made(kind: string, name: string, more: Record<string, unknown> = {}): Held {
  return { kind, metadata: { name, namespace: "held" }, ...more }
}

function owned(kind: string, name: string, ownerKind: string, owner: string, more = {}): Held {
  return {
    kind,
    metadata: { name, namespace: "held", ownerReferences: [{ kind: ownerKind, name: owner }] },
    ...more,
  }
}

function template(image: string): Record<string, unknown> {
  return { template: { spec: { containers: [{ name: "web", image }] } } }
}

function deployment(status: Record<string, unknown>, image = IMAGE, spec = {}): Held {
  return made("Deployment", "web", {
    spec: { replicas: 2, ...template(image), ...spec },
    status: {
      readyReplicas: 2,
      updatedReplicas: 2,
      replicas: 2,
      conditions: [{ type: "Progressing", status: "True", reason: "NewReplicaSetAvailable" }],
      ...status,
    },
  })
}

function pod(name: string, image: string, statuses: readonly unknown[] = []): Held {
  return owned("Pod", name, "ReplicaSet", "web-abc", {
    spec: { containers: [{ name: "web", image }] },
    status: { phase: "Running", containerStatuses: statuses },
  })
}

const REPLICAS = owned("ReplicaSet", "web-abc", "Deployment", "web")

const LOOPING = { name: "web", restartCount: 9, state: { waiting: { reason: "CrashLoopBackOff" } } }

function cronJob(status: Record<string, unknown>, created = "2026-09-01T00:00:00Z"): Held {
  return {
    kind: "CronJob",
    metadata: { name: "sweep", namespace: "held", creationTimestamp: created },
    spec: { schedule: "*/5 * * * *", jobTemplate: { spec: template(IMAGE) } },
    status,
  }
}

function job(name: string, startTime: string, type: string, message = ""): Held {
  return owned("Job", name, "CronJob", "sweep", {
    status: { startTime, conditions: [{ type, status: "True", reason: type, message }] },
  })
}

const RAN_LATELY = { lastScheduleTime: "2026-09-24T18:30:00Z" }

const RAN_BEFORE = { lastScheduleTime: "2026-09-24T18:25:00Z" }

test("a service whose resource the cluster does not hold is broken", () => {
  expect(brokenIn(DEPLOYED, [], NOW)).toBe("Deployment held/web is not in the cluster")
  expect(brokenIn(DEPLOYED, [made("StatefulSet", "web")], NOW)).toContain("not in the cluster")
})

test("a deployment with as many replicas ready as its page states is well", () => {
  expect(brokenIn(DEPLOYED, [deployment({})], NOW)).toBe(null)
})

test("a deployment with fewer replicas ready than its page states is broken", () => {
  expect(brokenIn(DEPLOYED, [deployment({ readyReplicas: 1 })], NOW)).toBe(
    "Deployment held/web has 1 of the 2 replicas its page states ready"
  )
})

test("a deployment still rolling out is settling rather than broken", () => {
  const rolling = { type: "Progressing", status: "True", reason: "ReplicaSetUpdated" }
  expect(brokenIn(DEPLOYED, [deployment({ readyReplicas: 1, conditions: [rolling] })], NOW)).toBe(
    null
  )
  expect(brokenIn(DEPLOYED, [deployment({ readyReplicas: 0, updatedReplicas: 1 })], NOW)).toBe(null)
})

test("a deployment whose rollout passed its progress deadline is broken", () => {
  const passed = {
    type: "Progressing",
    status: "False",
    reason: "ProgressDeadlineExceeded",
    message: 'ReplicaSet "web-abc" has timed out progressing.',
  }
  expect(brokenIn(DEPLOYED, [deployment({ conditions: [passed] })], NOW)).toContain(
    "passed its progress deadline"
  )
})

test("a deployment stating no replicas is held to the replicas its resource asks for", () => {
  const one = { ...DEPLOYED, replicas: null }
  expect(brokenIn(one, [deployment({ readyReplicas: 1 })], NOW)).toContain("1 of the 2")
})

test("a stateful set still moving to its new revision is settling rather than broken", () => {
  const set = (status: Record<string, unknown>): Held =>
    made("StatefulSet", "web", { spec: { replicas: 2, ...template(IMAGE) }, status })
  const one = { ...DEPLOYED, kind: "StatefulSet" }
  const whole = { readyReplicas: 2, updatedReplicas: 2, currentRevision: "a", updateRevision: "a" }
  expect(brokenIn(one, [set(whole)], NOW)).toBe(null)
  expect(brokenIn(one, [set({ ...whole, readyReplicas: 1 })], NOW)).toContain("1 of the 2")
  expect(brokenIn(one, [set({ ...whole, readyReplicas: 1, updateRevision: "b" })], NOW)).toBe(null)
})

test("a daemon set with fewer pods ready than it scheduled is broken", () => {
  const one = { ...DEPLOYED, kind: "DaemonSet", replicas: null }
  const set = (numberReady: number): Held =>
    made("DaemonSet", "web", {
      spec: template(IMAGE),
      status: { desiredNumberScheduled: 6, updatedNumberScheduled: 6, numberReady },
    })
  expect(brokenIn(one, [set(6)], NOW)).toBe(null)
  expect(brokenIn(one, [set(5)], NOW)).toBe(
    "DaemonSet held/web has 5 of the 6 pods it scheduled ready"
  )
})

test("a service with a pod crash-looping is broken though its replicas read ready", () => {
  const seen = [deployment({}), REPLICAS, pod("web-abc-1", IMAGE, [LOOPING])]
  expect(brokenIn(DEPLOYED, seen, NOW)).toContain(
    "pod web-abc-1 is crash-looping in container web, restarted 9 times"
  )
})

test("a crash-looping pod is broken though the rollout is still settling", () => {
  const rolling = { type: "Progressing", status: "True", reason: "ReplicaSetUpdated" }
  const seen = [deployment({ conditions: [rolling] }), REPLICAS, pod("web-abc-1", IMAGE, [LOOPING])]
  expect(brokenIn(DEPLOYED, seen, NOW)).toContain("crash-looping")
})

test("a pod that has ended is not judged", () => {
  const ended = { ...pod("web-abc-1", "other:1", [LOOPING]), status: { phase: "Failed" } }
  expect(brokenIn(DEPLOYED, [deployment({}), REPLICAS, ended], NOW)).toBe(null)
})

test("a workload made to run another image than its page states is broken", () => {
  expect(brokenIn(DEPLOYED, [deployment({}, "prom/prometheus:v2.50.0")], NOW)).toBe(
    "Deployment held/web makes its pods run prom/prometheus:v2.50.0 rather than prom/prometheus:v2.54.1, which its page states"
  )
})

test("a pod running another image than its page states is broken", () => {
  const seen = [deployment({}), REPLICAS, pod("web-abc-1", "prom/prometheus:v2.50.0")]
  expect(brokenIn(DEPLOYED, seen, NOW)).toContain("pod web-abc-1 runs prom/prometheus:v2.50.0")
})

test("an image stated with no tag is run under whatever tag or digest", () => {
  expect(sameImage("registry:5000/infra/proxy", "registry:5000/infra/proxy:0347170")).toBe(true)
  expect(sameImage("registry:5000/infra/proxy", "registry:5000/infra/proxy@sha256:ab")).toBe(true)
  expect(sameImage("registry:5000/infra/proxy", "registry:5000/infra/other:1")).toBe(false)
})

test("an image stated with a tag is run under that tag alone", () => {
  expect(sameImage(IMAGE, IMAGE)).toBe(true)
  expect(sameImage(IMAGE, "prom/prometheus:v2.50.0")).toBe(false)
  expect(sameImage(IMAGE, "prom/prometheus")).toBe(false)
})

test("a cron job whose last run failed is broken", () => {
  const seen = [
    cronJob(RAN_LATELY),
    job("sweep-1", "2026-09-24T18:20:00Z", "Complete"),
    job("sweep-2", "2026-09-24T18:25:00Z", "Failed", "Job has reached the specified backoff limit"),
  ]
  expect(brokenIn(TIMED, seen, NOW)).toBe(
    "CronJob held/sweep last ran as job sweep-2, which failed: Job has reached the specified backoff limit"
  )
})

test("a cron job whose last run succeeded after one that failed is well", () => {
  const seen = [
    cronJob(RAN_LATELY),
    job("sweep-1", "2026-09-24T18:20:00Z", "Failed"),
    job("sweep-2", "2026-09-24T18:25:00Z", "Complete"),
  ]
  expect(brokenIn(TIMED, seen, NOW)).toBe(null)
})

test("a cron job that missed a run its schedule named is broken", () => {
  expect(brokenIn(TIMED, [cronJob(RAN_BEFORE)], NOW)).toBe(
    "CronJob held/sweep was due to run at 2026-09-24T18:30:00.000Z, and last ran at 2026-09-24T18:25:00Z"
  )
})

test("a cron job that has never run though a run was due is broken", () => {
  expect(brokenIn(TIMED, [cronJob({})], NOW)).toContain("has never run")
})

test("a run due inside the grace is not yet missed", () => {
  const just = new Date(Date.parse("2026-09-24T18:30:00Z") + MISSED_AFTER_MS - 1_000)
  expect(brokenIn(TIMED, [cronJob(RAN_BEFORE)], just)).toBe(null)
})

test("a cron job made after the run last due has missed nothing", () => {
  expect(brokenIn(TIMED, [cronJob({}, "2026-09-24T18:31:00Z")], NOW)).toBe(null)
})

test("a cron job stating no schedule on its page is judged by the schedule it runs on", () => {
  const one = { ...TIMED, schedule: null }
  expect(brokenIn(one, [cronJob({ lastScheduleTime: "2026-09-24T18:20:00Z" })], NOW)).toContain(
    "was due to run"
  )
})

test("what the cluster answers is read as a list of resources", () => {
  expect(seenIn('{"items":[{"kind":"Pod"},3]}')).toEqual([{ kind: "Pod" }])
  expect(seenIn("not json")).toBe("the cluster answered with no JSON")
  expect(seenIn("{}")).toBe("the cluster answered with no list of resources")
})

test("every cluster service page is watched, with what its page states", () => {
  const watched = watchedIn(process.cwd())
  const prometheus = watched.find((one) => one.slug === "prometheus")
  expect(prometheus?.kind).toBe("Deployment")
  expect(prometheus?.image).toBe("prom/prometheus:v2.54.1")
  expect(prometheus?.pagePath).toEndWith("prometheus.service-cluster.ts")
  expect(watched.find((one) => one.slug === "buildkit-prune")?.schedule).toBe("0 4 * * 0")
})

test("a cluster that will not answer is no health rather than every service broken", () => {
  const said = healthFor(process.cwd(), () => ({
    argv: ["get"],
    code: 1,
    stdout: "",
    stderr: "no",
  }))
  expect(said).toBe("kubectl get exited 1: no")
})

test("a cluster holding none of the services reads every service as broken", () => {
  const health = healthFor(
    process.cwd(),
    () => ({ argv: ["get"], code: 0, stdout: '{"items":[]}', stderr: "" }),
    NOW
  )
  expect(typeof health).not.toBe("string")
  if (typeof health === "string") return
  expect(health.length).toBeGreaterThan(0)
  expect(health.every((one) => one.broken?.endsWith("is not in the cluster"))).toBe(true)
})
