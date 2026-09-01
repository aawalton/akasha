import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as saying } from "@akasha/utils-run/running"
import type { Workload } from "../web-app-reading/web-app-reading.module.code.ts"
import { SYNTH_AT, seededWorld } from "../web-app-reading/web-app-reading.module.test-fixtures.ts"
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
  installableAt,
  livestOf,
  saidBy,
  syncScript,
  unfoundIn,
  whyUninstallable,
} from "./web-app-building.module.code.ts"

const WORLD = seededWorld()

const HOLD = "/var/tmp"

const TREES_AT = "akasha-gate-trees-"

const GATE_AT = "akasha-install-gate-"

type Trees = {
  readonly root: string
  readonly missing: string
  readonly whole: string
  readonly sweep: () => undefined
}

function treesSeeded(): Trees {
  const root = mkdtempSync(join(HOLD, TREES_AT))
  const git = (...argv: readonly string[]): undefined => {
    saying(["git", "-C", root, ...argv])
  }
  const headHere = (): string => saying(["git", "-C", root, "rev-parse", "HEAD"]).trim()
  git("init", "-q")
  git("config", "user.email", "none@example")
  git("config", "user.name", "none")
  mkdirSync(join(root, "one"))
  writeFileSync(join(root, "package.json"), '{ "name": "root", "workspaces": ["one"] }\n', "utf8")
  writeFileSync(join(root, "one/package.json"), '{ "name": "one", "version": "0.0.0" }\n', "utf8")
  saying(["bun", "install"], { cwd: root })
  git("add", "--", "package.json", "bun.lock")
  git("commit", "-q", "-m", "the root manifest and the lockfile")
  const missing = headHere()
  git("add", "--", "one/package.json")
  git("commit", "-q", "-m", "the manifest the root names")
  return {
    root,
    missing,
    whole: headHere(),
    sweep: (): undefined => {
      rmSync(root, { recursive: true, force: true })
    },
  }
}

const TREES = treesSeeded()

function scratches(): number {
  return readdirSync(HOLD).filter((one) => one.startsWith(GATE_AT)).length
}

afterAll(() => {
  WORLD.sweep()
  TREES.sweep()
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

test("a workspace a tree names and tracks no manifest for is read out of what bun said", () => {
  expect(unfoundIn('error: Workspace not found "shared/design-forms"')).toBe("shared/design-forms")
})

test("an install failing for anything else names no workspace", () => {
  expect(unfoundIn("error: lockfile had changes, but lockfile is frozen")).toBe(null)
})

test("an install that ran clean is nothing to refuse", () => {
  expect(whyUninstallable(SHA, { argv: [], code: 0, stdout: "", stderr: "" })).toBe(null)
})

test("a refusal names the workspace the pod would stop at", () => {
  const said = whyUninstallable(SHA, {
    argv: [],
    code: 1,
    stdout: "",
    stderr: 'error: Workspace not found "shared/design-forms"',
  })
  expect(said).toContain('Workspace not found "shared/design-forms"')
})

test("an install failing for anything else is refused by what it said", () => {
  const said = whyUninstallable(SHA, {
    argv: [],
    code: 1,
    stdout: "",
    stderr: "error: lockfile had changes, but lockfile is frozen",
  })
  expect(said).toContain("lockfile is frozen")
})

test("a tree naming a workspace it tracks no manifest for does not install", () => {
  const held = installableAt(TREES.root, TREES.missing)
  expect("why" in held ? held.why : "").toContain('Workspace not found "one"')
})

test("a tree tracking every manifest it names installs", () => {
  expect(installableAt(TREES.root, TREES.whole)).toEqual({ installs: true })
})

test("the worktree is not what an install is proved against", () => {
  expect(installableAt(TREES.root, TREES.missing)).not.toEqual({ installs: true })
})

test("a sha no commit stands at is refused rather than passed", () => {
  const held = installableAt(TREES.root, "f".repeat(40))
  expect("why" in held ? held.why : "").toContain("could not be read out")
})

test("the scratch an install is proved in is swept when the proof passes", () => {
  const before = scratches()
  installableAt(TREES.root, TREES.whole)
  expect(scratches()).toBe(before)
})

test("the scratch an install is proved in is swept when the proof fails", () => {
  const before = scratches()
  installableAt(TREES.root, TREES.missing)
  expect(scratches()).toBe(before)
})
