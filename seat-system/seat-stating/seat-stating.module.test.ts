import { expect, test } from "bun:test"
import { rootOf } from "@akasha/command-system/rooting"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import {
  addressFor,
  assignedKinds,
  assignmentAddressOf,
  assignmentStatedIn,
  type Landing,
  personNamed,
  type SeatStated,
  seatBody,
  tookSeat,
  unfiled,
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
  expect(body).toContain('pageTypeSlug: "seat"')
  expect(body).toContain('type: "seat"')
  expect(body).toContain('person: "alan"')
  expect(body).toContain('role: "definer"')
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
  expect(body).not.toContain("person:")
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

const STOPPED = "athena"

const PAGE_AT = `seat-system/seats/pages/${STOPPED}.seat.ts`

const PAGE_BODY = "export const athena = {} as const\n"

const TAKE_PAGE = "change-mechanical-file/remove-file-page"

const TAKE_FILE = "change-mechanical-file/remove-file"

const UNFILED_SAID = `\`${PAGE_AT}\` names no page, so no page is taken away`

const HELD_LOCK = "another landing has held the lock"

function landingSaying(answers: readonly (readonly string[])[]): {
  readonly landing: Landing
  readonly named: readonly string[]
} {
  const named: string[] = []
  let asked = 0
  const landing: Landing = (_root, changes, _message) => {
    named.push(changes.map((one) => one.at).join(","))
    const said = answers[asked] ?? []
    asked += 1
    return Promise.resolve({ refusals: [...said] })
  }
  return { landing, named }
}

async function stopping(
  answers: readonly (readonly string[])[],
  name: string = STOPPED
): Promise<{ readonly said: unknown; readonly named: readonly string[] }> {
  const world = scratchWorld()
  try {
    const root = world.rootFor("seat-stating-")
    writing(root, PAGE_AT, PAGE_BODY)
    const run = landingSaying(answers)
    const said = await tookSeat(root, name, "deliberate", run.landing)
    return { said, named: run.named }
  } finally {
    world.sweep()
  }
}

test("a seat that stopped has its page taken away with the files beside that page", async () => {
  const ran = await stopping([[]])
  expect(ran.said).toEqual({ kind: "took" })
  expect(ran.named).toEqual([TAKE_PAGE])
})

test("a path the index files no page at has its page alone taken away", async () => {
  const ran = await stopping([[UNFILED_SAID], []])
  expect(ran.said).toEqual({ kind: "took" })
  expect(ran.named).toEqual([TAKE_PAGE, TAKE_FILE])
})

test("a refusal that is not that one takes no page away and is answered as a refusal", async () => {
  const ran = await stopping([[HELD_LOCK], []])
  expect(ran.said).toEqual({ kind: "refused", said: HELD_LOCK })
  expect(ran.named).toEqual([TAKE_PAGE])
})

test("a page alone refused after that one refusal is answered as a refusal", async () => {
  const ran = await stopping([[UNFILED_SAID], [HELD_LOCK]])
  expect(ran.said).toEqual({ kind: "refused", said: HELD_LOCK })
  expect(ran.named).toEqual([TAKE_PAGE, TAKE_FILE])
})

test("a seat whose page is not there names no change", async () => {
  const ran = await stopping([[]], "nobody-sits-here")
  expect(ran.said).toEqual({ kind: "unchanged" })
  expect(ran.named).toEqual([])
})

test("the page alone is taken away after that one refusal and no other", () => {
  expect(unfiled([UNFILED_SAID])).toBe(true)
  expect(unfiled([UNFILED_SAID, HELD_LOCK])).toBe(false)
  expect(unfiled([HELD_LOCK])).toBe(false)
  expect(unfiled([])).toBe(false)
})
