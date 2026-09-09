import { expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Asking } from "@akasha/changes/mechanical-change-running"
import type { Applied } from "../../../modules/applying/applying.module.code.ts"
import type { Given } from "../../../modules/calling/calling.module.code.ts"
import { refusingWith } from "../../../modules/calling/calling.module.test-fixtures.ts"
import type { Refused } from "../../../modules/landing/landing.module.code.ts"
import { rootOf } from "../../../modules/rooting/rooting.module.code.ts"
import { scratchWorld } from "../../../modules/scratching/scratching.module.code.ts"
import {
  ARTIST,
  type Landing,
  musicRate,
  SONG,
  saidOf,
  taken,
  valuesFor,
  WRITE,
} from "./music-rate.command.code.ts"

const scratch = scratchWorld()

const ROOT = rootOf(process.cwd())

const GIVEN: Given = { root: ROOT, calledAs: "akasha", from: ".", writer: null, agentId: null }

const RATED = "aurora"

const RATED_AT = `alan/music/catalog/artists/pages/${RATED}/${RATED}.artist.ts`

const REACTION_AT = `alan/music/catalog/artists/pages/${RATED}/${RATED}.artist.reaction.txt`

const REACTION = "she sings it plainly"

const LANDED: Applied = {
  base: "2222222222222222222222222222222222222222",
  landed: [RATED_AT, REACTION_AT],
  formatted: [],
  said: [],
  wrong: [],
  commit: "3333333333333333333333333333333333333333",
}

type Reached = { readonly asked: readonly Asking[]; readonly said: string }

type Reach = { readonly landing: Landing; readonly reached: Reached[] }

function reaching(answer: Applied | Refused = LANDED): Reach {
  const reached: Reached[] = []
  return {
    reached,
    landing: async (_root, asked, said) => {
      reached.push({ asked, said })
      return answer
    },
  }
}

function pathsIn(asked: readonly Asking[]): readonly string[] {
  return asked.map((one) => ("at" in one.given ? one.given.at : ""))
}

function ratingAurora(reach: Reach) {
  return musicRate(
    ["--target", ARTIST, "--slug", RATED, "--rating", "A", "--reaction", REACTION],
    GIVEN,
    reach.landing
  )
}

const refusalOf = refusingWith(taken)

function takingOf(argv: readonly string[]) {
  const held = taken(argv)
  if ("refused" in held) throw new Error(`\`${argv.join(" ")}\` was refused — ${held.refused}`)
  return held
}

test("a flag this takes nothing of is refused", () => {
  expect(refusalOf(["--id", "abc"])).toContain("`--id` is nothing this takes")
})

test("a target that is neither an artist nor a song is refused", () => {
  expect(refusalOf(["--target", "album", "--slug", "a", "--rating", "A"])).toContain("`album`")
})

test("a call naming no slug is refused", () => {
  expect(refusalOf(["--target", SONG, "--rating", "A"])).toContain("`--slug`")
})

test("a rating off the ladder is refused", () => {
  expect(refusalOf(["--target", SONG, "--slug", "a", "--rating", "A++"])).toContain("`A++`")
})

test("insights named for an artist are refused", () => {
  const said = refusalOf(["--target", ARTIST, "--slug", "a", "--insights", "x"])
  expect(said).toContain("`--insights`")
  expect(said).toContain(`--target ${SONG}`)
})

test("a reaction named for a song is refused", () => {
  const said = refusalOf(["--target", SONG, "--slug", "a", "--reaction", "x"])
  expect(said).toContain("`--reaction`")
  expect(said).toContain(`--target ${ARTIST}`)
})

test("a call recording nothing is refused", () => {
  expect(refusalOf(["--target", SONG, "--slug", "a"])).toContain("nothing is recorded")
})

test("a value and its file together are refused", () => {
  const said = refusalOf([
    "--target",
    SONG,
    "--slug",
    "a",
    "--insights",
    "x",
    "--insights-file",
    "y",
  ])
  expect(said).toContain("both are given")
})

test("a flag named twice is refused", () => {
  expect(refusalOf(["--target", SONG, "--target", ARTIST])).toContain("named twice")
})

test("a rating and prose are taken together", () => {
  const held = takingOf([
    "--target",
    SONG,
    "--slug",
    "mitski-nobody",
    "--rating",
    "S+",
    "--insights",
    "it turns at the bridge",
    "--json",
  ])
  expect(held.target).toBe(SONG)
  expect(held.slug).toBe("mitski-nobody")
  expect(held.rating).toBe("S+")
  expect(held.prose.get("insights")).toBe("it turns at the bridge")
  expect(held.json).toBe(true)
})

test("prose is read off the file its flag names", () => {
  const root = scratch.rootFor("music-rate-prose-")
  const at = join(root, "reaction.md")
  writeFileSync(at, "she sings it plainly\n")
  const held = takingOf(["--target", ARTIST, "--slug", "mitski", "--reaction-file", at])
  expect(held.prose.get("reaction")).toBe("she sings it plainly\n")
  expect(held.rating).toBe(null)
  scratch.sweep()
})

test("a file that is not there is refused", () => {
  const said = refusalOf(["--target", ARTIST, "--slug", "mitski", "--reaction-file", "/nowhere/x"])
  expect(said).toContain("could not be read as text")
})

test("the values carry the rating and mark the prose beside the page", () => {
  const held = takingOf([
    "--target",
    SONG,
    "--slug",
    "mitski-nobody",
    "--rating",
    "A",
    "--personal-connections",
    "the drive home",
  ])
  const values = valuesFor({ slug: "mitski-nobody", title: "Nobody" }, held)
  expect(values["title"]).toBe("Nobody")
  expect(values["rank"]).toBe("A")
  expect(values["personalConnections"]).toBe("txt")
})

test("what is recorded is said as a line or as JSON", () => {
  const held = takingOf(["--target", SONG, "--slug", "a", "--rating", "B"])
  expect(saidOf(held)).toBe(`Recorded ${SONG} a`)
  const asJson = takingOf(["--target", SONG, "--slug", "a", "--rating", "B", "--json"])
  expect(JSON.parse(saidOf(asJson))).toEqual({ target: SONG, slug: "a", rating: "B" })
})

test("the page and its prose are named to the landing at the change writing any path", async () => {
  const reach = reaching()
  const said = await ratingAurora(reach)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  const one = reach.reached[0]
  if (one === undefined) throw new Error("the landing was never reached")
  expect(reach.reached.length).toBe(1)
  expect(one.said).toBe(`record ${ARTIST} ${RATED}`)
  expect(one.asked.map((each) => each.at)).toEqual([WRITE, WRITE])
  expect(pathsIn(one.asked)).toEqual([RATED_AT, REACTION_AT])
})

test("the prose named to the landing is text rather than bytes", async () => {
  const reach = reaching()
  await ratingAurora(reach)
  const prose = reach.reached[0]?.asked[1]
  if (prose === undefined) throw new Error("no prose reached the landing")
  expect("body" in prose.given ? prose.given.body : null).toBe(REACTION)
})

test("what landed is reported under the line saying what was recorded", async () => {
  const said = await ratingAurora(reaching())
  expect(said.report[0]).toBe(`Recorded ${ARTIST} ${RATED}`)
  expect(said.report).toContain(`wrote ${RATED_AT}`)
})

test("a landing that refused is answered with the refusal and nothing recorded", async () => {
  const said = await ratingAurora(reaching({ refusals: ["another landing held the lock"] }))
  expect(said.code).toBe(3)
  expect(said.refusals).toEqual(["another landing held the lock"])
  expect(said.report).toEqual([])
})

test("a landing answering something wrong is answered as a refusal", async () => {
  const said = await ratingAurora(reaching({ ...LANDED, wrong: ["the install would not take"] }))
  expect(said.code).toBe(3)
  expect(said.refusals).toEqual(["the install would not take"])
})
