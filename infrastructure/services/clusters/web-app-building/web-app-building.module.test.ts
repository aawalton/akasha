import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
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
} from "akasha/infrastructure/services/clusters/web-app-building/web-app-building.module.code.ts"
import type { Workload } from "akasha/infrastructure/services/clusters/web-app-reading/web-app-reading.module.code.ts"
import {
  SYNTH_AT,
  seededWorld,
} from "akasha/infrastructure/services/clusters/web-app-reading/web-app-reading.module.test-fixtures.ts"
import type {
  Manifest,
  Plan,
} from "akasha/infrastructure/services/clusters/workload-deploying/workload-deploying.module.code.ts"
import { said as saying } from "akasha/utils/run/running/running.module.code.ts"

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

test("the build sits where the workload the page names sits", () => {
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

test("a repository at no commit says what its HEAD is not", () => {
  expect(headOf(WORLD.root)).toBe(null)
})

test("the pod is checked out to the sha before the build runs", () => {
  expect(syncScript(SHA)).toContain(`git reset --hard ${SHA}`)
})

test("a checkout takes what origin carries rather than what is in the pod", () => {
  expect(syncScript(SHA)).toContain("git fetch origin main")
})

function scriptFor(): string {
  const target = buildTargetOf(plan(pod(SERVING)))
  return buildScript(target as NonNullable<typeof target>, SHA, [])
}

test("a build leaves the sha it was made from inside the build it made", () => {
  expect(scriptFor()).toContain(`printf %s ${SHA} > build.next/.built-from`)
})

test("a build is written into a scratch rather than the folder the pod serves", () => {
  expect(scriptFor()).toContain(
    "BUILD_DIRECTORY=build.next /app/repo/node_modules/.bin/react-router build"
  )
})

test("nothing touches the folder the pod serves until the build is made", () => {
  const script = scriptFor()
  expect(script.indexOf("react-router build")).toBeLessThan(script.indexOf("mv build build.old"))
})

test("the folder the pod serves is replaced by the scratch once the build is made", () => {
  expect(scriptFor()).toContain("mv build build.old && mv build.next build")
})

test("the scratch a build failed in is swept before the next build", () => {
  const script = scriptFor()
  expect(script.indexOf("rm -rf build.next build.old")).toBeLessThan(
    script.indexOf("react-router build")
  )
})

test("a build runs its install from the checkout rather than from the package", () => {
  const target = buildTargetOf(plan(pod(SERVING)))
  expect(buildScript(target as NonNullable<typeof target>, SHA, [])).toContain(
    "cd /app/repo && bun install --frozen-lockfile"
  )
})

const HANDED: BuildEnv = [{ name: "ONE", value: "first" }]

test("the values a build needs come before the build it runs", () => {
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

const BUILD_SAID = [
  "vite v8.2.2 building client environment for production...",
  "transforming...",
  "4 modules transformed.",
  "Build failed in 20ms",
  "error during build:",
  "Build failed with 1 error:",
  "",
  "[plugin @tailwindcss/vite:generate:build] /app/repo/one/web/src/app.css",
  'Error: Package path "./theme-gone.css" is not exported from package tailwindcss',
  "    at async EnvironmentPluginContainer.resolveId (node.js:30848:19)",
  "    at async resolve (node.js:22256:10)",
  "    at async loadStylesheet (index.mjs:10:2950)",
  "    at async Promise.all (index 1)",
  "    at aggregateErrorsIntoJsError (error.mjs:48:18)",
  "    at unwrapResult (error.mjs:18:128)",
  "    at #build (rolldown.mjs:133:34)",
  "    at async buildEnvironment (node.js:33821:66)",
  "    at async Object.build (node.js:34242:19)",
  "    at async CAC.<anonymous> (cli.js:776:3) {",
  "  errors: [Getter/Setter]",
  "}",
].join("\n")

test("a build failure is read from what failed rather than from the frames under it", () => {
  const said = saidBy({ argv: [], code: 1, stdout: "", stderr: BUILD_SAID })
  expect(said).toContain("[plugin @tailwindcss/vite:generate:build]")
  expect(said).toContain('Package path "./theme-gone.css" is not exported')
  expect(said).not.toContain(" at ")
})

test("a failure saying nothing but frames is read from those frames", () => {
  const said = saidBy({
    argv: [],
    code: 1,
    stdout: "",
    stderr: "    at one (a.js:1:1)\n    at async two (b.js:2:2)",
  })
  expect(said).toContain("at one (a.js:1:1)")
  expect(said).toContain("at async two (b.js:2:2)")
})

test("a pod already going away holds no build", () => {
  const said = ["web-old\t2026-09-01T04:28:16Z", "web-new\t", ""].join("\n")
  expect(livestOf(said)).toBe("web-new")
})

test("a pod nothing is taking away holds the build", () => {
  expect(livestOf("web-one\t\n")).toBe("web-one")
})

test("no pod there means no pod holds a build", () => {
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

test("a sha naming no commit is refused rather than passed", () => {
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
