import { describe, expect, it } from "bun:test"
import type { ClientQuest } from "./client-session"
import { deriveQuestPanel } from "./quest-projection"

const quest = (over: Partial<ClientQuest> & Pick<ClientQuest, "id">): ClientQuest => ({
  title: `Quest ${over.id}`,
  objective: "Do the thing",
  status: "active",
  ...over,
})

describe("deriveQuestPanel", () => {
  it("keeps active quests and drops complete ones", () => {
    const quests = [
      quest({ id: "a", status: "active" }),
      quest({ id: "b", status: "active" }),
      quest({ id: "c", status: "complete" }),
    ]
    expect(deriveQuestPanel(quests).map((q) => q.id)).toEqual(["a", "b"])
  })

  it("preserves served order", () => {
    const quests = [quest({ id: "z", status: "active" }), quest({ id: "a", status: "active" })]
    expect(deriveQuestPanel(quests).map((q) => q.id)).toEqual(["z", "a"])
  })
})
