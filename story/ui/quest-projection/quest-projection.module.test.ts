import { describe, expect, test } from "bun:test"
import type { ClientQuest } from "../client-session/client-session.module.code.ts"
import { deriveQuestPanel } from "./quest-projection.module.code.ts"

const quest = (id: string, status: ClientQuest["status"]): ClientQuest => ({
  id,
  title: `Quest ${id}`,
  objective: "reach the tower",
  status,
})

describe("deriveQuestPanel", () => {
  test("drops the quests already complete", () => {
    const quests = [quest("a", "active"), quest("b", "complete"), quest("c", "active")]
    expect(deriveQuestPanel(quests).map((q) => q.id)).toEqual(["a", "c"])
  })

  test("keeps the order the quests came in", () => {
    const quests = [quest("z", "active"), quest("y", "active")]
    expect(deriveQuestPanel(quests).map((q) => q.id)).toEqual(["z", "y"])
  })

  test("is empty when every quest is complete", () => {
    expect(deriveQuestPanel([quest("a", "complete")])).toEqual([])
  })
})
