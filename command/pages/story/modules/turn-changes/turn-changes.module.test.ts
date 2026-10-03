import { expect, test } from "bun:test"
import { appendLines } from "akasha/change/mechanical/file-content/append-lines/append-lines.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  beatsBodyOf,
  bodiesOf,
  cacheNamed,
  changesChecked,
  clearedOf,
  placedAmong,
} from "akasha/command/pages/story/modules/turn-changes/turn-changes.module.code.ts"
import { beatsHeld } from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import type { Reading } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import { beatsWritten } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { worldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.ts"
import { advanced } from "akasha/story/world/stories/played/turns/modules/turn-advancing/turn-advancing.module.code.ts"
import type {
  Held,
  Moved,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const XP = "metric-character/elsie-xp"

const PURSE = "metric-character-currency/elsie-silver"

const GAIN = { beat: 1, page: XP, key: "value", from: 120, to: 160, note: "Elsie gains 40 XP" }

const READING: Reading = {
  exists: (page) => page === XP,
  valueOf: (page, key) => (page === XP && key === "value" ? 120 : undefined),
  filed: () => null,
}

const HISTORY_AT = "stories/saga/mechanics/elsie-silver.metric-character-currency.history.jsonl"

const FILED: Reading = {
  exists: (page) => page === PURSE,
  valueOf: (page, key) => (page === PURSE && key === "value" ? 134 : undefined),
  filed: (page, key) =>
    key !== "history"
      ? null
      : {
          propertySlug: "history",
          ending: "jsonl",
          stated: false,
          at: page === PURSE ? HISTORY_AT : null,
        },
}

const LOGGED = {
  beat: 22,
  page: PURSE,
  key: "history",
  append: { turn: 1, value: 114 },
  note: "Purse logged",
}

const TURN = {
  at: "stories/saga/turns/saga-00-002.story-turn-played.ts",
  slug: "saga-00-002",
  value: { beats: "jsonl" },
}

const PLANNED = { beats: ["Elsie trains.", "Elsie rests."], scenes: [], changes: [], memory: [] }

const LEARNS = { beat: 2, page: "lore/elsie", fact: "Elsie is tired", learns: "character/elsie" }

function movedOf(more: Partial<Moved>): Moved {
  return {
    status: "mechanics",
    values: {},
    prose: null,
    planned: null,
    changes: null,
    memory: null,
    starts: [],
    stopsCaller: false,
    landsKept: false,
    ...more,
  }
}

function heldAt(status: Held["status"], more: Partial<Held> = {}): Held {
  return {
    game: "saga",
    status,
    lore: [],
    issues: [],
    reviewedBy: [],
    recordedBy: [],
    written: false,
    ...more,
  }
}

test("a turn's beats are read from the one file beside it, and a turn naming none holds none", () => {
  const read: string[] = []
  const held = { ...PLANNED, changes: [GAIN] }
  const textOf = (path: string) => {
    read.push(path)
    return beatsWritten(held)
  }
  expect(beatsHeld(TURN, textOf)).toEqual(held)
  expect(read).toEqual(["stories/saga/turns/saga-00-002.story-turn-played.beats.jsonl"])
  expect(beatsHeld({ ...TURN, value: {} }, textOf)).toEqual({ ...PLANNED, beats: [] })
  expect("refused" in beatsHeld(TURN, () => "not json\n")).toBe(true)
})

test("each step replaces only its own part of the beats, and the game master starts them again", () => {
  const held = { ...PLANNED, changes: [GAIN] }
  const remembered = beatsBodyOf(held, movedOf({ memory: [LEARNS] }))
  expect(remembered).toBe(beatsWritten({ ...held, memory: [LEARNS] }))
  const planned = { beats: ["Elsie sleeps."], scenes: [] }
  expect(beatsBodyOf(held, movedOf({ planned }))).toBe(beatsWritten({ ...PLANNED, ...planned }))
  expect(beatsBodyOf(held, movedOf({}))).toBeNull()
})

test("a picture recorder's pictures land on their beats and later moves keep them", () => {
  const shown = { beat: 1, cover: "image/image-a", coverAfter: "Elsie trains", setting: "the yard" }
  const pictured = beatsBodyOf(PLANNED, movedOf({ pictured: [shown] }))
  expect(pictured).toBe(beatsWritten({ ...PLANNED, pictured: [shown] }))
  const kept = beatsBodyOf({ ...PLANNED, pictured: [shown] }, movedOf({ memory: [LEARNS] }))
  expect(kept).toBe(beatsWritten({ ...PLANNED, memory: [LEARNS], pictured: [shown] }))
})

test("a move's issue lists are written as files beside the turn, one issue to a line", () => {
  const said = movedOf({ issues: ["beat 1: a fault"], mechanicsIssues: ["beat 2: no coin"] })
  expect(bodiesOf(said, PLANNED)).toEqual({
    bodies: { issues: "beat 1: a fault\n", mechanicsIssues: "beat 2: no coin\n" },
  })
  expect(bodiesOf(movedOf({}), PLANNED)).toEqual({})
})

const MASTER = { role: "game-master", game: "saga" }

const ADMITTED = { types: [], filed: () => false }

test("a game master's first run on a chapter holding no mechanics issues clears them rather than handing over undefined", () => {
  const held = heldAt("game-master", { noun: "chapter", written: true })
  const handed = { kind: "beats", beats: ["Elsie trains."] } as const
  const said = advanced(held, MASTER, handed, [], ["mechanics"], [], ADMITTED, ["mechanics"])
  if ("refused" in said) throw new Error(said.refused)
  const cleared = clearedOf({ ...said.values, title: "The Gate" }, said)
  expect(cleared.clears).toEqual(["recordedBy", "mechanicsIssues"])
  expect(Object.keys(cleared.values)).toEqual(["stepStatus", "beats", "ownLength", "title"])
  expect(clearedOf({ title: "The Gate" }, movedOf({}))).toEqual({ values: { title: "The Gate" } })
})

test("a mechanics seat's changes are checked with the changes the turn holds already", () => {
  const held = heldAt("mechanics", { changes: [GAIN] })
  const again = { ...GAIN, beat: 2, note: "Elsie gains 40 XP again" }
  const handed = { kind: "record", recorder: "inventory", changes: [again] } as const
  expect(changesChecked(READING, held, handed)).toContain("was 120, and it is 160")
  const fixed = { ...handed, changes: [{ ...again, from: 160, to: 200 }] }
  expect(changesChecked(READING, held, fixed)).toBeNull()
  expect(changesChecked(READING, heldAt("recorders"), handed)).toBeNull()
})

test("the move to player names each page the changes leave, making a page filed new", () => {
  const made = { beat: 1, page: PURSE, make: { value: 5 }, note: "Elsie opens a purse" }
  const held = heldAt("recorders", { changes: [GAIN, made] })
  expect(cacheNamed(READING, held, "player")).toEqual({
    namings: [
      { pageTypeSlug: "metric-character", slug: "elsie-xp", merge: true, values: { value: 160 } },
      {
        pageTypeSlug: "metric-character-currency",
        slug: "elsie-silver",
        merge: false,
        values: { value: 5 },
      },
    ],
    appends: [],
  })
  expect(cacheNamed(READING, held, "recorders")).toEqual({ namings: [], appends: [] })
})

test("a change appending to a key held in a file beside its page appends a line to that file", () => {
  const spent = { beat: 22, page: PURSE, key: "value", from: 134, to: 114, note: "Elsie pays" }
  const held = heldAt("recorders", { changes: [spent, LOGGED] })
  expect(cacheNamed(FILED, held, "player")).toEqual({
    namings: [
      {
        pageTypeSlug: "metric-character-currency",
        slug: "elsie-silver",
        merge: true,
        values: { value: 114, history: "jsonl" },
      },
    ],
    appends: [
      {
        at: `${changeMechanicalFileContent.slug}/${appendLines.slug}`,
        given: { at: HISTORY_AT, content: '{"turn":1,"value":114}\n' },
      },
    ],
  })
  const handed = { kind: "record", recorder: "mechanics", changes: [LOGGED] } as const
  expect(changesChecked(FILED, heldAt("mechanics"), handed)).toBeNull()
  const set = { beat: 22, page: PURSE, key: "history", from: null, to: [], note: "Purse set" }
  const setting = { ...handed, changes: [set] }
  expect(changesChecked(FILED, heldAt("mechanics"), setting)).toContain("appends a line")
})

const FAIRWEATHER = "story/world/pages/fairweather/stories/written/fairweather"

const OTHERWHERE = "story/world/pages/god-of-trash/stories/played/otherwhere-vii"

const STORIES = [FAIRWEATHER, OTHERWHERE]

const BOND = worldRelationship.slug

test("a page a change makes sits where pages of its kind sit under the story, never the generic folder", () => {
  const bond = `${BOND}/fairweather-elsie-tamsin`
  const elsewhere = [
    `${OTHERWHERE}/mechanics/relationships/otherwhere-vii-ennis.world-relationship.ts`,
    `${OTHERWHERE}/mechanics/relationships/otherwhere-vii-hild.world-relationship.ts`,
    "story/world/mechanics/relationships/pages/stray/stray.world-relationship.ts",
  ]
  expect(placedAmong(bond, elsewhere, STORIES, FAIRWEATHER)).toBe(
    `${FAIRWEATHER}/mechanics/relationships/fairweather-elsie-tamsin.world-relationship.ts`
  )
  const own = [...elsewhere, `${FAIRWEATHER}/bonds/fairweather-elsie-cora.world-relationship.ts`]
  expect(placedAmong(bond, own, STORIES, FAIRWEATHER)).toBe(
    `${FAIRWEATHER}/bonds/fairweather-elsie-tamsin.world-relationship.ts`
  )
  const foldered = [`${OTHERWHERE}/quests/q-one/q-one.story-quest.ts`]
  expect(placedAmong("story-quest/fw-hunt", foldered, STORIES, FAIRWEATHER)).toBe(
    `${FAIRWEATHER}/quests/fw-hunt/fw-hunt.story-quest.ts`
  )
  expect(placedAmong("story-quest/fw-hunt", [], STORIES, FAIRWEATHER)).toBe(
    `${FAIRWEATHER}/story-quest/fw-hunt.story-quest.ts`
  )
})

test("the move to player names the place a made page lands at", () => {
  const made = { beat: 1, page: PURSE, make: { value: 5 }, note: "Elsie opens a purse" }
  const held = heldAt("recorders", { changes: [made] })
  const placed = cacheNamed(READING, held, "player", () => "stories/saga/purses/elsie.ts")
  expect("namings" in placed && placed.namings[0]?.path).toBe("stories/saga/purses/elsie.ts")
})

test("a page made with lines for a key held beside it is written with that file", () => {
  const made = {
    beat: 1,
    page: "metric-character-currency/elsie-gold",
    make: { value: 3, history: [{ turn: 1, value: 3 }] },
    note: "Elsie opens a gold purse",
  }
  const held = heldAt("recorders", { changes: [made] })
  expect(cacheNamed(FILED, held, "player")).toEqual({
    namings: [
      {
        pageTypeSlug: "metric-character-currency",
        slug: "elsie-gold",
        merge: false,
        values: { value: 3, history: "jsonl" },
        bodies: { history: '{"turn":1,"value":3}\n' },
      },
    ],
    appends: [],
  })
})
