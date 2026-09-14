import { expect, test } from "bun:test"
import {
  LOADER_FILE,
  loaderFiles,
  loaderText,
  manifestFile,
  manifestText,
  STAGING,
} from "akasha/infrastructure/services/workstations/modules/service-loading/service-loading.module.code.ts"

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
