import { describe, expect, test } from "bun:test"
import { COMPANION_QUEST_DATA } from "../companion-quest-data/companion-quest-data.module.code.ts"
import {
  isCompanionQuestActionable,
  isCompanionQuestPathComplete,
  pickFirstActionableCompanionQuest,
  sortedCompanionQuestGroups,
} from "./completion-companion-quest-actionability.module.code.ts"

const DEFID_BASTIAN = 1
const DEFID_MIRRI = 2
const DEFID_EMBER = 5
const DEFID_ISOBEL = 6
const DEFID_SHARP = 8
const DEFID_AZANDAR = 9
const DEFID_TANLORIN = 12
const DEFID_ZERITH = 13

const STARTER_QUEST_IDS = [6626, 6648, 6760, 6771, 7017, 7021, 7186, 7194]
const ALL_QUEST_IDS = COMPANION_QUEST_DATA.flatMap((g) => g.quests.map((q) => q.questId))

const RAPPORT_ALL_MAX: Record<number, number> = {
  [DEFID_BASTIAN]: 4000,
  [DEFID_MIRRI]: 4000,
  [DEFID_EMBER]: 4000,
  [DEFID_ISOBEL]: 4000,
  [DEFID_SHARP]: 4000,
  [DEFID_AZANDAR]: 4000,
  [DEFID_TANLORIN]: 4000,
  [DEFID_ZERITH]: 4000,
}

const RAPPORT_ALL_LOCKED: Record<number, number> = {
  [DEFID_BASTIAN]: 0,
  [DEFID_MIRRI]: 0,
  [DEFID_EMBER]: 0,
  [DEFID_ISOBEL]: 0,
  [DEFID_SHARP]: 0,
  [DEFID_AZANDAR]: 0,
  [DEFID_TANLORIN]: 0,
  [DEFID_ZERITH]: 0,
}

describe("sortedCompanionQuestGroups", () => {
  test("the groups come in the order of their companion names", () => {
    const names = sortedCompanionQuestGroups.map((g) => g.companionName)
    expect(names).toEqual([...names].sort())
    expect(names).toHaveLength(COMPANION_QUEST_DATA.length)
  })
})

describe("isCompanionQuestActionable", () => {
  test("a starter quest asking for no rapport is actionable while incomplete", () => {
    expect(isCompanionQuestActionable({ questId: 6626 }, new Set(), 0)).toBe(true)
  })

  test("an already completed quest is not actionable", () => {
    expect(isCompanionQuestActionable({ questId: 6626 }, new Set([6626]), 8)).toBe(false)
  })

  test("a quest is not actionable while rapport is below what it asks for", () => {
    expect(
      isCompanionQuestActionable({ questId: 6662, requiredRapportLevel: 5 }, new Set(), 4)
    ).toBe(false)
  })

  test("a quest becomes actionable once rapport meets what it asks for", () => {
    expect(
      isCompanionQuestActionable({ questId: 6662, requiredRapportLevel: 5 }, new Set(), 5)
    ).toBe(true)
  })
})

describe("pickFirstActionableCompanionQuest", () => {
  test("the first actionable quest by ascending companion name belongs to Azandar", () => {
    const pick = pickFirstActionableCompanionQuest(new Set(), RAPPORT_ALL_MAX)
    expect(pick?.companionName).toBe("Azandar")
  })

  test("nothing comes back when every quest is completed", () => {
    expect(
      pickFirstActionableCompanionQuest(new Set(ALL_QUEST_IDS), RAPPORT_ALL_MAX)
    ).toBeUndefined()
  })

  test("nothing comes back when the starters are done and every followup is rapport-locked", () => {
    expect(
      pickFirstActionableCompanionQuest(new Set(STARTER_QUEST_IDS), RAPPORT_ALL_LOCKED)
    ).toBeUndefined()
  })

  test("a missing rapport map treats every companion as level 0, locking the followups", () => {
    expect(pickFirstActionableCompanionQuest(new Set(STARTER_QUEST_IDS), {})).toBeUndefined()
  })

  test("naming a companion restricts the search to that companion", () => {
    const pick = pickFirstActionableCompanionQuest(new Set(), RAPPORT_ALL_MAX, "bastian")
    expect(pick?.companionId).toBe("bastian")
  })

  test("nothing comes back for a companion whose remaining quests are all locked", () => {
    expect(
      pickFirstActionableCompanionQuest(new Set([6626]), { [DEFID_BASTIAN]: 0 }, "bastian")
    ).toBeUndefined()
  })

  test("the tier comes from raw rapport, so a tier-5 raw value of 1145 leaves a tier-6 quest locked", () => {
    expect(
      pickFirstActionableCompanionQuest(new Set([6626, 6662]), { [DEFID_BASTIAN]: 1145 }, "bastian")
    ).toBeUndefined()
    expect(
      pickFirstActionableCompanionQuest(new Set([6626]), { [DEFID_BASTIAN]: 1145 }, "bastian")
        ?.questId
    ).toBe(6662)
  })
})

describe("isCompanionQuestPathComplete", () => {
  describe("at the card level, where there is no path", () => {
    test("it is incomplete while actionable quests remain", () => {
      expect(isCompanionQuestPathComplete(new Set(), RAPPORT_ALL_MAX)).toBe(false)
    })

    test("it is complete once every quest is done", () => {
      expect(isCompanionQuestPathComplete(new Set(ALL_QUEST_IDS), RAPPORT_ALL_MAX)).toBe(true)
    })

    test("it is complete when the starters are done and the rest are rapport-locked", () => {
      expect(isCompanionQuestPathComplete(new Set(STARTER_QUEST_IDS), RAPPORT_ALL_LOCKED)).toBe(
        true
      )
    })

    test("an empty path and a null path are both read as no path", () => {
      expect(isCompanionQuestPathComplete(new Set(ALL_QUEST_IDS), RAPPORT_ALL_MAX, [])).toBe(true)
      expect(isCompanionQuestPathComplete(new Set(ALL_QUEST_IDS), RAPPORT_ALL_MAX, null)).toBe(true)
    })
  })

  describe("at the companion level, where the path is one long", () => {
    test("it is complete once that companion's quests are all done", () => {
      expect(
        isCompanionQuestPathComplete(new Set([6626, 6662, 6664]), RAPPORT_ALL_MAX, ["bastian"])
      ).toBe(true)
    })

    test("it is incomplete while an actionable quest remains for that companion", () => {
      expect(
        isCompanionQuestPathComplete(new Set([6626]), { [DEFID_BASTIAN]: 1000 }, ["bastian"])
      ).toBe(false)
    })

    test("it is complete when the remaining quests are rapport-locked", () => {
      expect(
        isCompanionQuestPathComplete(new Set([6626]), { [DEFID_BASTIAN]: 0 }, ["bastian"])
      ).toBe(true)
    })

    test("it is incomplete for a companion slug nothing knows", () => {
      expect(isCompanionQuestPathComplete(new Set(), RAPPORT_ALL_MAX, ["nobody"])).toBe(false)
    })
  })

  describe("at the quest level, where the path is two long", () => {
    test("a completed quest is complete", () => {
      expect(
        isCompanionQuestPathComplete(new Set([6626]), RAPPORT_ALL_MAX, ["bastian", 6626])
      ).toBe(true)
    })

    test("an uncompleted but rapport-locked quest counts as complete", () => {
      expect(
        isCompanionQuestPathComplete(new Set([6626]), { [DEFID_BASTIAN]: 0 }, ["bastian", 6662])
      ).toBe(true)
    })

    test("an uncompleted and unlocked quest is incomplete", () => {
      expect(
        isCompanionQuestPathComplete(new Set([6626]), { [DEFID_BASTIAN]: 1000 }, ["bastian", 6662])
      ).toBe(false)
    })

    test("it is incomplete for a quest id nothing knows", () => {
      expect(isCompanionQuestPathComplete(new Set(), RAPPORT_ALL_MAX, ["bastian", 999999])).toBe(
        false
      )
    })
  })
})
