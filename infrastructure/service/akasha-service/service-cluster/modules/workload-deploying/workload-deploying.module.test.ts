import { afterAll, expect, test } from "bun:test"
import { CHECKOUT_PLACEHOLDER } from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache/orchestrator-cache.module.code.ts"
import type { Workload } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-reading/web-app-reading.module.code.ts"
import {
  SYNTH_AT,
  seededWorld,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-reading/web-app-reading.module.test-fixtures.ts"
import {
  applyOf,
  carries,
  documentsIn,
  generatedPathFor,
  inApplyOrder,
  type Kubectl,
  type Manifest,
  matchedOf,
  namedIn,
  opensTheNamespace,
  placedIn,
  planFor,
  planFromFile,
  putUp,
  type Ran,
  rolloutOf,
  unfilledIn,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/workload-deploying/workload-deploying.module.code.ts"

const WORLD = seededWorld()

afterAll(() => {
  WORLD.sweep()
})

const WEB: Workload = { kind: "Deployment", name: "web", namespace: "one" }

const YAML = [
  "apiVersion: apps/v1",
  "kind: Deployment",
  "metadata:",
  "  labels:",
  "    app.kubernetes.io/name: web",
  "  name: web",
  "  namespace: one",
  "spec:",
  "  template:",
  "    metadata:",
  "      name: not-this-one",
  "",
].join("\n")

function manifest(one: Partial<Manifest>): Manifest {
  return {
    name: "web-deployment",
    path: "one/web/generated/web-deployment.generated.yaml",
    yaml: "",
    kind: "Deployment",
    resourceName: "web",
    namespace: "one",
    ...one,
  }
}

test("a manifest names the resource its own top-level metadata states", () => {
  expect(namedIn(YAML)).toEqual({ kind: "Deployment", name: "web", namespace: "one" })
})

test("metadata inside a pod template names nothing", () => {
  expect(namedIn(YAML)?.name).not.toBe("not-this-one")
})

test("a body naming no kind names no resource", () => {
  expect(namedIn("apiVersion: v1\nmetadata:\n  name: web\n")).toBe(null)
})

test("a manifest is written beside the code that emitted it", () => {
  expect(generatedPathFor("one/web/x.service-cluster.code.attachment.ts", "web-service")).toBe(
    "one/web/generated/web-service.generated.yaml"
  )
})

test("a manifest carries a workload when its kind, name and namespace all match", () => {
  expect(carries(manifest({}), WEB)).toBe(true)
})

test("a manifest in another namespace carries the workload not", () => {
  expect(carries(manifest({ namespace: "other" }), WEB)).toBe(false)
})

test("a manifest opening the namespace is the one named for it", () => {
  const opening = manifest({ kind: "Namespace", resourceName: "one", namespace: null })
  expect(opensTheNamespace(opening, WEB)).toBe(true)
})

test("the namespace comes first and the workload last", () => {
  const opening = manifest({ kind: "Namespace", resourceName: "one", namespace: null })
  const between = manifest({ kind: "Service", resourceName: "web" })
  const ordered = inApplyOrder([manifest({}), between, opening], WEB)
  expect(ordered[0]).toBe(opening)
  expect(ordered[2]?.kind).toBe("Deployment")
})

test("a checksum nothing filled in is a placeholder", () => {
  const held = manifest({ yaml: "      checksum/s3-creds: PENDING\n" })
  expect(unfilledIn(held)[0]).toContain("checksum/s3-creds")
})

test("a checksum that is a digest is no placeholder", () => {
  const digest = "a".repeat(64)
  expect(unfilledIn(manifest({ yaml: `      checksum/s3-creds: ${digest}\n` }))).toEqual([])
})

test("an image nothing filled in is a placeholder", () => {
  expect(unfilledIn(manifest({ yaml: "      image: MUST_BE_SET\n" }))[0]).toContain("image")
})

test("a checkout commit nothing filled in is a placeholder", () => {
  const held = manifest({ yaml: `        git reset --hard ${CHECKOUT_PLACEHOLDER}\n` })
  expect(unfilledIn(held)[0]).toContain("checkout")
})

test("a manifest opening no namespace is applied into the workload's own", () => {
  const plan = { workload: WEB, synthPath: SYNTH_AT, manifests: [manifest({})] }
  expect(applyOf(plan, manifest({}))).toEqual([
    "apply",
    "--server-side",
    "--force-conflicts",
    "-n",
    "one",
    "-f",
    "-",
  ])
})

test("what is asked whether a manifest matches is placed where the apply places it", () => {
  const plan = { workload: WEB, synthPath: SYNTH_AT, manifests: [manifest({})] }
  expect(placedIn(plan, manifest({}))).toEqual(["-n", "one"])
  const opening = manifest({ kind: "Namespace", resourceName: "one", namespace: null })
  expect(placedIn(plan, opening)).toEqual([])
})

test("a manifest asked about in a namespace not yet opened does not stand", () => {
  const said = {
    argv: [],
    code: 2,
    stdout: "",
    stderr: 'Error from server (NotFound): namespaces "one" not found',
  }
  expect(matchedOf(said, manifest({}))).toEqual({ stands: false })
})

test("a diff that refused for any other reason refuses the deploy", () => {
  const said = { argv: [], code: 2, stdout: "", stderr: "the server could not be reached" }
  expect("why" in matchedOf(said, manifest({}))).toBe(true)
})

test("a workload carrying a pod template is waited on", () => {
  const plan = { workload: WEB, synthPath: SYNTH_AT, manifests: [] }
  expect(rolloutOf(plan)?.[2]).toBe("deployment/web")
})

test("a deployment is waited on until the cluster says its progress stopped", () => {
  const plan = { workload: WEB, synthPath: SYNTH_AT, manifests: [] }
  expect(rolloutOf(plan)?.at(-1)).toBe("0s")
})

test("a workload that states no progress deadline is waited on for five minutes", () => {
  const plan = {
    workload: { kind: "StatefulSet", name: "web", namespace: "one" },
    synthPath: SYNTH_AT,
    manifests: [],
  }
  expect(rolloutOf(plan)?.at(-1)).toBe("5m")
})

test("a workload carrying no pod template is waited on by nothing", () => {
  const plan = {
    workload: { kind: "ConfigMap", name: "web", namespace: "one" },
    synthPath: SYNTH_AT,
    manifests: [],
  }
  expect(rolloutOf(plan)).toBe(null)
})

test("a plan naming no workload is waited on by no rollout", () => {
  const plan = { workload: null, synthPath: SYNTH_AT, manifests: [] }
  expect(rolloutOf(plan)).toBe(null)
})

test("a manifest under no workload is applied where its own body places it", () => {
  const plan = { workload: null, synthPath: SYNTH_AT, manifests: [manifest({})] }
  expect(placedIn(plan, manifest({}))).toEqual([])
})

test("manifests under no workload keep the order the code emitted them in", () => {
  const opening = manifest({ kind: "Namespace", resourceName: "one", namespace: null })
  const between = manifest({ kind: "Service", resourceName: "web" })
  const held = [between, opening, manifest({})]
  expect(inApplyOrder(held, null)).toEqual(held)
})

test("a manifest carries no workload where there is none", () => {
  expect(carries(manifest({}), null)).toBe(false)
  expect(opensTheNamespace(manifest({ kind: "Namespace", resourceName: "one" }), null)).toBe(false)
})

test("code emitting no workload's resource answers a plan where no workload is named", async () => {
  const plan = await planFor(WORLD.root, null, SYNTH_AT)
  expect(typeof plan).not.toBe("string")
  if (typeof plan === "string") return
  expect(plan.workload).toBe(null)
  expect(plan.manifests.map((one) => one.kind)).toEqual(["Service", "Deployment"])
})

test("code that will not load is refused rather than thrown", async () => {
  const said = await planFor(WORLD.root, WEB, "no/such/code.attachment.ts")
  expect(typeof said).toBe("string")
})

test("code emitting the workload its page names answers a plan", async () => {
  const plan = await planFor(WORLD.root, WEB, SYNTH_AT)
  expect(typeof plan).not.toBe("string")
  if (typeof plan === "string") return
  expect(plan.manifests.map((one) => one.kind)).toEqual(["Service", "Deployment"])
  expect(plan.manifests[1]?.path).toBe("one/web/generated/web-deployment.generated.yaml")
})

test("code emitting no manifest for the workload named is refused", async () => {
  const said = await planFor(
    WORLD.root,
    { kind: "Deployment", name: "other", namespace: "one" },
    SYNTH_AT
  )
  expect(String(said)).toContain("emits no Deployment/other")
})

test("a manifests file is read as one manifest to each document, named by its kind", () => {
  const second = "apiVersion: v1\nkind: Service\nmetadata:\n  name: web\n  namespace: one\n"
  const found = documentsIn(`${YAML}---\n${second}`)
  expect(found.map((one) => one.name)).toEqual(["deployment", "service"])
  expect(found[1]?.yaml).toBe(second)
})

test("a manifests file that is not there is refused rather than thrown", () => {
  const said = planFromFile(WORLD.root, WEB, "no/such/one.manifests.yaml", (yaml) => yaml)
  expect(String(said)).toContain("holds no manifests")
})

function done(argv: readonly string[], code = 0): Ran {
  return { argv, code, stdout: "", stderr: "" }
}

function watched(seen: string[]): Kubectl {
  return {
    on: (argv, text) => {
      seen.push(text)
      return done(argv)
    },
    alone: (argv) => {
      seen.push(argv[0] as string)
      return done(argv)
    },
  }
}

const PUT_UP_PLAN = {
  workload: WEB,
  synthPath: SYNTH_AT,
  manifests: [
    manifest({ kind: "Namespace", resourceName: "one", namespace: null, yaml: "namespace" }),
    manifest({ kind: "Service", resourceName: "web", yaml: "service" }),
    manifest({ yaml: "deployment" }),
  ],
}

test("what comes between is put up after the namespace and before the rest", () => {
  const seen: string[] = []
  const ran = putUp(
    PUT_UP_PLAN,
    () => {
      seen.push("between")
      return []
    },
    watched(seen)
  )
  expect(seen).toEqual(["namespace", "between", "service", "deployment", "rollout"])
  expect(ran).toHaveLength(4)
})

test("a run between that exited non-zero stops the rest from being applied", () => {
  const seen: string[] = []
  const stopped = done(["apply", "-f", "-"], 1)
  const ran = putUp(PUT_UP_PLAN, () => [stopped], watched(seen))
  expect(seen).toEqual(["namespace"])
  expect(ran.at(-1)).toBe(stopped)
})

test("a put up handed nothing to come between applies every manifest", () => {
  const seen: string[] = []
  const ran = putUp(PUT_UP_PLAN, undefined, watched(seen))
  expect(seen).toEqual(["namespace", "service", "deployment", "rollout"])
  expect(ran).toHaveLength(4)
})

test("a plan naming no workload applies every manifest and waits on nothing", () => {
  const seen: string[] = []
  const ran = putUp({ ...PUT_UP_PLAN, workload: null }, undefined, watched(seen))
  expect(seen).toEqual(["namespace", "service", "deployment"])
  expect(ran).toHaveLength(3)
})
