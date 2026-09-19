import { expect, test } from "bun:test"
import {
  LOADER_FILE,
  loadedHere,
  loaderFiles,
  loaderRun,
  loaderText,
  manifestFile,
  manifestText,
  STAGING,
} from "akasha/infrastructure/service/workstation/modules/service-loading/service-loading.module.code.ts"

const ROOT = "/var/home/walton/repos/akasha"

const PORT = 8787

const RUNNER = "held/running/held-running.module.code.ts"

const CLOSURES: ReadonlyMap<string, ReadonlySet<string>> = new Map([
  ["held-service", new Set(["b/one.ts", "a/two.ts"])],
  ["other-service", new Set(["a/two.ts"])],
])

test("the loader is written beside the unit files rather than into the checkout", () => {
  expect(STAGING).toBe(".local/state/workstation-services")
  expect(LOADER_FILE.startsWith(ROOT)).toBe(false)
})

test("the loader imports nothing from akasha", () => {
  expect(loaderText(ROOT, PORT, RUNNER)).not.toContain('from "akasha/')
})

test("the loader asks the pages service the page service's own port answers on", () => {
  expect(loaderText(ROOT, PORT, RUNNER)).toContain("http://127.0.0.1:8787/read")
})

test("the loader names the checkout it resolves an akasha specifier under", () => {
  expect(loaderText(ROOT, PORT, RUNNER)).toContain(`const ROOT = "${ROOT}"`)
})

test("the run the loader reaches for is the one the caller named", () => {
  expect(loaderText(ROOT, PORT, RUNNER)).toContain(`const RUNNER = "akasha/${RUNNER}"`)
})

test("the loader names no commit, so the bodies are the ones the checkout holds now", () => {
  expect(loaderText(ROOT, PORT, RUNNER)).not.toContain('"at"')
})

test("the loader warms its bodies in one call before it imports anything", () => {
  const text = loaderText(ROOT, PORT, RUNNER)
  expect(text.indexOf("readFileSync(join(import.meta.dir")).toBeLessThan(
    text.indexOf("await import")
  )
})

test("a path the one call did not carry is asked for on its own and counted", () => {
  const text = loaderText(ROOT, PORT, RUNNER)
  expect(text).toContain("late += 1")
  expect(text).toContain("process.stderr.write")
})

test("the loader asks the pages service itself rather than spawning a program to ask", () => {
  const text = loaderText(ROOT, PORT, RUNNER)
  expect(text).toContain("await fetch(READ")
  expect(text).not.toContain("Bun.spawnSync")
})

test("a pages service that does not answer is asked again, each wait longer than the last", () => {
  const text = loaderText(ROOT, PORT, RUNNER)
  expect(text).toContain("wait = Math.min(wait * 2, LONGEST_WAIT)")
})

test("the window for asking again outlasts one try, so a try that timed out is asked again", () => {
  const text = loaderText(ROOT, PORT, RUNNER)
  const answerIn = Number(/const ANSWER_IN = (\d+)/.exec(text)?.[1])
  const askAgainFor = Number(/const ASK_AGAIN_FOR = (\d+)/.exec(text)?.[1])
  expect(askAgainFor).toBeGreaterThan(answerIn)
})

test("a pages service that never answers is said plainly and the run is refused", () => {
  const text = loaderText(ROOT, PORT, RUNNER)
  const said = text.indexOf('SAID + " the pages service did not answer at " + READ')
  expect(said).toBeGreaterThan(-1)
  expect(text.indexOf("process.exit(REFUSED_EXIT)", said)).toBeGreaterThan(said)
})

test("a unit reaches the loader through the home directory systemd spells for it", () => {
  expect(loaderRun("held-service")).toBe(`bun %h/${STAGING}/${LOADER_FILE} held-service`)
})

test("a command line the loader composes names no pinned tree", () => {
  expect(loaderRun("held-service")).not.toContain(".git/trees")
})

test("which services the loader runs is named here", () => {
  expect(loadedHere("sweep-log-days")).toBe(true)
  expect(loadedHere("held-service")).toBe(false)
})

test("a service that mends a broken pages service is not run by the loader", () => {
  for (const one of [
    "page-service",
    "workstation-deploying",
    "cluster-deploying",
    "web-app-deploying",
    "container-recipe-deploying",
    "eso-addon-deploying",
    "inference-deploying",
    "ios-app-deploying",
    "service-watching",
  ]) {
    expect(loadedHere(one)).toBe(false)
  }
})

test("a service kept running by systemd is run by the loader", () => {
  for (const one of [
    "apns-push-notifier",
    "code-editor-data-watcher",
    "maintain-seat-pending",
    "surplus-fall-notifier",
  ]) {
    expect(loadedHere(one)).toBe(true)
  }
})

test("a service whose entry only execs a binary or a container is run by the loader", () => {
  for (const one of ["node-exporter", "dcgm-exporter", "ttc-client", "repos-empty-dir-purge"]) {
    expect(loadedHere(one)).toBe(true)
  }
})

test("a manifest names its paths one to a line, in order, ending on a newline", () => {
  expect(manifestText(["b/one.ts", "a/two.ts"])).toBe("a/two.ts\nb/one.ts\n")
})

test("a manifest is named for the service it carries the closure of", () => {
  expect(manifestFile("held-service")).toBe("held-service.paths")
})

test("one loader is written for the machine and one manifest for each service", () => {
  const files = loaderFiles(ROOT, PORT, RUNNER, CLOSURES)
  expect([...files.keys()].sort()).toEqual([
    "held-service.paths",
    "other-service.paths",
    LOADER_FILE,
  ])
  expect(files.get("other-service.paths")).toBe("a/two.ts\n")
})
