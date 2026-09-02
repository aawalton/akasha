import { expect, test } from "bun:test"
import { join } from "node:path"
import type { Carried } from "@akasha/pages-system/page-type-properties"
import {
  besideItsPage,
  foldedFor,
  folderFor,
  orderedIn,
  pathFor,
} from "./page-composing.module.code.ts"

const ROOT = join(import.meta.dir, "..", "..", "..", "..")

const AN_INSTANT = "2026-09-01T12:00:00.000Z"

const A_DEVICE_TOKEN = {
  pageTypeSlug: "device-token",
  slug: "held-one",
  values: {
    id: "01a05dc7-421c-7000-b93a-ac4514adf294",
    pageTypeSlug: "device-token",
    slug: "held-one",
    personSlug: "alan",
    iosAppSlug: "alanwalton",
    lastSeenAt: AN_INSTANT,
  },
}

const A_DAY = {
  pageTypeSlug: "wake-day",
  slug: "wake-day-1970-01-01",
  values: {
    id: "01a06100-0000-7000-8000-000000000001",
    pageTypeSlug: "wake-day",
    slug: "wake-day-1970-01-01",
    title: "1970-01-01",
    date: "1970-01-01",
  },
}

function carrying(key: string, declaredBy: string): Carried {
  return {
    pagePropertySlug: key,
    pageTypeSlug: "text-property",
    propertySlug: key,
    key,
    unique: null,
    declaredBy,
    required: false,
    many: false,
    max: null,
    total: null,
    uncommitted: false,
    secret: false,
  }
}

test("the keys are written in the order they are declared, the deepest type first", () => {
  const said = orderedIn([
    carrying("token", "device-token"),
    carrying("id", "page"),
    carrying("slug", "page"),
  ])
  expect(said.map((one) => one.key)).toEqual(["id", "slug", "token"])
})

test("one type's keys keep the order that type declares them in", () => {
  const said = orderedIn([carrying("b", "thing"), carrying("a", "thing")])
  expect(said.map((one) => one.key)).toEqual(["b", "a"])
})

test("a folder already named by the plural takes a new page under pages", () => {
  const said = pathFor(
    "akasha/person-system/device-tokens/device-token.page-type.ts",
    "device-tokens",
    "device-token",
    "one",
    false
  )
  expect(said).toBe("akasha/person-system/device-tokens/pages/one.device-token.ts")
})

test("a folder not named by the plural takes a new page under the plural", () => {
  const said = pathFor("akasha/seat-system/seat/seat.page-type.ts", "seats", "seat", "one", false)
  expect(said).toBe("akasha/seat-system/seat/seats/one.seat.ts")
})

test("a page carrying files beside it takes a folder of its own under the plural", () => {
  const said = pathFor("akasha/seat-system/seat/seat.page-type.ts", "seats", "seat", "one", true)
  expect(said).toBe("akasha/seat-system/seat/seats/one/one.seat.ts")
})

test("a type declaring a property held in a file carries files beside its page", () => {
  const carried = [carrying("slug", "page"), carrying("sessions", "wake-day")]
  expect(besideItsPage(ROOT, carried)).toBe(true)
})

test("a type declaring no property held in a file carries none", () => {
  const carried = [carrying("slug", "page"), carrying("date", "wake-day")]
  expect(besideItsPage(ROOT, carried)).toBe(false)
})

test("a new day is placed in a folder of its own under the plural", () => {
  const said = foldedFor(ROOT, [A_DAY])
  expect("puts" in said && said.puts[0]?.path).toBe(
    "akasha/alan/tracking/daily/wake-days/pages/1970-01-01/wake-day-1970-01-01.wake-day.ts"
  )
})

test("several pages compose into what one write puts and what it keeps", () => {
  const said = foldedFor(ROOT, [A_DEVICE_TOKEN])
  expect("puts" in said && said.puts.length).toBe(1)
  expect("puts" in said && said.puts[0]?.path).toBe(
    "akasha/person-system/device-tokens/pages/held-one.device-token.ts"
  )
  expect("kept" in said && said.kept[0]?.values.lastSeenAt).toBe(AN_INSTANT)
})

test("a value the page type keeps outside the commit is written into no body", () => {
  const said = foldedFor(ROOT, [A_DEVICE_TOKEN])
  expect("puts" in said && said.puts[0]?.content).toContain("personSlug")
  expect("puts" in said && said.puts[0]?.content).not.toContain("lastSeenAt")
})

test("one page refused refuses the whole list", () => {
  const said = foldedFor(ROOT, [
    A_DEVICE_TOKEN,
    { pageTypeSlug: "device-token", slug: "held-two", values: { nowhere: "one" } },
  ])
  expect("refused" in said && said.refused).toContain("nowhere")
})

test("a list of no page composes into nothing put and nothing kept", () => {
  const said = foldedFor(ROOT, [])
  expect("puts" in said && said.puts.length).toBe(0)
  expect("kept" in said && said.kept.length).toBe(0)
})

const DEFINER = {
  pageTypeSlug: "role",
  slug: "definer",
  values: {
    pageTypeSlug: "role",
    slug: "definer",
    definition: "an agent settling with Alan what a domain is and becomes",
    onCall: false,
  },
}

test("a page the index already holds keeps the identity it has", () => {
  const said = foldedFor(ROOT, [DEFINER])
  expect("puts" in said && said.puts[0]?.content).toContain("01a053c5-8d29-7025-8439-5c119ee2f12d")
})

test("a page the index does not hold is composed carrying no identity", () => {
  const said = foldedFor(ROOT, [{ ...DEFINER, slug: "held-one" }])
  expect("puts" in said && said.puts[0]?.path).toBe(
    "akasha/role-system/roles/pages/held-one.role.ts"
  )
  expect("puts" in said && said.puts[0]?.content).not.toContain("id:")
})

test("a folder of a page's own drops the name above it from the front of the slug", () => {
  expect(folderFor("wake-days", "wake-day", "wake-day-1970-01-01")).toBe("1970-01-01")
  expect(folderFor("eso-days", "eso-day", "eso-day-1970-01-01")).toBe("1970-01-01")
})

test("a slug the name above it does not open is the folder whole", () => {
  expect(folderFor("seats", "seat", "one")).toBe("one")
  expect(folderFor("seats", "seat", "seat-")).toBe("seat-")
})
