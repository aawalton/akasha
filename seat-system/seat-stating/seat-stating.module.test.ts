import { expect, test } from "bun:test"
import { rootOf } from "@akasha/command-system/rooting"
import {
  addressFor,
  assignedKinds,
  assignmentAddressOf,
  assignmentStatedIn,
  personNamed,
  type SeatStated,
  seatBody,
} from "./seat-stating.module.code.ts"

const ROOT = rootOf(import.meta.dir)

const NO_PAGE = ""

const WHOLE: SeatStated = {
  agentId: "01a05e00-0000-7000-8000-000000000001",
  persona: "athena",
  domain: "agent-harness",
  assignment: null,
  role: "definer",
  principal: "alan",
  mode: "interactive",
  registration: "aawalton",
  onCall: true,
  session: null,
  parentName: null,
}

function short(key: keyof SeatStated): SeatStated {
  return { ...WHOLE, [key]: null }
}

test("a seat stating everything is written as a page naming its person", () => {
  const body = seatBody(WHOLE, "athena", ROOT)
  expect(body).toContain("export const athena = {")
  expect(body).toContain('personSlug: "alan"')
  expect(body).toContain('roleSlug: "definer"')
  expect(body).toContain("onCall: true,")
  expect(body).toContain("} as const satisfies Seat")
  expect(body).not.toContain("principalSeatName")
})

test("a seat short of a persona or a domain or a role is written as no page", () => {
  expect(seatBody(short("persona"), "athena", ROOT)).toBeNull()
  expect(seatBody(short("domain"), "athena", ROOT)).toBeNull()
  expect(seatBody(short("role"), "athena", ROOT)).toBeNull()
  expect(seatBody(short("principal"), "athena", ROOT)).toBeNull()
})

test("a seat short of a start mode or a registration is written as no page", () => {
  expect(seatBody(short("mode"), "athena", ROOT)).toBeNull()
  expect(seatBody(short("registration"), "athena", ROOT)).toBeNull()
})

test("a seat whose principal is no person names the seat above it", () => {
  const under = { ...WHOLE, principal: "fleet", parentName: "athena" }
  const body = seatBody(under, "athena-worker", ROOT)
  expect(body).toContain('principalSeatName: "athena"')
  expect(body).not.toContain("personSlug")
})

test("a seat whose principal is no person and names no seat above is written as no page", () => {
  expect(seatBody({ ...WHOLE, principal: "fleet", parentName: null }, "x", ROOT)).toBeNull()
  expect(seatBody({ ...WHOLE, principal: "fleet", parentName: "" }, "x", ROOT)).toBeNull()
})

test("the session a seat answers in is carried where there is one", () => {
  const said = seatBody({ ...WHOLE, session: "18b641a7-2046-4638-8ab3-5a75268ff0d6" }, "a", ROOT)
  expect(said).toContain('claudeCodeSessionUuid: "18b641a7-2046-4638-8ab3-5a75268ff0d6"')
  expect(seatBody(WHOLE, "a", ROOT)).not.toContain("claudeCodeSessionUuid")
})

test("a seat not on call says so", () => {
  expect(seatBody({ ...WHOLE, onCall: false }, "a", ROOT)).toContain("onCall: false,")
})

test("an assignment is addressed under the page type carrying its slug", () => {
  expect(assignmentAddressOf("athena", ROOT)).toBe("persona/athena")
})

test("an assignment naming a page type that carries its slug is not addressed again", () => {
  expect(assignmentAddressOf("persona/akasha", ROOT)).toBe("persona/akasha")
  expect(assignmentAddressOf("akasha", ROOT)).toBe("domain/akasha")
})

test("an assignment the page addresses keeps the page type that page names", () => {
  expect(assignmentStatedIn("initiative/akasha-migration", "akasha-migration")).toBe(
    "initiative/akasha-migration"
  )
})

test("an assignment addressing another slug than the seat states is addressed again", () => {
  expect(assignmentStatedIn("initiative/akasha-migration", "agent-harness")).toBeNull()
})

test("an assignment naming no page type is addressed rather than kept", () => {
  expect(assignmentStatedIn("akasha-migration", "akasha-migration")).toBeNull()
  expect(assignmentStatedIn(null, "akasha-migration")).toBeNull()
  expect(assignmentStatedIn("/akasha-migration", "akasha-migration")).toBeNull()
})

test("the address the page states is what the body carries", () => {
  const body = seatBody(WHOLE, "athena", ROOT, "initiative/agent-harness")
  expect(body).toContain('assignmentSlug: "initiative/agent-harness"')
})

test("a body handed no address off a page is addressed under the kind carrying its slug", () => {
  expect(seatBody(WHOLE, "athena", ROOT)).toContain('assignmentSlug: "domain/agent-harness"')
})

test("a seat keeps the address it stated where a stop has taken its page away", () => {
  const stopped = {
    ...WHOLE,
    domain: "akasha-migration",
    assignment: "initiative/akasha-migration",
  }
  expect(addressFor(stopped, NO_PAGE, ROOT, false)).toBe("initiative/akasha-migration")
  expect(seatBody(stopped, "akasha", ROOT, addressFor(stopped, NO_PAGE, ROOT, false))).toContain(
    'assignmentSlug: "initiative/akasha-migration"'
  )
})

test("a seat that stated no address is addressed under the kind carrying its slug", () => {
  const bare = { ...WHOLE, domain: "akasha-migration" }
  expect(addressFor(bare, NO_PAGE, ROOT, false)).toBeNull()
  expect(seatBody(bare, "akasha", ROOT, addressFor(bare, NO_PAGE, ROOT, false))).toContain(
    'assignmentSlug: "domain/akasha-migration"'
  )
})

test("an address stated before a stop goes where the seat states another slug", () => {
  expect(
    addressFor({ ...WHOLE, assignment: "initiative/akasha-migration" }, NO_PAGE, ROOT, false)
  ).toBeNull()
})

test("a seat short of a domain is addressed as nothing", () => {
  expect(addressFor(short("domain"), NO_PAGE, ROOT, false)).toBeNull()
})

test("a slug no page type carries is addressed as a domain", () => {
  expect(assignmentAddressOf("nothing-carries-this-slug", ROOT)).toBe(
    "domain/nothing-carries-this-slug"
  )
})

test("a person is known from the pages rather than from a list written here", () => {
  expect(personNamed(ROOT, "alan")).toBe(true)
  expect(personNamed(ROOT, "athena")).toBe(false)
})

test("the kinds an assignment is looked for under open with the preferred order", () => {
  expect(assignedKinds(ROOT).slice(0, 4)).toEqual(["domain", "person", "persona", "initiative"])
})

test("every kind an assignment is looked for under is named once", () => {
  const kinds = assignedKinds(ROOT)
  expect(new Set(kinds).size).toBe(kinds.length)
})
