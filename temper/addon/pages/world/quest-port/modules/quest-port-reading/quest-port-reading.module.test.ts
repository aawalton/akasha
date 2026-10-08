import { describe, expect, test } from "bun:test"
import {
  assistMoveLines,
  capturesIn,
  journalLines,
  pressLines,
  QUEST_PORT_SAVED_VARIABLES,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-reading/quest-port-reading.module.code.ts"

const MAP = {
  name: "Gold Coast",
  mapId: 9,
  mapType: 2,
  contentType: 0,
  zoneIndex: 3,
  zoneName: "Gold Coast",
}

const ROOT = {
  Default: {
    "@Alanarre": {
      $AccountWide: {
        autoQuest: true,
        questJournal: {
          "Maviola El": {
            at: 100,
            character: "Maviola El",
            quests: {
              "1": {
                journalIndex: 1,
                name: "Other Quest",
                zoneName: "Stormhaven",
                zoneIndex: 2,
                objectiveName: "",
                poiIndex: 0,
                questType: 0,
                repeatType: 0,
                level: 10,
                isAssisted: false,
                isComplete: false,
                steps: {},
              },
              "2": {
                journalIndex: 2,
                name: "Focused Quest",
                zoneName: "Gold Coast",
                zoneIndex: 3,
                objectiveName: "Hrota Cave",
                poiIndex: 4,
                questType: 0,
                repeatType: 0,
                level: 50,
                isAssisted: true,
                isComplete: false,
                steps: [
                  {
                    stepIndex: 1,
                    text: "Find the thief.",
                    trackerOverrideText: "",
                    conditions: [
                      {
                        conditionIndex: 1,
                        text: "Search the cave",
                        current: 0,
                        max: 1,
                        isFailCondition: false,
                        isComplete: false,
                        isVisible: true,
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
        questPortTrace: [
          {
            at: 200,
            character: "Maviola El",
            journalIndex: 2,
            questName: "Focused Quest",
            stepIndex: 1,
            conditionIndex: 1,
            conditionText: "Search the cave",
            mapBefore: MAP,
            mapSteps: { "1": { step: "set-to-condition", result: 1, map: MAP } },
            taskId: 7,
            answer: {
              pinType: 3,
              xLoc: 0.4,
              yLoc: 0.6,
              insideCurrentMapWorld: true,
              isBreadcrumb: true,
            },
            nodesRead: 40,
            candidatesKept: 2,
            closest: [
              {
                kind: "wayshrine",
                name: "Anvil Wayshrine",
                nodeIndex: 5,
                houseId: 0,
                x: 0.5,
                y: 0.6,
                distance: 0.1,
              },
            ],
            said: ["Porting to Anvil Wayshrine, nearest to Search the cave."],
          },
        ],
        assistNextTrace: [
          {
            at: 300,
            character: "Maviola El",
            before: { journalIndex: 1, questName: "Other Quest", headerText: "Other Quest" },
            after: {
              journalIndex: 2,
              questName: "Focused Quest",
              headerText: "Other Quest",
              taskList: {
                assistedName: "Other Quest",
                refreshCount: 4,
                lastRefreshAt: 290,
                lastSyncedName: "Other Quest",
                quests: [
                  {
                    journalIndex: 2,
                    name: "Focused Quest",
                    assistedWithZero: false,
                    assistedWithNil: true,
                  },
                  {
                    journalIndex: 1,
                    name: "Other Quest",
                    assistedWithZero: false,
                    assistedWithNil: false,
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
}

describe("quest-port-reading", () => {
  const captures = capturesIn(QUEST_PORT_SAVED_VARIABLES.parse(ROOT))

  test("every capture is read out of the account-wide table", () => {
    expect(captures.journals.map((one) => one.character)).toEqual(["Maviola El"])
    expect(captures.presses).toHaveLength(1)
    expect(captures.assistMoves).toHaveLength(1)
  })

  test("the focused quest comes first, with its steps and conditions", () => {
    const lines = journalLines(captures.journals[0] ?? { at: 0, character: "", quests: [] })
    expect(lines[1]).toContain("2: Focused Quest FOCUSED")
    expect(lines[2]).toContain("step 1: Find the thief.")
    expect(lines[3]).toContain("1: Search the cave 0/1")
    expect(lines.at(-1)).toContain("1: Other Quest")
  })

  test("a press shows the game's answer, the candidates and what was said", () => {
    const press = captures.presses[0]
    if (press === undefined) throw new Error("no press read")
    const lines = pressLines(press).join("\n")
    expect(lines).toContain("set-to-condition -> 1")
    expect(lines).toContain("insideCurrentMapWorld=true breadcrumb=true")
    expect(lines).toContain('wayshrine "Anvil Wayshrine"')
    expect(lines).toContain("said: Porting to Anvil Wayshrine")
  })

  test("a move to the next quest shows each reading, and one never taken says so", () => {
    const move = captures.assistMoves[0]
    if (move === undefined) throw new Error("no move read")
    const lines = assistMoveLines(move)
    expect(lines[1]).toContain('before: quest 1 "Other Quest"')
    expect(lines[2]).toBe("      task list: not read")
    expect(lines[3]).toContain('after: quest 2 "Focused Quest" header "Other Quest"')
    expect(lines[4]).toContain(
      'task list: focused "Other Quest" last synced "Other Quest" redraws 4'
    )
    expect(lines[5]).toContain('2: "Focused Quest" assisted with 0=false with nil=true')
    expect(lines[6]).toBe("    later: not read")
  })

  test("a table with no capture reads as nothing captured", () => {
    const none = capturesIn(QUEST_PORT_SAVED_VARIABLES.parse({ Default: {} }))
    expect(none).toEqual({ journals: [], presses: [], assistMoves: [] })
  })
})
