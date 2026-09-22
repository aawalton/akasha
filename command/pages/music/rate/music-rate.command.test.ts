import { expect, test } from "bun:test"
import { EXIT } from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import {
  OPERATIONAL,
  partWay,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import {
  PLAYED,
  TRACK_SLUG,
} from "akasha/command/pages/music/rate/modules/track-naming/track-naming.module.test-fixtures.ts"
import {
  ARTIST,
  musicRate,
  RELEASE,
  SONG,
  saidOf,
  TRACK,
  valuesFor,
  WRITE,
} from "akasha/command/pages/music/rate/music-rate.command.code.ts"
import {
  bodyAt,
  GIVEN,
  gradingAurora,
  gradingMitski,
  gradingRelease,
  gradingThrowing,
  gradingTrack,
  INSIGHT,
  LANDED,
  PLAYER,
  pathsIn,
  proseFileAt,
  RATED,
  RATED_AT,
  REACTION,
  REACTION_AT,
  REACTION_FILED,
  RELEASE_AT,
  RELEASE_SLUG,
  reaching,
  refusalOf,
  refusalsOf,
  SAYING_OF_SONG,
  SAYING_TWICE,
  SILENT,
  SONG_SLUG,
  scratch,
  TAGGING_SONG,
  TRACK_AT,
  takingOf,
} from "akasha/command/pages/music/rate/music-rate.command.test-fixtures.ts"

test("every refusal a call earns arrives on its own line rather than joined into one", () => {
  expect(
    refusalsOf(["--slug", "a", "--now-playing", "--reaction", "x", "--reaction-file", "y"])
  ).toEqual([
    "`--slug` and `--now-playing` are never said together, and this call says both",
    "`--reaction` and `--reaction-file` are never said together, and this call says both",
  ])
})

test("a slug with no target is refused, because nothing says which sort of page it names", () => {
  const said = refusalOf(["--slug", "a", "--grade", "A"])
  expect(said).toContain("`--target`")
  expect(said).toContain("`--slug`")
})

test("a flag this takes nothing of is refused", () => {
  expect(refusalOf(["--id", "abc"])).toContain("`--id` is no argument")
})

test("a target that is no sort of music page is refused", () => {
  const said = refusalOf(["--target", "album", "--slug", "a", "--grade", "A"])
  expect(said).toContain("`album`")
  expect(said).toContain(`\`${TRACK}\``)
  expect(said).toContain(`\`${RELEASE}\``)
})

test("a release named by its slug is written the way a track named by its slug is", async () => {
  const reach = reaching({ ...LANDED, landed: [RELEASE_AT] })
  const said = await gradingRelease(reach)
  expect(said.refusals).toEqual([])
  const one = reach.reached[0]
  if (one === undefined) throw new Error("the landing was never reached")
  expect(one.said).toBe(`record ${RELEASE} ${RELEASE_SLUG}`)
  expect(pathsIn(one.asked)).toEqual([RELEASE_AT])
  const written = one.asked[0]?.given
  expect(written !== undefined && "body" in written ? written.body : "").toContain('grade: "C"')
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
  const was = { slug: SONG_SLUG, tags: ["attraction", "night"] }
  const values = valuesFor(was, takingOf(TAGGING_SONG))
  expect(values["tags"]).toEqual(["attraction", "night", "longing"])
})

test("a page carrying no tag takes the tags the call names", () => {
  const held = takingOf(["--target", SONG, "--slug", "mitski-nobody", "--tag", "longing"])
  expect(valuesFor({ slug: "mitski-nobody" }, held)["tags"]).toEqual(["longing"])
})

test("a call naming no tag leaves the tags carried as they are", () => {
  const held = takingOf(["--target", TRACK, "--slug", TRACK_SLUG, "--grade", "A"])
  const values = valuesFor({ slug: TRACK_SLUG, tags: ["attraction"] }, held)
  expect(values["tags"]).toEqual(["attraction"])
})

test("the values carry the grade Alan gives the recording he heard", () => {
  const held = takingOf(["--target", TRACK, "--slug", TRACK_SLUG, "--grade", "S"])
  expect(held.target).toBe(TRACK)
  expect(valuesFor({ slug: TRACK_SLUG }, held)["grade"]).toBe("S")
})

test("a track named by its slug is written the way a release named by its slug is", async () => {
  const reach = reaching({ ...LANDED, landed: [TRACK_AT] })
  const said = await gradingTrack(reach)
  expect(said.refusals).toEqual([])
  const one = reach.reached[0]
  if (one === undefined) throw new Error("the landing was never reached")
  expect(pathsIn(one.asked)).toEqual([TRACK_AT])
  const written = one.asked[0]?.given
  expect(written !== undefined && "body" in written ? written.body : "").toContain('grade: "S"')
})

test("a call naming no slug is refused", () => {
  const said = refusalOf(["--target", SONG, "--grade", "A"])
  expect(said).toContain("`--slug`")
  expect(said).toContain("`--now-playing`")
})

test("a call saying what is playing names a track and no slug", () => {
  const held = takingOf(["--now-playing", "--grade", "A+", "--tag", "attraction"])
  expect(held.target).toBe(TRACK)
  expect(held.slug).toBe(null)
  expect(held.grade).toBe("A+")
  expect(held.tags).toEqual(["attraction"])
})

test("a target said beside what is playing is refused", () => {
  const said = refusalOf(["--now-playing", "--target", TRACK, "--grade", "A"])
  expect(said).toContain("never said together")
})

test("prose said beside what is playing is refused", () => {
  const said = refusalOf(["--now-playing", "--insights", "x"])
  expect(said).toContain("`--insights`")
})

test("one call grades what is playing without naming any page", async () => {
  const reach = reaching({ ...LANDED, landed: [TRACK_AT] })
  const said = await musicRate(
    ["--now-playing", "--grade", "S+", "--tag", "attraction", "--json"],
    GIVEN,
    reach.landing,
    PLAYER
  )
  expect(said.refusals).toEqual([])
  expect(JSON.parse(said.report[0] ?? "")).toEqual({
    target: TRACK,
    slug: TRACK_SLUG,
    grade: "S+",
  })
  const one = reach.reached[0]
  if (one === undefined) throw new Error("the landing was never reached")
  expect(pathsIn(one.asked)).toEqual([TRACK_AT])
  const written = one.asked[0]?.given
  const body = written !== undefined && "body" in written ? written.body : ""
  expect(body).toContain('grade: "S+"')
  expect(body).toContain('tags: ["attraction"]')
})

test("a call saying the track played last names a track and no slug", () => {
  const held = takingOf(["--just-played", "--grade", "A", "--tag", "attraction"])
  expect(held.target).toBe(TRACK)
  expect(held.slug).toBe(null)
  expect(held.justPlayed).toBe(true)
  expect(held.tags).toEqual(["attraction"])
})

test("the track played last is never said beside a slug or beside what is playing", () => {
  expect(refusalOf(["--just-played", "--slug", "a", "--grade", "A"])).toContain(
    "never said together"
  )
  expect(refusalOf(["--just-played", "--now-playing", "--grade", "A"])).toContain(
    "never said together"
  )
})

test("one call grades the track played last over a silent player", async () => {
  const reach = reaching({ ...LANDED, landed: [TRACK_AT] })
  const said = await musicRate(
    ["--just-played", "--grade", "S", "--tag", "attraction", "--json"],
    GIVEN,
    reach.landing,
    SILENT,
    PLAYED
  )
  expect(said.refusals).toEqual([])
  expect(JSON.parse(said.report[0] ?? "")).toEqual({ target: TRACK, slug: TRACK_SLUG, grade: "S" })
  const one = reach.reached[0]
  if (one === undefined) throw new Error("the landing was never reached")
  expect(pathsIn(one.asked)).toEqual([TRACK_AT])
  const written = one.asked[0]?.given
  const body = written !== undefined && "body" in written ? written.body : ""
  expect(body).toContain('grade: "S"')
  expect(body).toContain('tags: ["attraction"]')
})

test("a call over a silent player refuses and reaches no landing", async () => {
  const reach = reaching()
  const said = await musicRate(["--now-playing", "--grade", "A"], GIVEN, reach.landing, SILENT)
  expect(said.refusals[0]).toContain("no Spotify device is active")
  expect(reach.reached).toEqual([])
})

test("a grade off the ladder is refused", () => {
  expect(refusalOf(["--target", TRACK, "--slug", "a", "--grade", "A++"])).toContain("`A++`")
})

test("a grade named for a song is refused", () => {
  const said = refusalOf(["--target", SONG, "--slug", SONG_SLUG, "--grade", "A"])
  expect(said).toContain("`--grade`")
  expect(said).toContain(`\`--target ${TRACK}\``)
  expect(said).toContain(`rather than the ${SONG}`)
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

test("a song call recording nothing names the tag and the song's prose", () => {
  expect(refusalOf(["--target", SONG, "--slug", "a"])).toBe(
    "nothing is recorded by this call — name `--tag` or `--personal-connections` or `--insights`"
  )
})

test("a value and its file together are refused", () => {
  expect(refusalOf(SAYING_TWICE)).toContain("never said together")
})

test("a flag named twice is refused", () => {
  expect(refusalOf(["--target", SONG, "--target", ARTIST])).toContain("is said twice")
})

test("a grade and prose are taken together", () => {
  const held = takingOf([...gradingMitski("S+"), "--json"])
  expect(held.target).toBe(ARTIST)
  expect(held.slug).toBe("mitski")
  expect(held.grade).toBe("S+")
  expect(held.prose.get("reaction")).toBe(REACTION)
  expect(held.json).toBe(true)
})

test("prose is read off the file its flag names", () => {
  const at = proseFileAt()
  const held = takingOf(["--target", ARTIST, "--slug", "mitski", "--reaction-file", at])
  expect(held.prose.get("reaction")).toBe(REACTION_FILED)
  expect(held.grade).toBe(null)
  scratch.sweep()
})

test("a file that is not there is refused", () => {
  const said = refusalOf(["--target", ARTIST, "--slug", "mitski", "--reaction-file", "/nowhere/x"])
  expect(said).toContain("would not open")
})

test("the values carry the grade and mark the prose beside the page", () => {
  const held = takingOf(gradingMitski("A"))
  const values = valuesFor({ slug: "mitski", title: "Mitski" }, held)
  expect(values["title"]).toBe("Mitski")
  expect(values["grade"]).toBe("A")
  expect(values["reaction"]).toBe("txt")
})

test("a song takes the prose Alan says of the piece and carries no grade", () => {
  const held = takingOf(SAYING_OF_SONG)
  expect(held.grade).toBe(null)
  expect(held.prose.get("insights")).toBe(INSIGHT)
  const values = valuesFor({ slug: SONG_SLUG }, held)
  expect(values["personalConnections"]).toBe("txt")
  expect(values["grade"]).toBe(undefined)
})

test("what is recorded is said as a line or as JSON", () => {
  const held = takingOf(["--target", TRACK, "--slug", "a", "--grade", "B"])
  expect(saidOf(held, "a")).toBe(`Recorded ${TRACK} a`)
  const asJson = takingOf(["--target", TRACK, "--slug", "a", "--grade", "B", "--json"])
  expect(JSON.parse(saidOf(asJson, "a"))).toEqual({ target: TRACK, slug: "a", grade: "B" })
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

  expect(page.given).toMatchObject({ old: bodyAt(RATED_AT) })
})

test("the prose beside the page hands in no body it was composed against", async () => {
  const reach = reaching()
  await gradingAurora(reach)
  const prose = reach.reached[0]?.asked[1]
  if (prose === undefined) throw new Error("no prose reached the landing")

  expect(prose.given).not.toHaveProperty("old")
})
