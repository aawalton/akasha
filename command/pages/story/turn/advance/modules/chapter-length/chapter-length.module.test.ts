import { afterAll, expect, test } from "bun:test"
import { rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  editingOf,
  lengthRefused,
  wordsIn,
} from "akasha/command/pages/story/turn/advance/modules/chapter-length/chapter-length.module.code.ts"
import { storyTurnAdvance } from "akasha/command/pages/story/turn/advance/story-turn-advance.command.code.ts"
import {
  advancedBy,
  beatsOf,
  CHAPTER_ARGV,
  CHAPTER_BEATS,
  chapterReach,
  GIVEN,
  LANDED,
  MASTER,
  ROOT,
  reachOver,
  seatOf,
  seen,
  turnAt,
  WRITER,
} from "akasha/command/pages/story/turn/advance/story-turn-advance.command.test-fixtures.ts"
import { beatEditor } from "akasha/story/chapter/step-status/pages/beat-editor.step-status.ts"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"
import { beatsWritten } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { heldAt } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.test-fixtures.ts"

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

function proseOf(words: number): string {
  return `${Array.from({ length: words }, () => "word").join(" ")}\n`
}

function beatsHanded(count: number) {
  return { kind: "beats", beats: beatsOf(count) } as const
}

function proseHanded(words: number) {
  return { kind: "prose", prose: proseOf(words), characters: [] } as const
}

test("words are counted between whitespace of any run", () => {
  expect(wordsIn("  Mara\topens\n\nthe   gate.\n")).toBe(4)
  expect(wordsIn("")).toBe(0)
})

test("a written chapter's beats from 50 to 100 are not refused", () => {
  expect(lengthRefused(beatsHanded(50), 0)).toBeNull()
  expect(lengthRefused(beatsHanded(100), 0)).toBeNull()
})

test("a written chapter's beats under 50 or over 100 are refused with the count and the range", () => {
  const few = lengthRefused(beatsHanded(49), 0) ?? ""
  expect(few).toContain("50 to 100")
  expect(few).toContain("these number 49")
  expect(few).toContain("the chapter before sets no length")
  expect(lengthRefused(beatsHanded(101), 0)).toContain("these number 101")
})

test("a beat restating the story's chapter break is refused, whatever its case or stops", () => {
  const ending = "A day at Hollowmere ends."
  const handed = { kind: "beats", beats: [...beatsOf(49), ending] } as const
  expect(lengthRefused(handed, 0, ending)).toContain("beat 50 restates")
  const said = { ...handed, beats: [...beatsOf(49), "and so a DAY at hollowmere ends"] }
  expect(lengthRefused(said, 0, ending)).toContain("beat 50 restates")
  expect(lengthRefused(beatsHanded(50), 0, ending)).toBeNull()
  expect(lengthRefused(handed, 0)).toBeNull()
})

test("prose from 50 to 200 words for each beat is not refused", () => {
  expect(lengthRefused(proseHanded(100), 2)).toBeNull()
  expect(lengthRefused(proseHanded(400), 2)).toBeNull()
})

test("prose outside 50 to 200 words for each beat is refused with words, beats and range", () => {
  const short = lengthRefused(proseHanded(99), 2) ?? ""
  expect(short).toContain("100 to 400 words for its 2 beats")
  expect(short).toContain("this prose runs 99 words")
  expect(short).toContain("the chapter before sets no length")
  expect(lengthRefused(proseHanded(401), 2)).toContain("this prose runs 401 words")
})

test("prose for a chapter stating no beats is of any length", () => {
  expect(lengthRefused(proseHanded(1), 0)).toBeNull()
})

test("another step's output is of any length", () => {
  expect(lengthRefused({ kind: "lore", lore: [] }, 0)).toBeNull()
})

test("a written chapter handed too few beats is refused and lands nothing", async () => {
  const into = seen()
  const argv = [...CHAPTER_ARGV, "--beats-file", join(ROOT, "beats.txt")]
  const answer = await storyTurnAdvance(argv, GIVEN, async () => LANDED, chapterReach(into))
  expect(answer.refusals.join(" ")).toContain("these number 2")
  expect(into.folded).toEqual([])
  expect(into.notices).toEqual([])
})

test("a written chapter handed 50 beats lands", async () => {
  const into = seen()
  const argv = [...CHAPTER_ARGV, "--beats-file", CHAPTER_BEATS]
  const reach = chapterReach(into)
  const answer = await storyTurnAdvance(
    argv,
    GIVEN,
    async () => LANDED,
    reach,
    () => undefined
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded.length).toBe(1)
})

test("a written chapter's writer handing prose too short for its beats is refused", async () => {
  const into = seen()
  const held = { beats: beatsOf(50), scenes: [], changes: [], memory: [] }
  const reach = {
    ...chapterReach(into, "writer", seatOf("writer", WRITER), { beats: "jsonl" }),
    textIn: () => beatsWritten(held),
  }
  const argv = [...CHAPTER_ARGV, "--prose-file", join(ROOT, "prose.txt"), "--title", "The Gate"]
  const answer = await storyTurnAdvance(argv, GIVEN, async () => LANDED, reach)
  expect(answer.refusals.join(" ")).toContain("2500 to 10000 words for its 50 beats")
  expect(into.folded).toEqual([])
})

function editing(status: "game-master" | "beat-editor" | "writer" | "prose-editor", words = 0) {
  return { status, words } as const
}

test("with editor steps a game master's first beats number 100 to 200", () => {
  expect(lengthRefused(beatsHanded(100), 0, null, editing("game-master"))).toBeNull()
  expect(lengthRefused(beatsHanded(200), 0, null, editing("game-master"))).toBeNull()
  const few = lengthRefused(beatsHanded(99), 0, null, editing("game-master")) ?? ""
  expect(few).toContain("100 to 200 where its story has editor steps")
  expect(lengthRefused(beatsHanded(201), 0, null, editing("game-master"))).toContain("number 201")
})

test("with editor steps a game master's mend runs to at most 100 beats, however few", () => {
  expect(lengthRefused(beatsHanded(3), 60, null, editing("game-master"))).toBeNull()
  expect(lengthRefused(beatsHanded(101), 60, null, editing("game-master"))).toContain("at most 100")
})

test("a beat editor cuts to at most half the beats it was handed, with no fewest", () => {
  expect(lengthRefused(beatsHanded(1), 151, null, editing("beat-editor"))).toBeNull()
  expect(lengthRefused(beatsHanded(75), 151, null, editing("beat-editor"))).toBeNull()
  const over = lengthRefused(beatsHanded(76), 151, null, editing("beat-editor")) ?? ""
  expect(over).toContain("from 151 to at most half, so at most 75, and this runs to 76")
  const ending = { kind: "beats", beats: ["A day ends."] } as const
  expect(lengthRefused(ending, 4, "A day ends.", editing("beat-editor"))).toContain("restates")
})

test("with editor steps a writer's prose runs 100 to 400 words for each beat", () => {
  expect(lengthRefused(proseHanded(200), 2, null, editing("writer"))).toBeNull()
  expect(lengthRefused(proseHanded(800), 2, null, editing("writer"))).toBeNull()
  const short = lengthRefused(proseHanded(199), 2, null, editing("writer")) ?? ""
  expect(short).toContain("100 to 400 words for each of its beats where its story has editor steps")
  expect(lengthRefused(proseHanded(801), 2, null, editing("writer"))).toContain("runs 801 words")
})

test("a prose editor cuts to at most half the writer's words, with no fewest", () => {
  expect(lengthRefused(proseHanded(1), 2, null, editing("prose-editor", 801))).toBeNull()
  expect(lengthRefused(proseHanded(400), 2, null, editing("prose-editor", 801))).toBeNull()
  const over = lengthRefused(proseHanded(401), 2, null, editing("prose-editor", 801)) ?? ""
  expect(over).toContain("from 801 to at most half, so at most 400, and this runs to 401")
})

test("editing is read only with editor steps, counting the writer's words at prose-editor", () => {
  const turn = { at: "x/x-0001.story-chapter-written.ts", value: { prose: "txt" } }
  const textOf = (path: string) => (path.endsWith(".prose.txt") ? "one two three\n" : "")
  expect(editingOf(heldAt("prose-editor"), turn, textOf)).toBeNull()
  const cutting = heldAt("prose-editor", { editorSteps: true })
  expect(editingOf(cutting, turn, textOf)).toEqual(editing("prose-editor", 3))
  const writing = heldAt("writer", { editorSteps: true })
  expect(editingOf(writing, turn, textOf)).toEqual(editing("writer"))
})

const EDITED_STORY = { title: "The Saga", master: MASTER, editorSteps: true }

function editedStory() {
  return EDITED_STORY
}

const HUNDRED = join(ROOT, "hundred-beats.txt")

writeFileSync(HUNDRED, `${beatsOf(100).join("\n")}\n`)

test("a chapter of a story with editor steps holds its game master to 100 beats or more", async () => {
  const into = seen()
  const reach = { ...chapterReach(into), storyOf: editedStory }
  const argv = [...CHAPTER_ARGV, "--beats-file", CHAPTER_BEATS]
  const answer = await storyTurnAdvance(argv, GIVEN, async () => LANDED, reach)
  expect(answer.refusals.join(" ")).toContain("100 to 200")
  expect(into.folded).toEqual([])
})

test("a chapter of a story with editor steps moves from its game master to its beat editor", async () => {
  const into = seen()
  const reach = { ...chapterReach(into), storyOf: editedStory }
  const argv = [...CHAPTER_ARGV, "--beats-file", HUNDRED]
  const answer = await storyTurnAdvance(
    argv,
    GIVEN,
    async () => LANDED,
    reach,
    () => undefined
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values?.["stepStatus"]).toBe(`${stepStatus.slug}/${beatEditor.slug}`)
})

test("a prose editor handing more than half the writer's words is refused", async () => {
  const into = seen()
  const held = { beats: beatsOf(2), scenes: [], changes: [], memory: [] }
  const seat = seatOf("prose-editor", "mari-prose-editor-the-saga")
  const reach = {
    ...chapterReach(into, "prose-editor", seat, { beats: "jsonl", prose: "txt" }),
    storyOf: editedStory,
    textIn: (_root: string, path: string) =>
      path.endsWith(".prose.txt") ? "one two three four five six\n" : beatsWritten(held),
  }
  const argv = [...CHAPTER_ARGV, "--prose-file", join(ROOT, "prose.txt"), "--title", "The Gate"]
  const answer = await storyTurnAdvance(argv, GIVEN, async () => LANDED, reach)
  expect(answer.refusals.join(" ")).toContain("from 6 to at most half, so at most 3")
  expect(into.folded).toEqual([])
})

test("a played turn's game master is not held to a chapter's length", async () => {
  const into = seen()
  const reach = reachOver(turnAt("game-master"), seatOf("game-master", MASTER), into)
  const answer = await advancedBy(["--beats-file", join(ROOT, "beats.txt")], reach)
  expect(answer.refusals).toEqual([])
  expect(into.folded.length).toBe(1)
})

const HUNDRED_FORTY_FIVE = join(ROOT, "hundred-forty-five-beats.txt")

writeFileSync(HUNDRED_FORTY_FIVE, `${beatsOf(145).join("\n")}\n`)

const TWO_HUNDRED_ONE = join(ROOT, "two-hundred-one-beats.txt")

writeFileSync(TWO_HUNDRED_ONE, `${beatsOf(201).join("\n")}\n`)

const HUNDRED_ONE = join(ROOT, "hundred-one-beats.txt")

writeFileSync(HUNDRED_ONE, `${beatsOf(101).join("\n")}\n`)

test("a chapter of a story with editor steps takes its game master's hundred and forty-five beats", async () => {
  const into = seen()
  const reach = { ...chapterReach(into), storyOf: editedStory }
  const argv = [...CHAPTER_ARGV, "--beats-file", HUNDRED_FORTY_FIVE]
  const answer = await storyTurnAdvance(
    argv,
    GIVEN,
    async () => LANDED,
    reach,
    () => undefined
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values?.["stepStatus"]).toBe(`${stepStatus.slug}/${beatEditor.slug}`)
})

test("a chapter of a story with editor steps is refused two hundred and one beats", async () => {
  const into = seen()
  const reach = { ...chapterReach(into), storyOf: editedStory }
  const argv = [...CHAPTER_ARGV, "--beats-file", TWO_HUNDRED_ONE]
  const answer = await storyTurnAdvance(
    argv,
    GIVEN,
    async () => LANDED,
    reach,
    () => undefined
  )
  expect(answer.refusals.join(" ")).toContain("at most 200")
  expect(into.folded).toEqual([])
})

test("a chapter of a story stating no editor steps takes a hundred beats and refuses a hundred and one", async () => {
  const into = seen()
  const answer = await storyTurnAdvance(
    [...CHAPTER_ARGV, "--beats-file", HUNDRED],
    GIVEN,
    async () => LANDED,
    chapterReach(into),
    () => undefined
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded.length).toBe(1)
  const over = seen()
  const refused = await storyTurnAdvance(
    [...CHAPTER_ARGV, "--beats-file", HUNDRED_ONE],
    GIVEN,
    async () => LANDED,
    chapterReach(over),
    () => undefined
  )
  expect(refused.refusals.join(" ")).toContain("at most 100")
  expect(over.folded).toEqual([])
})
