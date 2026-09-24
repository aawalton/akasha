import { afterAll, expect, test } from "bun:test"
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { join } from "node:path"
import { ran, said } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { webBuildInitContainer } from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache/orchestrator-cache.module.code.ts"

const HOLD = "/var/tmp"

const MADE_AT = "akasha-init-build-"

const PACKAGE = "one/web"

const ELSEWHERE = "f".repeat(40)

const MADE: string[] = []

afterAll(() => {
  for (const at of MADE) rmSync(at, { recursive: true, force: true })
})

function scriptOf(): string {
  const container = webBuildInitContainer({ packagePath: PACKAGE, secretName: "held" }) as {
    readonly command: readonly string[]
  }
  return container.command[2] as string
}

type Cache = {
  readonly root: string
  readonly head: string
  readonly served: string
  readonly runs: string
}

function executable(at: string, lines: readonly string[]): undefined {
  writeFileSync(at, `${lines.join("\n")}\n`, "utf8")
  chmodSync(at, 0o755)
}

function cacheSeeded(): Cache {
  const root = mkdtempSync(join(HOLD, MADE_AT))
  MADE.push(root)
  const repo = join(root, "repo")
  const runs = join(root, "runs")
  mkdirSync(join(repo, PACKAGE), { recursive: true })
  mkdirSync(join(repo, "node_modules/.bin"), { recursive: true })
  mkdirSync(join(root, "bin"))
  executable(join(root, "bin/bun"), ["#!/bin/sh", "exit 0"])
  executable(join(repo, "node_modules/.bin/react-router"), [
    "#!/bin/sh",
    'mkdir -p "$BUILD_DIRECTORY/server"',
    'printf %s "$VITE_BUILD_SHA" > "$BUILD_DIRECTORY/server/index.js"',
    `echo built >> ${runs}`,
  ])
  writeFileSync(join(repo, PACKAGE, "server.ts"), "\n", "utf8")
  const git = (...argv: readonly string[]): string => said(["git", "-C", repo, ...argv])
  git("init", "-q")
  git("add", "--", PACKAGE)
  git("-c", "user.email=none@example", "-c", "user.name=none", "commit", "-q", "-m", "one")
  return { root, head: git("rev-parse", "HEAD").trim(), served: join(repo, PACKAGE, "build"), runs }
}

function servedBuild(cache: Cache, stamp: string | null): undefined {
  mkdirSync(join(cache.served, "server"), { recursive: true })
  writeFileSync(join(cache.served, "server/index.js"), "old\n", "utf8")
  if (stamp !== null) writeFileSync(join(cache.served, ".built-from"), stamp, "utf8")
}

function initBuild(cache: Cache): string {
  const script = scriptOf().replaceAll("/app/", `${cache.root}/`)
  const done = ran(["sh", "-c", script], {
    env: { ...process.env, PATH: `${cache.root}/bin:${process.env.PATH ?? ""}` },
  })
  expect(done.err).toBe("")
  expect(done.code).toBe(0)
  return done.out
}

function builds(cache: Cache): number {
  return existsSync(cache.runs) ? readFileSync(cache.runs, "utf8").trim().split("\n").length : 0
}

function stampOf(cache: Cache): string {
  return readFileSync(join(cache.served, ".built-from"), "utf8")
}

test("a pod whose build is of the checkout's commit builds nothing", () => {
  const cache = cacheSeeded()
  servedBuild(cache, cache.head)
  expect(initBuild(cache)).toContain(`is of ${cache.head} already`)
  expect(builds(cache)).toBe(0)
})

test("a pod builds where the build beside the server is of another commit", () => {
  const cache = cacheSeeded()
  servedBuild(cache, ELSEWHERE)
  initBuild(cache)
  expect(builds(cache)).toBe(1)
  expect(stampOf(cache)).toBe(cache.head)
})

test("a pod builds where the build beside the server names no commit", () => {
  const cache = cacheSeeded()
  servedBuild(cache, null)
  initBuild(cache)
  expect(builds(cache)).toBe(1)
  expect(stampOf(cache)).toBe(cache.head)
})

test("a pod builds where no build is beside the server", () => {
  const cache = cacheSeeded()
  initBuild(cache)
  expect(builds(cache)).toBe(1)
  expect(stampOf(cache)).toBe(cache.head)
})

test("a pod's build is handed the commit the checkout is of", () => {
  const cache = cacheSeeded()
  initBuild(cache)
  expect(readFileSync(join(cache.served, "server/index.js"), "utf8")).toBe(cache.head)
})

test("a pod builds holding the lock every checkout on the cache holds", () => {
  const script = scriptOf()
  expect(script).toContain('LOCK="/app/.init-lock"')
  expect(script.indexOf("flock -n 9")).toBeLessThan(script.indexOf("rev-parse HEAD"))
  expect(script.indexOf("rev-parse HEAD")).toBeLessThan(script.indexOf("react-router build"))
})
