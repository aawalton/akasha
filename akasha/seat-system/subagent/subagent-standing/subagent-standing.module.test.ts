import { expect, test } from "bun:test"
import { join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { standing } from "../../../command-system/scratching/scratching.module.test-fixtures.ts"
import { indexNamed } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { bodyOf, pathOf, seatNamedIn, slugOf, wantedIn } from "./subagent-standing.module.code.ts"

const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

const OWN = "a38f63805f9b94edf"

function filed(root: string, id: string, path: string): undefined {
  standing(
    root,
    join(indexNamed(), "identity", "page", "id", `${id}.jsonl`),
    `${JSON.stringify({ path, id })}\n`
  )
}

test("a slug joins the seat's name to the id the subagent runs under", () => {
  expect(slugOf("akasha", OWN)).toBe(`akasha-${OWN}`)
})

test("the mark between a seat's id and a subagent's own comes out as one hyphen", () => {
  expect(slugOf("akasha", `first--second`)).toBe("akasha-first-second")
})

test("a page stands under the subagents folder named for its slug", () => {
  expect(pathOf("akasha-abc")).toBe("akasha/seat-system/subagent/subagents/akasha-abc.subagent.ts")
})

test("a body states the type and slug and seat and kind", () => {
  const body = bodyOf("akasha-abc", "akasha", "Explore")
  expect(body).toContain("export const akashaAbc = {")
  expect(body).toContain('pageTypeSlug: "subagent"')
  expect(body).toContain('slug: "akasha-abc"')
  expect(body).toContain('principalSeatName: "akasha"')
  expect(body).toContain('dispatchedAs: "Explore"')
})

test("a body states no id, leaving the command to mint one", () => {
  expect(bodyOf("akasha-abc", "akasha", "Explore")).not.toContain("id:")
})

test("a seat is named by the page the index carries for its id", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("subagent-standing-")
    filed(root, SEAT_ID, "akasha/seat-system/seat/seats/akasha.seat.ts")
    expect(seatNamedIn(root, SEAT_ID)).toBe("akasha")
  } finally {
    world.sweep()
  }
})

test("a seat the index carries no page for is named by nothing", () => {
  const world = scratchWorld()
  try {
    expect(seatNamedIn(world.rootFor("subagent-standing-"), SEAT_ID)).toBe(null)
  } finally {
    world.sweep()
  }
})

test("a page that is no seat names no seat", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("subagent-standing-")
    filed(root, SEAT_ID, "akasha/persona-system/persona/akasha/akasha.persona.ts")
    expect(seatNamedIn(root, SEAT_ID)).toBe(null)
  } finally {
    world.sweep()
  }
})

test("what a refusal names is what is read before it is asked again", () => {
  const said = [
    "akasha/one.ts — the record does not show you read this.",
    "  akasha read --file-path akasha/one.ts",
    "  akasha read --file-path akasha/two.ts --file-path akasha/one.ts",
  ].join("\n")
  expect(wantedIn(said)).toEqual(["akasha/one.ts", "akasha/two.ts"])
})
