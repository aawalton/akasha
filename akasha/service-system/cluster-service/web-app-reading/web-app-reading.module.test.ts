import { afterAll, expect, test } from "bun:test"
import {
  deployableNamed,
  firstOf,
  frontmatterOf,
  namedAmong,
  pagesUnder,
  synthBeside,
  workloadIn,
} from "./web-app-reading.module.code.ts"
import { standingWorld } from "./web-app-reading.module.test-fixtures.ts"

const WORLD = standingWorld()

afterAll(() => {
  WORLD.sweep()
})

const PAGE = [
  "---",
  "id: 53dbed4e-2f1d-5cba-9e4d-19ce5c5677ea",
  'title: "Alanwalton web"',
  "slug: alanwalton-web",
  "cluster-service-slugs:",
  "  - alanwalton-web",
  "required-reading-slugs: [domain/browser]",
  "---",
  "",
  "# Definition",
].join("\n")

test("a page's frontmatter reads as the keys it states", () => {
  const front = frontmatterOf(PAGE)
  expect(firstOf(front, "slug")).toBe("alanwalton-web")
  expect(firstOf(front, "title")).toBe("Alanwalton web")
})

test("a key stating a list under it reads as that list", () => {
  expect(frontmatterOf(PAGE).get("cluster-service-slugs")).toEqual(["alanwalton-web"])
})

test("a key stating a list on its own line reads as that list", () => {
  expect(frontmatterOf(PAGE).get("required-reading-slugs")).toEqual(["domain/browser"])
})

test("what stands past the closing fence is no frontmatter", () => {
  expect(frontmatterOf(PAGE).get("# Definition")).toBeUndefined()
})

test("a body opening with no fence states nothing", () => {
  expect(frontmatterOf("slug: alanwalton-web\n").size).toBe(0)
})

test("a page states no workload unless it states all three of what names one", () => {
  expect(workloadIn(frontmatterOf("---\nkind: Deployment\nnamespace: alanwalton\n---\n"))).toBe(
    null
  )
})

test("a page stating all three names the workload it is", () => {
  const front = frontmatterOf(
    "---\nkind: Deployment\nnamespace: alanwalton\nresource-name: web\n---\n"
  )
  expect(workloadIn(front)).toEqual({ kind: "Deployment", name: "web", namespace: "alanwalton" })
})

test("a page is named among the pages by its file's name alone", () => {
  const among = ["a/web.web-app.md", "b/other-web.web-app.md"]
  expect(namedAmong(among, "web", ".web-app.md")).toEqual(["a/web.web-app.md"])
})

test("the code a cluster service's manifests come from stands beside its page", () => {
  expect(synthBeside("alanwalton/web/alanwalton-web.cluster-service.md")).toBe(
    "alanwalton/web/alanwalton-web.cluster-service.code.attachment.ts"
  )
})

test("the web app pages a tree holds are listed", () => {
  expect(pagesUnder(WORLD.root, ".web-app.md")?.length).toBe(5)
})

test("a tree that is no repository lists nothing rather than throwing", () => {
  expect(pagesUnder("/var/tmp/no-such-tree-stands-here", ".web-app.md")).toBe(null)
})

test("a slug no web app page carries is refused by name", () => {
  const read = deployableNamed(WORLD.root, "no-such-web-app-stands-here")
  expect("refused" in read && read.refused).toContain("no-such-web-app-stands-here")
})

test("a web app that is named reads through to the workload the cluster runs", () => {
  const read = deployableNamed(WORLD.root, "one-web")
  expect("deployable" in read).toBe(true)
  if (!("deployable" in read)) return
  expect(read.deployable.clusterServiceSlug).toBe("one-web")
  expect(read.deployable.workload).toEqual({ kind: "Deployment", name: "web", namespace: "one" })
  expect(read.deployable.synthPath).toBe("one/web/one-web.cluster-service.code.attachment.ts")
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

test("a cluster service page with no code beside it is refused", () => {
  const read = deployableNamed(WORLD.root, "bare-web")
  expect("refused" in read && read.refused).toContain("no code beside it")
})
