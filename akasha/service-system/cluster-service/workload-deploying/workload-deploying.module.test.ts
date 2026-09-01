import { afterAll, expect, test } from "bun:test"
import type { Workload } from "../web-app-reading/web-app-reading.module.code.ts"
import { SYNTH_AT, seededWorld } from "../web-app-reading/web-app-reading.module.test-fixtures.ts"
import {
  applyOf,
  carries,
  generatedPathFor,
  inApplyOrder,
  type Manifest,
  namedIn,
  opensTheNamespace,
  planFor,
  rolloutOf,
  unfilledIn,
} from "./workload-deploying.module.code.ts"

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

test("metadata standing inside a pod template names nothing", () => {
  expect(namedIn(YAML)?.name).not.toBe("not-this-one")
})

test("a body naming no kind names no resource", () => {
  expect(namedIn("apiVersion: v1\nmetadata:\n  name: web\n")).toBe(null)
})

test("a manifest is written beside the code that emitted it", () => {
  expect(generatedPathFor("one/web/x.cluster-service.code.attachment.ts", "web-service")).toBe(
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

test("the namespace stands first and the workload last", () => {
  const opening = manifest({ kind: "Namespace", resourceName: "one", namespace: null })
  const between = manifest({ kind: "Service", resourceName: "web" })
  const ordered = inApplyOrder([manifest({}), between, opening], WEB)
  expect(ordered[0]).toBe(opening)
  expect(ordered[2]?.kind).toBe("Deployment")
})

test("a checksum nothing filled in is a stand-in", () => {
  const held = manifest({ yaml: "      checksum/s3-creds: PENDING\n" })
  expect(unfilledIn(held)[0]).toContain("checksum/s3-creds")
})

test("a checksum that is a digest is no stand-in", () => {
  const digest = "a".repeat(64)
  expect(unfilledIn(manifest({ yaml: `      checksum/s3-creds: ${digest}\n` }))).toEqual([])
})

test("an image nothing filled in is a stand-in", () => {
  expect(unfilledIn(manifest({ yaml: "      image: MUST_BE_SET\n" }))[0]).toContain("image")
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

test("a workload carrying a pod template is waited on", () => {
  const plan = { workload: WEB, synthPath: SYNTH_AT, manifests: [] }
  expect(rolloutOf(plan)?.[2]).toBe("deployment/web")
})

test("a workload carrying no pod template is waited on by nothing", () => {
  const plan = {
    workload: { kind: "ConfigMap", name: "web", namespace: "one" },
    synthPath: SYNTH_AT,
    manifests: [],
  }
  expect(rolloutOf(plan)).toBe(null)
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
