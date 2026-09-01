import { afterAll, expect, test } from "bun:test"
import type { Workload } from "../web-app-reading/web-app-reading.module.code.ts"
import { SYNTH_AT, standingWorld } from "../web-app-reading/web-app-reading.module.test-fixtures.ts"
import type { Manifest, Plan } from "../workload-deploying/workload-deploying.module.code.ts"
import {
  alreadyBuilt,
  type BuildEnv,
  buildScript,
  buildTargetOf,
  entriesIn,
  envPrefix,
  headOf,
  hiding,
  livestOf,
  quoted,
  saidBy,
  syncScript,
} from "./web-app-building.module.code.ts"

const WORLD = standingWorld()

afterAll(() => {
  WORLD.sweep()
})

const WEB: Workload = { kind: "Deployment", name: "web", namespace: "one" }

const SHA = "0123456789abcdef0123456789abcdef01234567"

function pod(containers: readonly string[]): string {
  return [
    "apiVersion: apps/v1",
    "kind: Deployment",
    "metadata:",
    "  name: web",
    "  namespace: one",
    "spec:",
    "  template:",
    "    spec:",
    "      containers:",
    ...containers,
    "",
  ].join("\n")
}

function manifest(yaml: string): Manifest {
  return {
    name: "web-deployment",
    path: "one/web/generated/web-deployment.generated.yaml",
    yaml,
    kind: "Deployment",
    resourceName: "web",
    namespace: "one",
  }
}

function plan(yaml: string): Plan {
  return { workload: WEB, synthPath: SYNTH_AT, manifests: [manifest(yaml)] }
}

const SERVING = [
  "        - name: web",
  "          workingDir: /app/repo/one/web",
  "        - name: code-sync",
]

test("the package built is the one a container's working directory names", () => {
  expect(buildTargetOf(plan(pod(SERVING)))?.packagePath).toBe("one/web")
})

test("the build stands where the workload the page names stands", () => {
  const target = buildTargetOf(plan(pod(SERVING)))
  expect(target?.namespace).toBe("one")
  expect(target?.workload).toBe("web")
  expect(target?.kind).toBe("Deployment")
})

test("a workload no container syncs code into has no build made for it", () => {
  const alone = ["        - name: web", "          workingDir: /app/repo/one/web"]
  expect(buildTargetOf(plan(pod(alone)))).toBe(null)
})

test("a working directory outside the checkout names no package", () => {
  const elsewhere = [
    "        - name: web",
    "          workingDir: /srv/one/web",
    "        - name: code-sync",
  ]
  expect(buildTargetOf(plan(pod(elsewhere)))).toBe(null)
})

test("a plan emitting no manifest for its workload has no build made for it", () => {
  const other = { workload: WEB, synthPath: SYNTH_AT, manifests: [] }
  expect(buildTargetOf(other)).toBe(null)
})

test("a repository standing at no commit says what its HEAD is not", () => {
  expect(headOf(WORLD.root)).toBe(null)
})

test("the pod is checked out to the sha before the build runs", () => {
  expect(syncScript(SHA)).toContain(`git reset --hard ${SHA}`)
})

test("a checkout takes what origin carries rather than what stands in the pod", () => {
  expect(syncScript(SHA)).toContain("git fetch origin main")
})

test("a build leaves the sha it was made from inside the build it made", () => {
  const target = buildTargetOf(plan(pod(SERVING)))
  expect(buildScript(target as NonNullable<typeof target>, SHA, [])).toContain(
    `printf %s ${SHA} > build/.built-from`
  )
})

test("a build runs its install from the checkout rather than from the package", () => {
  const target = buildTargetOf(plan(pod(SERVING)))
  expect(buildScript(target as NonNullable<typeof target>, SHA, [])).toContain(
    "cd /app/repo && bun install --frozen-lockfile"
  )
})

const HANDED: BuildEnv = [{ name: "ONE", value: "first" }]

test("the values a build needs stand before the build it runs", () => {
  const target = buildTargetOf(plan(pod(SERVING)))
  expect(buildScript(target as NonNullable<typeof target>, SHA, HANDED)).toStartWith(
    "env ONE='first' sh -c "
  )
})

test("a value carrying a quote is handed over whole", () => {
  expect(quoted("it's")).toBe("'it'\\''s'")
})

test("a value carrying a dollar is handed over unexpanded", () => {
  expect(quoted("$HOME")).toBe("'$HOME'")
})

test("a build needing nothing set is handed nothing", () => {
  expect(envPrefix([])).toBe("")
})

test("the values a build needs are the ones the code beside the manifests exports", () => {
  const held = entriesIn({ BUILD_ENV: [{ name: "ONE", value: "first" }, { name: "TWO" }] })
  expect(held).toEqual([{ name: "ONE", value: "first" }])
})

test("code exporting no values a build needs names none", () => {
  expect(entriesIn({})).toEqual([])
})

test("a value read from a secret is not carried into what is reported", () => {
  expect(hiding("the token abc123 would not do", ["abc123"])).toBe(
    "the token [a secret this deploy read] would not do"
  )
})

test("a build made from the sha asked for is already built", () => {
  expect(alreadyBuilt({ head: SHA, builtFrom: SHA }, SHA)).toBe(true)
})

test("a build made from another sha is not already built", () => {
  expect(alreadyBuilt({ head: SHA, builtFrom: "f".repeat(40) }, SHA)).toBe(false)
})

test("a pod holding no build is not already built", () => {
  expect(alreadyBuilt(null, SHA)).toBe(false)
})

test("what a run said is read from both what it wrote and what it complained", () => {
  expect(saidBy({ argv: [], code: 1, stdout: "one\n", stderr: "two\n" })).toBe("one; two")
})

test("a pod already going away holds no build", () => {
  const said = ["web-old\t2026-09-01T04:28:16Z", "web-new\t", ""].join("\n")
  expect(livestOf(said)).toBe("web-new")
})

test("a pod nothing is taking away holds the build", () => {
  expect(livestOf("web-one\t\n")).toBe("web-one")
})

test("no pod standing means no pod holds a build", () => {
  expect(livestOf("")).toBe(null)
})
