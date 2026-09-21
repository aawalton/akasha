import { expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { EXIT } from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import type {
  Asking,
  Landing,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { throwingAfter } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.test-fixtures.ts"
import {
  OPERATIONAL,
  partWay,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Applied } from "akasha/command/modules/applying/applying.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { refusingWith } from "akasha/command/modules/calling/calling.module.test-fixtures.ts"
import type { Refused } from "akasha/command/modules/landing/landing.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  ARTIST,
  musicRate,
  SONG,
  saidOf,
  TRACK,
  taken,
  valuesFor,
  WRITE,
} from "akasha/command/pages/music/rate/music-rate.command.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

const ROOT = rootOf(process.cwd())

const GIVEN: Given = { root: ROOT, calledAs: "akasha", from: ".", writer: null, agentId: null }

const RATED = "aurora"

const RATED_AT = `alan/music/catalog/artist/pages/${RATED}/${RATED}.artist.ts`

const REACTION_AT = `alan/music/catalog/artist/pages/${RATED}/${RATED}.artist.reaction.txt`

const REACTION = "she sings it plainly"

const TRACK_SLUG = "alexandria-always-an-angel-always-an-angel"

const TRACK_AT = `alan/music/catalog/track/pages/${TRACK_SLUG}.track.ts`

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

function gradingAurora(reach: Reach) {
  return musicRate(
    ["--target", ARTIST, "--slug", RATED, "--grade", "A", "--reaction", REACTION],
    GIVEN,
    reach.landing
  )
}

const refusalsOf = refusingWith((argv: readonly string[]) => taken(argv, GIVEN))

function refusalOf(argv: readonly string[]): string {
  return refusalsOf(argv).join("\n")
}

function takingOf(argv: readonly string[]) {
  const held = taken(argv, GIVEN)
  if ("refused" in held) {
    throw new Error(`\`${argv.join(" ")}\` was refused — ${held.refused.join("; ")}`)
  }
  return held
}

test("every refusal a call earns arrives on its own line rather than joined into one", () => {
  expect(refusalsOf(["--slug", "a", "--reaction", "x", "--reaction-file", "y"])).toEqual([
    "`akasha` takes `--target`, and nothing said it",
    "`--reaction` and `--reaction-file` are never said together, and this call says both",
  ])
})

test("a flag this takes nothing of is refused", () => {
  expect(refusalOf(["--id", "abc"])).toContain("`--id` is no argument")
})

test("a target that is no artist, no song and no track is refused", () => {
  const said = refusalOf(["--target", "album", "--slug", "a", "--grade", "A"])
  expect(said).toContain("`album`")
  expect(said).toContain(`\`${TRACK}\``)
})

test("prose named for a track is refused, because a track carries none", () => {
  const said = refusalOf(["--target", TRACK, "--slug", "a", "--insights", "x"])
  expect(said).toContain("`--insights`")
  expect(said).toContain(`--target ${SONG}`)
})

test("a track call recording nothing names the grade and the tag and no prose", () => {
  expect(refusalOf(["--target", TRACK, "--slug", "a"])).toBe(
    "nothing is recorded by this call — name `--grade` or `--tag`"
  )
})

test("a call naming a tag and no grade records something", () => {
  const held = takingOf(["--target", TRACK, "--slug", TRACK_SLUG, "--tag", "attraction"])
  expect(held.grade).toBe(null)
  expect(held.tags).toEqual(["attraction"])
})

test("a tag is added to the tags already carried rather than written over them", () => {
  const held = takingOf([
    "--target",
    SONG,
    "--slug",
    "mitski-nobody",
    "--tag",
    "longing",
    "--tag",
    "attraction",
  ])
  const values = valuesFor({ slug: "mitski-nobody", tags: ["attraction", "night"] }, held)
  expect(values["tags"]).toEqual(["attraction", "night", "longing"])
})

test("a page carrying no tag takes the tags the call names", () => {
  const held = takingOf(["--target", SONG, "--slug", "mitski-nobody", "--tag", "longing"])
  expect(valuesFor({ slug: "mitski-nobody" }, held)["tags"]).toEqual(["longing"])
})

test("a call naming no tag leaves the tags carried as they are", () => {
  const held = takingOf(["--target", SONG, "--slug", "mitski-nobody", "--grade", "A"])
  const values = valuesFor({ slug: "mitski-nobody", tags: ["attraction"] }, held)
  expect(values["tags"]).toEqual(["attraction"])
})

test("the values carry a track's grade under the name a song carries it under", () => {
  const held = takingOf(["--target", TRACK, "--slug", TRACK_SLUG, "--grade", "S"])
  expect(held.target).toBe(TRACK)
  expect(valuesFor({ slug: TRACK_SLUG }, held)["rank"]).toBe("S")
})

test("a track named by its slug is written the way a song named by its slug is", async () => {
  const reach = reaching({ ...LANDED, landed: [TRACK_AT] })
  const said = await musicRate(
    ["--target", TRACK, "--slug", TRACK_SLUG, "--grade", "S"],
    GIVEN,
    reach.landing
  )
  expect(said.refusals).toEqual([])
  const one = reach.reached[0]
  if (one === undefined) throw new Error("the landing was never reached")
  expect(pathsIn(one.asked)).toEqual([TRACK_AT])
  const written = one.asked[0]?.given
  expect(written !== undefined && "body" in written ? written.body : "").toContain('rank: "S"')
})

test("a call naming no slug is refused", () => {
  expect(refusalOf(["--target", SONG, "--grade", "A"])).toContain("`--slug`")
})

test("a grade off the ladder is refused", () => {
  expect(refusalOf(["--target", SONG, "--slug", "a", "--grade", "A++"])).toContain("`A++`")
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
  expect(said).toContain("never said together")
})

test("a flag named twice is refused", () => {
  expect(refusalOf(["--target", SONG, "--target", ARTIST])).toContain("is said twice")
})

test("a grade and prose are taken together", () => {
  const held = takingOf([
    "--target",
    SONG,
    "--slug",
    "mitski-nobody",
    "--grade",
    "S+",
    "--insights",
    "it turns at the bridge",
    "--json",
  ])
  expect(held.target).toBe(SONG)
  expect(held.slug).toBe("mitski-nobody")
  expect(held.grade).toBe("S+")
  expect(held.prose.get("insights")).toBe("it turns at the bridge")
  expect(held.json).toBe(true)
})

test("prose is read off the file its flag names", () => {
  const root = scratch.rootFor("music-rate-prose-")
  const at = join(root, "reaction.md")
  writeFileSync(at, "she sings it plainly\n")
  const held = takingOf(["--target", ARTIST, "--slug", "mitski", "--reaction-file", at])
  expect(held.prose.get("reaction")).toBe("she sings it plainly\n")
  expect(held.grade).toBe(null)
  scratch.sweep()
})

test("a file that is not there is refused", () => {
  const said = refusalOf(["--target", ARTIST, "--slug", "mitski", "--reaction-file", "/nowhere/x"])
  expect(said).toContain("would not open")
})

test("the values carry the grade and mark the prose beside the page", () => {
  const held = takingOf([
    "--target",
    SONG,
    "--slug",
    "mitski-nobody",
    "--grade",
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
  const held = takingOf(["--target", SONG, "--slug", "a", "--grade", "B"])
  expect(saidOf(held)).toBe(`Recorded ${SONG} a`)
  const asJson = takingOf(["--target", SONG, "--slug", "a", "--grade", "B", "--json"])
  expect(JSON.parse(saidOf(asJson))).toEqual({ target: SONG, slug: "a", grade: "B" })
})

test("the page and its prose are named to the landing at the change writing any path", async () => {
  const reach = reaching()
  const said = await gradingAurora(reach)
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
  await gradingAurora(reach)
  const prose = reach.reached[0]?.asked[1]
  if (prose === undefined) throw new Error("no prose reached the landing")
  expect("body" in prose.given ? prose.given.body : null).toBe(REACTION)
})

test("what landed is reported under the line saying what was recorded", async () => {
  const said = await gradingAurora(reaching())
  expect(said.report[0]).toBe(`Recorded ${ARTIST} ${RATED}`)
  expect(said.report).toContain(`wrote ${RATED_AT}`)
})

test("a landing that refused is answered with the refusal and nothing recorded", async () => {
  const refused = { refusals: ["another landing held the lock"], code: EXIT.OPERATIONAL }
  const said = await gradingAurora(reaching(refused))
  expect(said.code).toBe(3)
  expect(said.refusals).toEqual(["another landing held the lock"])
  expect(said.report).toEqual([])
})

test("a landing answering something wrong is answered as a refusal", async () => {
  const said = await gradingAurora(reaching({ ...LANDED, wrong: ["the install would not take"] }))
  expect(said.code).toBe(3)
  expect(said.refusals).toEqual(["the install would not take"])
})

const GAVE_OUT = new Error("the grade landed and the push gave out")

function gradingThrowing(wrote: readonly string[]) {
  return musicRate(
    ["--target", ARTIST, "--slug", RATED, "--grade", "A", "--reaction", REACTION],
    GIVEN,
    throwingAfter(wrote, GAVE_OUT)
  )
}

test("a run that landed the grade and then threw names that commit", async () => {
  const said = await gradingThrowing(["abc123"])

  expect(said.report).toEqual(["abc123"])
  expect(said.refusals.at(-1)).toBe(partWay(["abc123"])[0])
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw with nothing recorded says why it threw and no more", async () => {
  const said = await gradingThrowing([])

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the push gave out")
  expect(said.refusals.at(-1)).not.toContain("stopped part way")
})

test("a run that wrote the page and the prose names both in the order written", async () => {
  const wrote = [`wrote ${RATED_AT}`, `wrote ${REACTION_AT}`]
  const said = await gradingThrowing(wrote)

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(partWay(wrote)[0])
})

test("the page written again hands in the body it was composed against", async () => {
  const reach = reaching()
  await gradingAurora(reach)
  const page = reach.reached[0]?.asked[0]
  if (page === undefined) throw new Error("no page reached the landing")

  expect(page.given).toMatchObject({ old: readFileSync(join(ROOT, RATED_AT), "utf8") })
})

test("the prose beside the page hands in no body it was composed against", async () => {
  const reach = reaching()
  await gradingAurora(reach)
  const prose = reach.reached[0]?.asked[1]
  if (prose === undefined) throw new Error("no prose reached the landing")

  expect(prose.given).not.toHaveProperty("old")
})
