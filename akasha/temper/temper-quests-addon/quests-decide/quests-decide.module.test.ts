import { describe, expect, test } from "bun:test"
import {
  type AutoQuestMemory,
  type AutoQuestSnapshot,
  type ChatterOptionKind,
  type ClassifiedChatterOption,
  INITIAL_AUTO_QUEST_MEMORY,
  reconcileAutoQuest,
} from "./quests-decide.module.code.ts"

function opt(
  index: number,
  kind: ChatterOptionKind,
  chosenBefore?: boolean
): ClassifiedChatterOption {
  return { index, kind, chosenBefore }
}

function snap(overrides?: Partial<AutoQuestSnapshot>): AutoQuestSnapshot {
  return {
    inChatter: true,
    offerPending: false,
    options: [],
    menuFingerprint: "menu",
    ...overrides,
  }
}

function mem(overrides?: Partial<AutoQuestMemory>): AutoQuestMemory {
  return { ...INITIAL_AUTO_QUEST_MEMORY, ...overrides }
}

describe("quests-decide", () => {
  test("an offered quest is accepted before the menu is read", () => {
    const result = reconcileAutoQuest(
      snap({ offerPending: true, options: [opt(1, "goodbye")] }),
      mem()
    )
    expect(result.action.kind).toBe("accept-offer")
    expect(result.memory.questActed).toBe(true)
  })

  test("an announced completion is answered before the menu is read", () => {
    const result = reconcileAutoQuest(snap(), mem({ pendingCompletion: true }))
    expect(result.action.kind).toBe("complete-quest")
    expect(result.memory.pendingCompletion).toBe(false)
    expect(result.memory.questActed).toBe(true)
  })

  test("persuasion comes ahead of every other option", () => {
    const result = reconcileAutoQuest(
      snap({ options: [opt(1, "accept-quest"), opt(2, "persuade-intimidate")] }),
      mem()
    )
    expect(result.action).toEqual({
      kind: "select",
      index: 2,
      reason: "persuade-intimidate",
    })
  })

  test("a quest option comes ahead of plain talk", () => {
    const result = reconcileAutoQuest(
      snap({ options: [opt(1, "talk"), opt(2, "complete-quest")] }),
      mem()
    )
    expect(result.action).toEqual({ kind: "select", index: 2, reason: "complete-quest" })
  })

  test("plain talk already taken at this menu is not taken again", () => {
    const first = reconcileAutoQuest(snap({ options: [opt(1, "talk"), opt(2, "talk")] }), mem())
    expect(first.action).toEqual({ kind: "select", index: 1, reason: "explore" })

    const second = reconcileAutoQuest(
      snap({ options: [opt(1, "talk"), opt(2, "talk")] }),
      first.memory
    )
    expect(second.action).toEqual({ kind: "select", index: 2, reason: "explore" })
  })

  test("plain talk the game marks as chosen before is left alone", () => {
    const result = reconcileAutoQuest(
      snap({ options: [opt(1, "talk", true), opt(2, "goodbye")] }),
      mem()
    )
    expect(result.action).toEqual({ kind: "select", index: 2, reason: "goodbye" })
  })

  test("a menu offering a service is left alone until a quest has been acted on", () => {
    const result = reconcileAutoQuest(snap({ options: [opt(1, "service")] }), mem())
    expect(result.action.kind).toBe("none")
  })

  test("a service is left behind once a quest has been acted on", () => {
    const result = reconcileAutoQuest(
      snap({ options: [opt(1, "service")] }),
      mem({ questActed: true })
    )
    expect(result.action).toEqual({
      kind: "end-interaction",
      reason: "exit-over-service-no-goodbye",
    })
  })

  test("leaving the dialogue forgets everything remembered about it", () => {
    const result = reconcileAutoQuest(
      snap({ inChatter: false }),
      mem({ questActed: true, sawMenu: true })
    )
    expect(result.action.kind).toBe("none")
    expect(result.memory).toEqual(INITIAL_AUTO_QUEST_MEMORY)
  })

  test("an empty menu ends the dialogue only once a menu has been read", () => {
    expect(reconcileAutoQuest(snap(), mem()).action.kind).toBe("none")
    expect(reconcileAutoQuest(snap(), mem({ sawMenu: true })).action).toEqual({
      kind: "end-interaction",
      reason: "zero-option-after-menu",
    })
  })

  test("the same option at the same menu twice running is refused", () => {
    const options = [opt(1, "accept-quest")]
    const first = reconcileAutoQuest(snap({ options }), mem())
    expect(first.action).toEqual({ kind: "select", index: 1, reason: "accept-quest" })

    const second = reconcileAutoQuest(snap({ options }), first.memory)
    expect(second.action.kind).toBe("none")
  })

  test("a menu with nothing left and no goodbye ends the dialogue", () => {
    const result = reconcileAutoQuest(snap({ options: [opt(1, "blocked")] }), mem())
    expect(result.action).toEqual({ kind: "end-interaction", reason: "exhausted-no-goodbye" })
  })
})
