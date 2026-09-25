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
import { requireEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import {
  orchestratorCacheInitContainer,
  orchestratorCacheSyncSidecar,
  webBuildInitContainer,
  webCheckoutAndBuild,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache/orchestrator-cache.module.code.ts"
import {
  type CacheLocation,
  GIT_TRANSPORT_ASKING,
  GIT_TRANSPORT_ORIGIN,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache-locations/orchestrator-cache-locations.module.code.ts"

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
  readonly repo: string
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
  const head = git("rev-parse", "HEAD").trim()
  return { root, repo, head, served: join(repo, PACKAGE, "build"), runs }
}

function servedBuild(cache: Cache, stamp: string | null): undefined {
  mkdirSync(join(cache.served, "server"), { recursive: true })
  writeFileSync(join(cache.served, "server/index.js"), "old\n", "utf8")
  if (stamp !== null) writeFileSync(join(cache.served, ".built-from"), stamp, "utf8")
}

function runIn(cache: Cache, script: string, env: Readonly<Record<string, string>> = {}): string {
  const done = ran(["sh", "-c", script.replaceAll(/\/app\b/g, cache.root)], {
    env: { ...process.env, PATH: `${cache.root}/bin:${requireEnv("PATH")}`, ...env },
  })
  expect({ code: done.code, err: done.err }).toMatchObject({ code: 0 })
  return done.out
}

function initBuild(cache: Cache): string {
  return runIn(cache, scriptOf())
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

function originAhead(cache: Cache): string {
  const origin = join(cache.root, "origin")
  said(["git", "clone", "-q", cache.repo, origin])
  const git = (...argv: readonly string[]): string => said(["git", "-C", origin, ...argv])
  git("checkout", "-q", "-B", "main")
  git(
    "-c",
    "user.email=none@example",
    "-c",
    "user.name=none",
    "commit",
    "-q",
    "--allow-empty",
    "-m",
    "two"
  )
  said(["git", "-C", cache.repo, "remote", "add", "origin", origin])
  return git("rev-parse", "HEAD").trim()
}

test("a deploy's build checks the cache out to the commit asked for, and stamps that commit", () => {
  const cache = cacheSeeded()
  servedBuild(cache, cache.head)
  const ahead = originAhead(cache)
  runIn(cache, webCheckoutAndBuild(PACKAGE, ahead))
  expect(said(["git", "-C", cache.repo, "rev-parse", "HEAD"]).trim()).toBe(ahead)
  expect(builds(cache)).toBe(1)
  expect(stampOf(cache)).toBe(ahead)
})

test("a deploy's checkout and build are one hold of the lock init-build holds", () => {
  const script = webCheckoutAndBuild(PACKAGE, ELSEWHERE)
  expect(script).toContain('LOCK="/app/.init-lock"')
  expect(script.split("flock -n 9").length).toBe(2)
  expect(script.indexOf("flock -n 9")).toBeLessThan(script.indexOf("git fetch origin main"))
  expect(script.indexOf(`git reset --hard ${ELSEWHERE}`)).toBeLessThan(
    script.indexOf("react-router build")
  )
})

const TOKEN_REF = { secretName: "held", secretKey: "GIT_ACCESS_TOKEN" }

const AT_ORIGIN: CacheLocation = {
  backing: "hostPath",
  hostPath: "/var/held-cache",
  hostPathType: "DirectoryOrCreate",
  cloneOriginUrl: GIT_TRANSPORT_ORIGIN,
}

const TOKENED = GIT_TRANSPORT_ORIGIN.replace("http://", "http://x-access-token:planted@")

type Container = { readonly command: readonly string[]; readonly env: readonly object[] }

function initCodeOf(commit: string): Container {
  return orchestratorCacheInitContainer({
    gitAccessTokenRef: TOKEN_REF,
    location: AT_ORIGIN,
    commit,
  }) as Container
}

test("a checkout whose origin held a token has that origin named again without one", () => {
  const cache = cacheSeeded()
  const ahead = originAhead(cache)
  said(["git", "-C", cache.repo, "remote", "set-url", "origin", TOKENED])
  const answered = runIn(cache, initCodeOf(ahead).command[2] as string, {
    GIT_CONFIG_COUNT: "1",
    GIT_CONFIG_KEY_0: `url.${join(cache.root, "origin")}.insteadOf`,
    GIT_CONFIG_VALUE_0: GIT_TRANSPORT_ORIGIN,
  })
  const git = (...argv: readonly string[]): string =>
    said(["git", "-C", cache.repo, ...argv]).trim()
  expect(git("config", "--get", "remote.origin.url")).toBe(GIT_TRANSPORT_ORIGIN)
  expect(git("rev-parse", "HEAD")).toBe(ahead)
  expect(answered).not.toContain("planted")
})

test("every git call a pod makes reads the token from the pod's environment when asked", () => {
  const sync = orchestratorCacheSyncSidecar({ gitAccessTokenRef: TOKEN_REF }) as Container
  for (const held of [initCodeOf(ELSEWHERE), sync]) {
    expect(held.env).toEqual(expect.arrayContaining([...GIT_TRANSPORT_ASKING]))
  }
})
