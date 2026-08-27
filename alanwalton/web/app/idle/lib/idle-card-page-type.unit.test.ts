import { describe, expect, test } from "bun:test"
import { z } from "zod"
import {
  IDLE_CARD_DATA_PROPERTY_IDS,
  IDLE_CARD_PROPERTY_DEFINITIONS,
  IDLE_CARD_PROPS,
  IDLE_LOCK_STATE_LOCKED,
  IDLE_LOCK_STATE_UNLOCKED,
  IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
  IDLE_TRAIN_VERB_ID,
} from "./idle-card-page-type"

const cardProps = IDLE_CARD_PROPS
const stringIds = cardProps.map((p) => p.stringId)

describe("persisted idle-persona-card schema", () => {
  test("models the card fields by stringId", () => {
    expect(stringIds).toEqual([
      "persona",
      "stars",
      "seatIndex",
      "ratePerSec",
      "rank",
      "trainCost",
      "lockState",
      "train",
      "train10",
      "trainMax",
      "lockEligible",
      "specializeLocked",
      "remove",
      "lock",
    ])
  })

  test("the retired rateContribution formula is NOT declared (post-#14601 Parsimony)", () => {
    expect(stringIds).not.toContain("rateContribution")
  })

  test("train is an action-button firing the train verb — icon + gold tint, first production action-button (#14271)", () => {
    const train = cardProps.find((p) => p.stringId === IDLE_TRAIN_VERB_ID)
    expect(train?.type).toBe("action-button")
    expect(train?.config).toEqual({
      verbId: IDLE_TRAIN_VERB_ID,
      label: "Train",
      icon: "dumbbell",
      badgeVariant: "yellow",
    })
  })

  test("train is a control property — excluded from the projection's data-fill set", () => {
    expect(IDLE_CARD_DATA_PROPERTY_IDS).not.toContain(IDLE_TRAIN_VERB_ID)
  })

  test("train10 is an action-button firing the train10 verb — dumbbell + gold, +10 label (#15554)", () => {
    const train10 = cardProps.find((p) => p.stringId === "train10")
    expect(train10?.type).toBe("action-button")
    expect(train10?.config).toEqual({
      verbId: "train10",
      label: "+10",
      icon: "dumbbell",
      badgeVariant: "yellow",
    })
  })

  test("train10 is a control property — excluded from the projection's data-fill set (#15554)", () => {
    expect(IDLE_CARD_DATA_PROPERTY_IDS).not.toContain("train10")
    expect(stringIds).not.toContain("train10Cost")
    expect(stringIds).not.toContain("train10Affordable")
  })

  test("trainMax is an action-button firing the trainMax verb — dumbbell + gold, Max label (#15555)", () => {
    const trainMax = cardProps.find((p) => p.stringId === "trainMax")
    expect(trainMax?.type).toBe("action-button")
    expect(trainMax?.config).toEqual({
      verbId: "trainMax",
      label: "Max",
      icon: "dumbbell",
      badgeVariant: "yellow",
    })
  })

  test("trainMax is a control property — excluded from the projection's data-fill set (#15555)", () => {
    expect(IDLE_CARD_DATA_PROPERTY_IDS).not.toContain("trainMax")
    expect(stringIds).not.toContain("trainMaxCount")
    expect(stringIds).not.toContain("trainMaxCost")
  })

  test("DROPS the relationship level — no level/stage property (SACRED)", () => {
    expect(stringIds).not.toContain("level")
    expect(stringIds).not.toContain("stage")
  })

  test("persona is a relation (name resolves through it, never stored)", () => {
    const persona = cardProps.find((p) => p.stringId === "persona")
    expect(persona?.type).toBe("relation")
    expect(persona?.relation).toEqual({ target: "persona", back: "idleCards" })
  })

  test("declares NO custom coverUrl — the cover rides the inherited base `cover` property (#14009)", () => {
    expect(stringIds).not.toContain("coverUrl")
    expect(stringIds).not.toContain("cover")
  })

  test("roster badges carry the icon + badgeVariant channels — star/red, rate heart/yellow /s, Rank/yellow", () => {
    const stars = cardProps.find((p) => p.stringId === "stars")
    expect(stars?.config).toEqual({ icon: "star", badgeVariant: "red" })

    const ratePerSec = cardProps.find((p) => p.stringId === "ratePerSec")
    expect(ratePerSec?.config).toEqual({
      format: "short",
      units: "/s",
      icon: "heart",
      badgeVariant: "yellow",
    })

    const rank = cardProps.find((p) => p.stringId === "rank")
    expect(rank?.config).toEqual({ prefix: "Rank ", badgeVariant: "yellow", format: "short" })
  })

  test("lockState is a select faceted by the two lock states with colour rules", () => {
    const lock = cardProps.find((p) => p.stringId === "lockState")
    expect(lock?.type).toBe("select")
    expect(lock?.options).toEqual(["Unlocked", "Locked"])
    const variants = z
      .array(z.object({ variant: z.string() }))
      .parse(lock?.colorRules ?? [])
      .map((r) => r.variant)
    expect(variants).toEqual(["green", "default"])
  })

  test("lineup latch booleans (#14383): lockEligible + specializeLocked are data-bearing", () => {
    const lockEligible = cardProps.find((p) => p.stringId === "lockEligible")
    const specializeLocked = cardProps.find((p) => p.stringId === "specializeLocked")
    expect(lockEligible?.type).toBe("boolean")
    expect(specializeLocked?.type).toBe("boolean")
    expect(IDLE_CARD_DATA_PROPERTY_IDS).toContain("lockEligible")
    expect(IDLE_CARD_DATA_PROPERTY_IDS).toContain("specializeLocked")
  })

  test("lineup card controls (#14383): remove + lock are action-buttons, excluded from the data-fill set", () => {
    const remove = cardProps.find((p) => p.stringId === "remove")
    const lock = cardProps.find((p) => p.stringId === "lock")
    expect(remove?.type).toBe("action-button")
    expect(remove?.config).toMatchObject({ verbId: "idle-remove", label: "Remove", icon: "x" })
    expect(lock?.type).toBe("action-button")
    expect(lock?.config).toMatchObject({ verbId: "idle-lock", label: "Lock", icon: "lock" })
    expect(IDLE_CARD_DATA_PROPERTY_IDS).not.toContain("remove")
    expect(IDLE_CARD_DATA_PROPERTY_IDS).not.toContain("lock")
  })

  test("the page-type id is the persisted page-type slug + cover-click registry key", () => {
    expect(IDLE_PERSONA_CARD_PAGE_TYPE_SLUG).toBe("idle-persona-card")
  })

  test("lock-state option values are lowercase slugs", () => {
    expect(IDLE_LOCK_STATE_UNLOCKED).toBe("unlocked")
    expect(IDLE_LOCK_STATE_LOCKED).toBe("locked")
  })
})

const ACTION_BUTTON_EXPECTATIONS = [
  {
    id: "train",
    title: "Train",
    config: { verbId: "train", label: "Train", icon: "dumbbell", badgeVariant: "yellow" },
  },
  {
    id: "remove",
    title: "Remove",
    config: { verbId: "idle-remove", label: "Remove", icon: "x", badgeVariant: "elevation-muted" },
  },
  {
    id: "lock",
    title: "Lock",
    config: { verbId: "idle-lock", label: "Lock", icon: "lock" },
  },
] as const

describe("action-button configs single-sourced across seed + render (#14779)", () => {
  for (const { id, title, config } of ACTION_BUTTON_EXPECTATIONS) {
    test(`${id}: render constant carries the exact config AND the seed derives an identical copy`, () => {
      const seed = cardProps.find((p) => p.stringId === id)
      const def = IDLE_CARD_PROPERTY_DEFINITIONS.find((d) => d.id === id)

      expect(seed?.type).toBe("action-button")
      expect(def?.type).toBe("action-button")
      expect(seed?.title).toBe(title)
      expect(def?.title).toBe(title)

      expect(def?.config).toEqual(config)

      expect(seed?.config).toEqual(config)
    })
  }
})
