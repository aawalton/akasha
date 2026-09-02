import { expect, test } from "bun:test"
import { fileFor, valuedIn, valueIn } from "./index-value.index.code.ts"

const REPO = "/repo"

const VALUE = {
  id: "01a05a51-0000-7000-8000-00000000000d",
  pageTypeSlug: "workstation-service",
  slug: "a-service",
  enabled: true,
  port: 8787,
}

test("a page is filed under the page type its value states", () => {
  const filed = valueIn(VALUE, "/repo/akasha/a.workstation-service.ts", REPO)
  expect(filed.length).toBe(1)
  expect(filed[0]?.at).toBe("value/workstation-service.jsonl")
})

test("a line carries the page's path under the root and the whole value", () => {
  const filed = valueIn(VALUE, "/repo/akasha/a.workstation-service.ts", REPO)
  const said = JSON.parse(filed[0]?.line as string)
  expect(said.path).toBe("akasha/a.workstation-service.ts")
  expect(said.value).toEqual(VALUE)
})

test("a path already under the root is filed as it stands", () => {
  const filed = valueIn(VALUE, "akasha/a.workstation-service.ts", REPO)
  expect(JSON.parse(filed[0]?.line as string).path).toBe("akasha/a.workstation-service.ts")
})

test("a value stating no page type is filed by nothing", () => {
  expect(valueIn({ id: "x", slug: "y" }, "akasha/a.ts", REPO)).toEqual([])
})

test("a page type names the one file its pages are filed in", () => {
  expect(fileFor("workstation-service")).toBe("value/workstation-service.jsonl")
  expect(fileFor("page")).toBe("value/page.jsonl")
})

test("a filed line is read back as the path and the value it carries", () => {
  const filed = valueIn(VALUE, "akasha/a.workstation-service.ts", REPO)
  const read = valuedIn(filed[0]?.line as string)
  expect(read?.path).toBe("akasha/a.workstation-service.ts")
  expect(read?.value).toEqual(VALUE)
})

test("a line that is not a filed value is read as none rather than throwing", () => {
  expect(valuedIn("not json")).toBe(null)
  expect(valuedIn("[]")).toBe(null)
  expect(valuedIn("null")).toBe(null)
  expect(valuedIn(JSON.stringify({ path: 3, value: {} }))).toBe(null)
  expect(valuedIn(JSON.stringify({ path: "a", value: "b" }))).toBe(null)
  expect(valuedIn(JSON.stringify({ path: "a" }))).toBe(null)
})

test("a value carrying a list and a record survives the round trip", () => {
  const held = { pageTypeSlug: "t", runs: ["a", "b"], systemd: { schedule: "daily" } }
  const filed = valueIn(held, "akasha/a.t.ts", REPO)
  expect(valuedIn(filed[0]?.line as string)?.value).toEqual(held)
})
