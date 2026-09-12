import { expect, test } from "bun:test"
import {
  agentIdOf,
  pathIn,
  pathOf,
  pathsUnder,
  seatNamesIn,
  slugOf,
  underSeatNamed,
} from "akasha/seat-system/subagents/modules/page-naming/subagent-page-naming.module.code.ts"
import {
  filedAsSeat,
  inScratch,
  OWN,
  PERSONA_AT,
  SEAT_ID,
  seatsFiled,
  subagentsFiled,
} from "akasha/seat-system/subagents/modules/page-naming/subagent-page-naming.module.test-fixtures.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"

test("a slug joins the seat's name to the id the subagent runs under", () => {
  expect(slugOf("akasha", OWN)).toBe(`akasha-${OWN}`)
})

test("the mark between a seat's id and a subagent's own comes out as one hyphen", () => {
  expect(slugOf("akasha", `first--second`)).toBe("akasha-first-second")
})

test("a slug keeps the hyphens the seat's own name carries", () => {
  expect(slugOf("aine-two", OWN)).toBe(`aine-two-${OWN}`)
})

test("a seat named by nothing leaves the hyphen at the front of the slug", () => {
  expect(slugOf("", OWN)).toBe(`-${OWN}`)
  expect(agentIdOf("", OWN)).toBe(`--${OWN}`)
})

test("an agent id joins the seat's id to the id the subagent runs under", () => {
  expect(agentIdOf(SEAT_ID, OWN)).toBe(`${SEAT_ID}--${OWN}`)
})

test("an agent id keeps a mark a slug would collapse", () => {
  expect(agentIdOf("akasha", `first--second`)).toBe("akasha--first--second")
  expect(slugOf("akasha", `first--second`)).toBe("akasha-first-second")
})

test("a page sits in a folder of its own named for its slug", () => {
  expect(pathOf("akasha-abc")).toBe("seat-system/subagents/pages/akasha-abc/akasha-abc.subagent.ts")
})

test("a slug whose page is already flat keeps that page", () => {
  inScratch((root) => {
    writing(root, "seat-system/subagents/pages/akasha-abc.subagent.ts", "")
    expect(pathIn(root, "akasha-abc")).toBe("seat-system/subagents/pages/akasha-abc.subagent.ts")
    expect(pathIn(root, "akasha-xyz")).toBe(
      "seat-system/subagents/pages/akasha-xyz/akasha-xyz.subagent.ts"
    )
  })
})

test("a seat is named by every page the index files as a seat of its own", () => {
  inScratch((root) => {
    seatsFiled(root, ["aine", "aine-two"])
    filedAsSeat(root, "akasha", PERSONA_AT)
    expect([...seatNamesIn(root)].sort()).toEqual(["aine", "aine-two"])
  })
})

test("the pages under a seat are the pages the index files under that seat's name", () => {
  inScratch((root) => {
    const filed = subagentsFiled(root, [slugOf("akasha", OWN), slugOf("akasha", "second")])
    expect(pathsUnder(root, "akasha")).toEqual([...filed].sort())
  })
})

test("a seat whose name opens another seat's name takes no page of that other seat", () => {
  inScratch((root) => {
    seatsFiled(root, ["aine", "aine-two"])
    const filed = subagentsFiled(root, [slugOf("aine", OWN), slugOf("aine-two", OWN)])
    expect(pathsUnder(root, "aine")).toEqual([filed[0] ?? ""])
    expect(pathsUnder(root, "aine-two")).toEqual([filed[1] ?? ""])
  })
})

test("a page is under the longest seat name the index files that its slug opens with", () => {
  const names = ["aine", "aine-two"]
  expect(underSeatNamed(names, "aine", `aine-${OWN}`)).toBe(true)
  expect(underSeatNamed(names, "aine", `aine-two-${OWN}`)).toBe(false)
  expect(underSeatNamed(names, "aine-two", `aine-two-${OWN}`)).toBe(true)
})

test("a seat the index files no name for is under every slug that opens with its name", () => {
  expect(underSeatNamed([], "aine", `aine-two-${OWN}`)).toBe(true)
})

test("a seat named by nothing is under every slug that opens with a hyphen", () => {
  expect(underSeatNamed(["aine"], "", `-${OWN}`)).toBe(true)
  expect(underSeatNamed(["aine"], "", `aine-${OWN}`)).toBe(false)
})
