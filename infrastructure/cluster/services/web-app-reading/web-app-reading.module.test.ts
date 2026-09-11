import { afterAll, expect, test } from "bun:test"
import {
  codeBeside,
  deployableNamed,
  pathsNamed,
  WEB_APP_TYPE,
  wantingIn,
  workloadIn,
} from "akasha/infrastructure/cluster/services/web-app-reading/web-app-reading.module.code.ts"
import {
  MANIFEST_AT,
  SYNTH_AT,
  seededWorld,
  WEB_APPS_AT,
} from "akasha/infrastructure/cluster/services/web-app-reading/web-app-reading.module.test-fixtures.ts"

const WORLD = seededWorld()

afterAll(() => {
  WORLD.sweep()
})

test("a page states no workload unless it states all three of what names one", () => {
  expect(workloadIn({ resourceKind: "Deployment", namespace: "one" })).toBe(null)
})

test("a page stating all three names the workload it is", () => {
  expect(workloadIn({ resourceKind: "Deployment", namespace: "one", resourceName: "web" })).toEqual(
    { kind: "Deployment", name: "web", namespace: "one" }
  )
})

test("what a page is asked for and does not state is named back", () => {
  expect(wantingIn({ sourceDirectory: "one/web" }, ["sourceDirectory", "buildCommand"])).toEqual([
    "buildCommand",
  ])
})

test("a manifest page's code is the file of that name beside it", () => {
  expect(codeBeside("a/b/one-web.manifest.ts")).toBe("a/b/one-web.manifest.code.ts")
})

test("the page of a type carrying a slug is the page the index answers with", () => {
  expect(pathsNamed(WORLD.root, WEB_APP_TYPE, "one-web")).toEqual([
    `${WEB_APPS_AT}/one-web.web-app.ts`,
  ])
})

test("a slug no page of that type carries is answered with no page rather than by a throw", () => {
  expect(pathsNamed(WORLD.root, WEB_APP_TYPE, "no-such-web-app-is-here")).toEqual([])
})

test("a slug no web app page carries is refused by name", () => {
  const read = deployableNamed(WORLD.root, "no-such-web-app-is-here")
  expect("refused" in read && read.refused).toContain("no-such-web-app-is-here")
})

test("a web app that is named reads through to the workload the cluster runs", () => {
  const read = deployableNamed(WORLD.root, "one-web")
  expect("deployable" in read).toBe(true)
  if (!("deployable" in read)) return
  expect(read.deployable.clusterServiceSlug).toBe("one-web")
  expect(read.deployable.workload).toEqual({ kind: "Deployment", name: "web", namespace: "one" })
  expect(read.deployable.manifestPath).toBe(MANIFEST_AT)
  expect(read.deployable.synthPath).toBe(SYNTH_AT)
})

test("a web app that is named reads through to where its own source sits", () => {
  const read = deployableNamed(WORLD.root, "one-web")
  expect("deployable" in read).toBe(true)
  if (!("deployable" in read)) return
  expect(read.deployable.sourceDirectory).toBe("one/web")
  expect(read.deployable.buildCommand).toBe("bun run build")
  expect(read.deployable.hostnames).toEqual(["one-web.example"])
})

test("a web app that is named reads through to the shape of its workload", () => {
  const read = deployableNamed(WORLD.root, "one-web")
  expect("deployable" in read).toBe(true)
  if (!("deployable" in read)) return
  expect(read.deployable.image).toBe("registry.example/bun:latest")
  expect(read.deployable.replicas).toBe(1)
  expect(read.deployable.containerPort).toBe(3000)
})

test("a web app naming two cluster services is refused rather than chosen between", () => {
  const read = deployableNamed(WORLD.root, "two-web")
  expect("refused" in read && read.refused).toContain("unsettled")
})

test("a web app naming no cluster service is refused", () => {
  const read = deployableNamed(WORLD.root, "none-web")
  expect("refused" in read && read.refused).toContain("names no cluster service")
})

test("a web app naming a cluster service no page describes is refused", () => {
  const read = deployableNamed(WORLD.root, "lost-web")
  expect("refused" in read && read.refused).toContain("no-such-service")
})

test("a web app stating nothing of its own source is refused", () => {
  const read = deployableNamed(WORLD.root, "short-web")
  expect("refused" in read && read.refused).toContain("sourceDirectory")
})

test("a cluster service naming a manifest no page carries is refused", () => {
  const read = deployableNamed(WORLD.root, "orphan-web")
  expect("refused" in read && read.refused).toContain("no-such-manifest")
})

test("a manifest page whose code file is not there is refused", () => {
  const read = deployableNamed(WORLD.root, "bare-web")
  expect("refused" in read && read.refused).toContain("no file is there")
})
