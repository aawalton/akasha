import { describe, expect, test } from "bun:test"
import {
  BeatSchema,
  beatIdentityKey,
  beatIsGrandfathered,
  canonicalBeatKey,
  droppedBeats,
  renderSystemMechanics,
  SystemBeatSchema,
  storedBeatGrandfatherKeys,
  systemBeatCarriesVoiceText,
  WriteBeatSchema,
} from "./beat-schema"

describe("BeatSchema — read/serve contract (turn optional, content required)", () => {
  test("accepts a narrative beat with non-empty text, turnless", () => {
    const parsed = BeatSchema.safeParse({ type: "narrative", text: "The door groans open." })
    expect(parsed.success).toBe(true)
  })

  test("accepts a system beat with a title only (no lines)", () => {
    const parsed = BeatSchema.safeParse({ type: "system", title: "Threshold", turn: 2 })
    expect(parsed.success).toBe(true)
  })

  test("accepts a system beat with lines only (no title)", () => {
    const parsed = BeatSchema.safeParse({ type: "system", lines: ["Floor 4."] })
    expect(parsed.success).toBe(true)
  })

  test("rejects a narrative beat with no text (empty-render card)", () => {
    expect(BeatSchema.safeParse({ type: "narrative", turn: 1 }).success).toBe(false)
  })

  test("rejects a narrative beat with whitespace-only text", () => {
    expect(BeatSchema.safeParse({ type: "narrative", text: "   \n " }).success).toBe(false)
  })

  test("rejects a system beat with neither title nor lines (the empty-card finding)", () => {
    expect(BeatSchema.safeParse({ type: "system", text: "orphaned" }).success).toBe(false)
  })

  test("rejects a system beat whose title and lines are all empty/whitespace", () => {
    expect(BeatSchema.safeParse({ type: "system", title: "  ", lines: [" ", ""] }).success).toBe(
      false
    )
  })

  test("rejects an unknown beat type (closed vocabulary)", () => {
    expect(BeatSchema.safeParse({ type: "whisper", text: "x" }).success).toBe(false)
  })

  test("strips a coordinator-only key on a narrative beat", () => {
    const parsed = BeatSchema.parse({
      type: "narrative",
      text: "hi",
      turn: 3,
      designerNotes: "DC 15",
    })
    expect(parsed).toEqual({ type: "narrative", text: "hi", turn: 3 })
  })
})

describe("WriteBeatSchema — write boundary (turn required)", () => {
  test("accepts a fully-formed narrative beat with a turn", () => {
    expect(
      WriteBeatSchema.safeParse({ type: "narrative", text: "A step forward.", turn: 5 }).success
    ).toBe(true)
  })

  test("rejects a turnless narrative beat (phantom-divider fix at the source)", () => {
    const parsed = WriteBeatSchema.safeParse({ type: "narrative", text: "no turn" })
    expect(parsed.success).toBe(false)
    if (!parsed.success) {
      expect(parsed.error.issues.some((i) => /turn/i.test(i.message))).toBe(true)
    }
  })

  test("rejects a text-only system beat with a clear content error", () => {
    const parsed = WriteBeatSchema.safeParse({ type: "system", text: "orphaned", turn: 1 })
    expect(parsed.success).toBe(false)
    if (!parsed.success) {
      expect(parsed.error.issues.some((i) => /title or.*line/i.test(i.message))).toBe(true)
    }
  })

  test("accepts a system beat carrying a turn and a title", () => {
    expect(WriteBeatSchema.safeParse({ type: "system", title: "Floor 4", turn: 4 }).success).toBe(
      true
    )
  })
})

describe("system beat — structured mechanics (the mute standard shape, #14588)", () => {
  test("accepts a mechanics-only system beat (no title/lines) on the read schema", () => {
    const parsed = BeatSchema.safeParse({
      type: "system",
      turn: 3,
      mechanics: { poolChanges: [{ pool: "VITAE", delta: -6, newTotal: 22 }] },
    })
    expect(parsed.success).toBe(true)
  })

  test("accepts a mechanics-only system beat at the write boundary (turn present)", () => {
    const parsed = WriteBeatSchema.safeParse({
      type: "system",
      turn: 3,
      mechanics: { poolChanges: [{ pool: "VITAE", delta: -6, newTotal: 22 }] },
    })
    expect(parsed.success).toBe(true)
  })

  test("rejects a mechanics beat with an empty poolChanges array (renders no line)", () => {
    expect(
      BeatSchema.safeParse({ type: "system", turn: 1, mechanics: { poolChanges: [] } }).success
    ).toBe(false)
  })

  test("rejects a hybrid beat carrying BOTH mechanics AND voice text (not both)", () => {
    const parsed = WriteBeatSchema.safeParse({
      type: "system",
      turn: 2,
      title: "Wound",
      mechanics: { poolChanges: [{ pool: "VITAE", delta: -6, newTotal: 22 }] },
    })
    expect(parsed.success).toBe(false)
  })
})

describe("system beat — typed window channel (the mute windowed shape, #15312)", () => {
  test("accepts a window-only system beat at the write boundary", () => {
    const parsed = WriteBeatSchema.safeParse({
      type: "system",
      turn: 1,
      window: {
        type: "status-assessment",
        assessment: { name: "Alan", level: 1, attributes: { WILL: 16 } },
      },
    })
    expect(parsed.success).toBe(true)
  })

  test("a windowed beat carries no voice text — passes the mute gate", () => {
    const beat = SystemBeatSchema.parse({
      type: "system",
      turn: 1,
      window: { type: "quest-added", quest: { title: "Ascend", objective: "Reach floor 3" } },
    })
    expect(systemBeatCarriesVoiceText(beat)).toBe(false)
  })

  test("rejects a hybrid beat carrying BOTH a window AND mechanics (exactly one channel)", () => {
    const parsed = WriteBeatSchema.safeParse({
      type: "system",
      turn: 2,
      mechanics: { poolChanges: [{ pool: "VITAE", delta: -6, newTotal: 22 }] },
      window: { type: "quest-added", quest: { title: "T", objective: "O" } },
    })
    expect(parsed.success).toBe(false)
  })

  test("rejects a hybrid beat carrying BOTH a window AND voice text", () => {
    const parsed = WriteBeatSchema.safeParse({
      type: "system",
      turn: 2,
      title: "Wound",
      window: { type: "quest-added", quest: { title: "T", objective: "O" } },
    })
    expect(parsed.success).toBe(false)
  })
})

describe("renderSystemMechanics — deterministic template (#14588)", () => {
  test("renders one line per pool change: `${pool} ${signedDelta} → ${newTotal}`", () => {
    expect(
      renderSystemMechanics({
        poolChanges: [
          { pool: "VITAE", delta: -6, newTotal: 22 },
          { pool: "XP", delta: 40, newTotal: 140 },
        ],
      })
    ).toEqual({ lines: ["VITAE -6 → 22", "XP +40 → 140"] })
  })

  test("a zero delta still renders with an explicit sign", () => {
    expect(
      renderSystemMechanics({ poolChanges: [{ pool: "FOCUS", delta: 0, newTotal: 5 }] })
    ).toEqual({ lines: ["FOCUS +0 → 5"] })
  })

  test("same mechanical data renders identical text (determinism)", () => {
    const data = { poolChanges: [{ pool: "VITAE", delta: -6, newTotal: 22 }] }
    expect(renderSystemMechanics(data)).toEqual(renderSystemMechanics(data))
  })
})

describe("systemBeatCarriesVoiceText — voice-text predicate (#14588)", () => {
  test("true for a system beat with a non-empty title", () => {
    expect(
      systemBeatCarriesVoiceText({ type: "system", title: "The System stirs.", turn: 1 })
    ).toBe(true)
  })

  test("true for a system beat with a non-empty line", () => {
    expect(
      systemBeatCarriesVoiceText({ type: "system", lines: ["You feel watched."], turn: 1 })
    ).toBe(true)
  })

  test("false for a mechanics-only system beat", () => {
    expect(
      systemBeatCarriesVoiceText({
        type: "system",
        turn: 1,
        mechanics: { poolChanges: [{ pool: "VITAE", delta: -6, newTotal: 22 }] },
      })
    ).toBe(false)
  })
})

const TOWER_LEGACY_CARDS: readonly unknown[] = [
  { id: "b139", turn: 58, type: "system", lines: ["LEVEL UP — 5"], title: "The Tower" },
  {
    id: "b155",
    turn: 65,
    type: "system",
    lines: ["SKILL — Smithing → Apprentice"],
    title: "The Tower",
  },
  { id: "b163", turn: 68, type: "system", lines: ["LEVEL UP — 6"], title: "The Tower" },
  {
    id: "b187",
    turn: 80,
    type: "system",
    lines: ["AFFINITY — Force Affinity"],
    title: "The Tower",
  },
  { id: "b193", turn: 82, type: "system", lines: ["SKILL — Chain Whip"], title: "The Tower" },
]

describe("grandfather decider — validate the delta, not the archive (#15605)", () => {
  test("canonicalBeatKey is key-order independent", () => {
    const a = { type: "system", turn: 58, title: "The Tower", lines: ["LEVEL UP — 5"], id: "b139" }
    const b = { id: "b139", lines: ["LEVEL UP — 5"], title: "The Tower", turn: 58, type: "system" }
    expect(canonicalBeatKey(a)).toBe(canonicalBeatKey(b))
  })

  test("canonicalBeatKey distinguishes different content (a changed line)", () => {
    const a = { type: "system", turn: 58, title: "The Tower", lines: ["LEVEL UP — 5"] }
    const b = { type: "system", turn: 58, title: "The Tower", lines: ["LEVEL UP — 6"] }
    expect(canonicalBeatKey(a)).not.toBe(canonicalBeatKey(b))
  })

  test("canonicalBeatKey preserves line ORDER (a beat's lines are content)", () => {
    const a = { type: "system", turn: 1, lines: ["one", "two"] }
    const b = { type: "system", turn: 1, lines: ["two", "one"] }
    expect(canonicalBeatKey(a)).not.toBe(canonicalBeatKey(b))
  })

  test("each of the 5 real tower cards is grandfathered when present in the stored log", () => {
    const keys = storedBeatGrandfatherKeys(TOWER_LEGACY_CARDS)
    for (const card of TOWER_LEGACY_CARDS) {
      expect(beatIsGrandfathered(card, keys)).toBe(true)
    }
  })

  test("a tower card is grandfathered even when its incoming keys are reordered", () => {
    const keys = storedBeatGrandfatherKeys(TOWER_LEGACY_CARDS)
    const reordered = {
      title: "The Tower",
      type: "system",
      lines: ["LEVEL UP — 5"],
      turn: 58,
      id: "b139",
    }
    expect(beatIsGrandfathered(reordered, keys)).toBe(true)
  })

  test("a NEW voiced beat (absent from the stored log) is NOT grandfathered", () => {
    const keys = storedBeatGrandfatherKeys(TOWER_LEGACY_CARDS)
    const fresh = {
      id: "b999",
      turn: 99,
      type: "system",
      lines: ["LEVEL UP — 7"],
      title: "The Tower",
    }
    expect(beatIsGrandfathered(fresh, keys)).toBe(false)
  })

  test("a MODIFIED archive beat (one field changed) is NOT grandfathered", () => {
    const keys = storedBeatGrandfatherKeys(TOWER_LEGACY_CARDS)
    const modified = {
      id: "b139",
      turn: 58,
      type: "system",
      lines: ["LEVEL UP — 500"],
      title: "The Tower",
    }
    expect(beatIsGrandfathered(modified, keys)).toBe(false)
  })

  test("an empty stored log grandfathers nothing (first-ever commit is fully strict)", () => {
    const keys = storedBeatGrandfatherKeys([])
    expect(keys.size).toBe(0)
    expect(beatIsGrandfathered(TOWER_LEGACY_CARDS[0], keys)).toBe(false)
  })

  test("the 5 tower cards do carry voice-text a mute game would otherwise refuse", () => {
    for (const card of TOWER_LEGACY_CARDS) {
      const parsed = SystemBeatSchema.parse(card)
      expect(systemBeatCarriesVoiceText(parsed)).toBe(true)
    }
  })
})

describe("beatIdentityKey / droppedBeats — no-silent-log-shrink (#15724)", () => {
  test("beatIdentityKey keys on the beat id (string or number), ignoring content", () => {
    const a = { id: "b139", turn: 58, type: "system", lines: ["LEVEL UP — 5"] }
    const edited = { id: "b139", turn: 58, type: "system", lines: ["LEVEL UP — 500"] }
    expect(beatIdentityKey(a)).toBe(beatIdentityKey(edited))
    expect(beatIdentityKey(a)).toBe("id:b139")
    expect(beatIdentityKey({ id: 7, turn: 1, type: "narrative", text: "x" })).toBe("id:7")
  })

  test("beatIdentityKey falls back to the content key for an idless beat", () => {
    const beat = { turn: 1, type: "narrative", text: "no id here" }
    expect(beatIdentityKey(beat)).toBe(`content:${canonicalBeatKey(beat)}`)
  })

  test("droppedBeats reports every stored beat whose id is absent from the incoming log", () => {
    const stored = [
      { id: "b1", turn: 1, type: "narrative", text: "a" },
      { id: "b2", turn: 1, type: "narrative", text: "b" },
      { id: "b3", turn: 2, type: "narrative", text: "c" },
    ]
    const incoming = [{ id: "b1", turn: 1, type: "narrative", text: "a" }]
    const dropped = droppedBeats(stored, incoming)
    expect(dropped).toEqual([stored[1], stored[2]])
    expect(dropped.map((b) => beatIdentityKey(b))).toEqual(["id:b2", "id:b3"])
  })

  test("droppedBeats is empty when incoming is a superset (order-independent)", () => {
    const stored = [
      { id: "b1", turn: 1, type: "narrative", text: "a" },
      { id: "b2", turn: 1, type: "narrative", text: "b" },
    ]
    const incoming = [
      { id: "b2", turn: 1, type: "narrative", text: "b-edited" },
      { id: "b1", turn: 1, type: "narrative", text: "a" },
      { id: "b3", turn: 2, type: "narrative", text: "new" },
    ]
    expect(droppedBeats(stored, incoming)).toEqual([])
  })
})
