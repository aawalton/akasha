import { expect, test } from "bun:test"
import {
  foldBeatsIntoFile,
  runChange,
} from "akasha/change/mechanical/page-type/move/fold-beats-into-file/fold-beats-into-file.change-mechanical-page-type.code.ts"
import { bodiesIn, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { worldOfType } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { beatsIn } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"

const TYPE = "story-chapter-written"

const BASE = "tales/chapters/one.story-chapter-written"

const ONE_AT = `${BASE}.ts`

const BEATS_AT = `${BASE}.beats.jsonl`

const CHANGES_AT = `${BASE}.beat-changes.jsonl`

const MEMORY_AT = `${BASE}.beat-memory.jsonl`

const CHANGE = {
  beat: 2,
  page: "metric-character/mara-xp",
  key: "value",
  from: 1,
  to: 2,
  note: "+1 XP",
}

const MEMORY = { beat: 1, page: "lore/mara", fact: "Mara is the heir", learns: "character/mara" }

const SCENE = { beat: 1, place: "place/attic", present: ["character/mara"] }

const PAGE = `import type { StoryChapterWritten } from "../story-chapter-written.page-type.ts"

export const one = {
  type: "page-type/${TYPE}",
  slug: "one",
  beats: ["Mara rises.", "She walks."],
  beatScenes: [{ beat: 1, place: "place/attic", present: ["character/mara"] }],
  beatChanges: "jsonl",
  beatMemory: "jsonl",
  position: 1,
} as const satisfies StoryChapterWritten
`

const BODIES = {
  [ONE_AT]: PAGE,
  [CHANGES_AT]: `${JSON.stringify(CHANGE)}\n`,
  [MEMORY_AT]: `${JSON.stringify(MEMORY)}\n`,
}

const FOLDING: Value = {
  slug: "one",
  beats: ["Mara rises.", "She walks."],
  beatScenes: [SCENE],
  beatChanges: "jsonl",
  beatMemory: "jsonl",
}

function worldFor(value: Value, bodies: Readonly<Record<string, string>> = BODIES): World {
  return worldOfType(TYPE, bodies, [], new Map([[ONE_AT, value]]), listing([]))
}

test("a folded page's beats go into one file beside it, one json record to a beat", () => {
  const world = worldFor(FOLDING)

  const said = foldBeatsIntoFile(world, { pageType: TYPE })

  expect(said.refused).toBeNull()
  const read = beatsIn(bodiesIn(said, world.base).get(BEATS_AT) ?? "")
  expect(read).toEqual({
    beats: ["Mara rises.", "She walks."],
    scenes: [SCENE],
    changes: [CHANGE],
    memory: [MEMORY],
  })
})

test("the page states `beats` as that file, and its other beat keys and files go", () => {
  const world = worldFor(FOLDING)

  const said = foldBeatsIntoFile(world, { pageType: TYPE })

  const bodies = bodiesIn(said, world.base)
  const page = bodies.get(ONE_AT) ?? ""
  expect(page).toContain(`slug: "one",\n  beats: "jsonl",\n  position: 1,`)
  expect(page).not.toContain("beatScenes")
  expect(page).not.toContain("beatChanges")
  expect(page).not.toContain("beatMemory")
  expect(bodies.get(CHANGES_AT)).toBeNull()
  expect(bodies.get(MEMORY_AT)).toBeNull()
})

test("a page holding none of those keys is passed over rather than refused", () => {
  const said = foldBeatsIntoFile(worldFor({ slug: "one" }), { pageType: TYPE })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a page with a beats file already and nothing left to fold is passed over", () => {
  const said = foldBeatsIntoFile(worldFor({ slug: "one", beats: "jsonl" }), { pageType: TYPE })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a page with a beats file already and a key left to fold is refused", () => {
  const value = { slug: "one", beats: "jsonl", beatChanges: "jsonl" }

  const said = foldBeatsIntoFile(worldFor(value), { pageType: TYPE })

  expect(said.refused ?? "").toContain(ONE_AT)
})

test("a changes file that will not read refuses the change, naming its page", () => {
  const bodies = { ...BODIES, [CHANGES_AT]: "not json\n" }

  const said = runChange(worldFor(FOLDING, bodies), { pageType: TYPE })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(ONE_AT)
})

const PICTURE = { cover: "image/image-a", coverAfter: "Later she walked", setting: "the hall" }

const PICTURED_PAGE = `export const one = {
  type: "page-type/${TYPE}",
  slug: "one",
  beats: "jsonl",
  prose: "txt",
  pictured: [${JSON.stringify(PICTURE)}],
  position: 1,
} as const
`

const PICTURED_BODIES = {
  [ONE_AT]: PICTURED_PAGE,
  [BEATS_AT]: `${JSON.stringify({ beat: 1, event: "Mara rises." })}\n${JSON.stringify({ beat: 2, event: "She walks." })}\n`,
  [`${BASE}.prose.txt`]: "Mara rose early and went down the long stairs.\n\nLater she walked.\n",
}

test("a page's pictures go onto the beats they show, found by their quote in the prose", () => {
  const value = { slug: "one", beats: "jsonl", prose: "txt", pictured: [PICTURE] }
  const world = worldFor(value, PICTURED_BODIES)

  const said = foldBeatsIntoFile(world, { pageType: TYPE })

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  const read = beatsIn(bodies.get(BEATS_AT) ?? "")
  expect("refused" in read ? [] : read.pictured).toEqual([{ beat: 2, ...PICTURE }])
  expect(bodies.get(ONE_AT) ?? "").not.toContain("pictured")
})

test("a count handed in bounds how many pages are folded", () => {
  const said = foldBeatsIntoFile(worldFor(FOLDING), { pageType: TYPE, atMost: 0 })

  expect(said.edits).toEqual([])
})
