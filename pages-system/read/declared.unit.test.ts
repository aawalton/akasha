import { expect, test } from "bun:test"
import { checkQuery } from "../query/query.ts"
import { declarationOf, declarationsFor, extendingIn } from "./declared.ts"

const ROOT = `${import.meta.dir}/../..`

const answered = <T>(found: T | string): T => {
  if (typeof found === "string") throw new Error(found)
  return found
}

const declaring = (pageTypes: Iterable<string>) => answered(declarationsFor(ROOT, pageTypes))

const seat = () => {
  const declared = answered(declarationOf(ROOT, "seat"))
  if (declared === null) throw new Error("no seat page type stands under the root")
  return declared
}

test("a slug naming no page type declares nothing", () => {
  expect(declarationOf(ROOT, "no-page-type-is-spelt-this-way")).toBeNull()
})

test("a page type declares the keys of every page type it extends, as well as its own", () => {
  const declared = seat()
  expect(declared.properties["errand"]?.type).toEqual({ kind: "text" })
  expect(declared.properties["id"]?.type).toEqual({ kind: "text" })
  expect(declared.properties["on-call"]?.type).toEqual({ kind: "boolean" })
})

test("a key declared to hold what no formula holds is carried under what it holds", () => {
  const declared = seat()
  expect(declared.properties["turn-end-decisions"]).toBeUndefined()
  expect(declared.beyond["turn-end-decisions"]).toBe("pages")
})

test("a query naming a key beyond the language is refused by what the store declared", () => {
  const answer = checkQuery({ pageType: "seat", where: "{turn-end-decisions}" }, seat())
  if (answer.ok) throw new Error("checked")
  expect(answer.message).toContain("which no formula holds")
})

test("every page type asked for at once is declared what it declares on its own", () => {
  const many = declaring(["seat", "command", "domain"])
  for (const slug of ["seat", "command", "domain"]) {
    expect(many.get(slug)?.properties["id"]?.type).toEqual({ kind: "text" })
  }
  expect(many.get("command")?.properties["path"]?.type).toEqual({ kind: "text" })
  expect(many.get("domain")?.properties["path"]).toBeUndefined()
  expect(many.get("seat")?.properties["on-call"]?.type).toEqual({ kind: "boolean" })
  expect(many.get("command")?.properties["on-call"]).toBeUndefined()
})

test("a slug naming no page type is absent from the declarations, never declaring nothing", () => {
  const many = declaring(["seat", "no-page-type-is-spelt-this-way"])
  expect(many.has("seat")).toBe(true)
  expect(many.has("no-page-type-is-spelt-this-way")).toBe(false)
})

test("a page type asked for twice over is answered once", () => {
  const many = declaring(["seat", "seat"])
  expect([...many.keys()]).toEqual(["seat"])
})

test("what is asked for is walked once, so a generator is answered in full", () => {
  const asking = function* () {
    yield "seat"
    yield "command"
  }
  const many = declaring(asking())
  expect([...many.keys()].sort()).toEqual(["command", "seat"])
})

test("what a page type extends is answered as that page type states it", () => {
  const extending = answered(extendingIn(ROOT))
  expect(extending.get("command")).toBe("domain")
  expect(extending.get("seat")).toBe("agent")
})

test("a page type extending none is not answered as extending anything", () => {
  expect(answered(extendingIn(ROOT)).has("page")).toBe(false)
})

test("a query expanding a page type asks about exactly the page types whose chain reaches it", () => {
  const extending = answered(extendingIn(ROOT))
  const checked = checkQuery({ pageType: "domain", expands: true }, seat(), extending)
  if (!checked.ok) throw new Error(checked.message)

  const reaches = (slug: string): boolean => {
    const walked = new Set<string>()
    let at: string | undefined = slug
    while (at !== undefined && !walked.has(at)) {
      if (at === "domain") return true
      walked.add(at)
      at = extending.get(at)
    }
    return false
  }

  const asked = new Set(checked.pageTypes)
  expect(checked.pageTypes[0]).toBe("domain")
  expect(asked.size).toBe(checked.pageTypes.length)
  for (const slug of asked) expect(slug === "domain" || reaches(slug)).toBe(true)
  for (const slug of extending.keys()) expect(asked.has(slug)).toBe(reaches(slug))
})
