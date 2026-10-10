import { describe, expect, test } from "bun:test"
import {
  assistMoveLines,
  capturesIn,
  drawnLines,
  journalLines,
  PRESS,
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
    expect(captures.keyOwners).toHaveLength(0)
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

  test("a breadcrumb press shows where the player was and every probe, asked or not", () => {
    const press = PRESS.parse({
      at: 400,
      character: "Maviola El",
      mapSteps: [],
      answer: { xLoc: 0.4, yLoc: 0.6, isBreadcrumb: true },
      answerUniversal: { x: 0.5, y: 0.25 },
      player: { map: MAP, x: 0.1, y: 0.2, universal: { x: 0.3, y: 0.4 } },
      probes: {
        "1": {
          label: "own-map",
          result: 2,
          map: MAP,
          answer: { xLoc: 0.7, yLoc: 0.8, isBreadcrumb: false },
          universal: { x: 0.55, y: 0.35 },
        },
        "2": { label: "zoom-out 1", result: 2, map: MAP, timedOut: true },
        "3": { label: "quest-zone", result: 0, map: MAP },
      },
      said: [],
    })
    const lines = pressLines(press)
    expect(lines).toContain(
      "    answer: x=0.4 y=0.6 radius=undefined pin=undefined insideCurrentMapWorld=undefined" +
        " breadcrumb=true teleportNPC=undefined waypoint=undefined symbolic=undefined" +
        " extra=(undefined, undefined) universal (0.5, 0.25)"
    )
    expect(lines).toContain(
      '    player at (0.1, 0.2) universal (0.3, 0.4) on "Gold Coast" id=9 type=2 content=0 zone=3 "Gold Coast"'
    )
    expect(lines).toContain(
      '    probe own-map -> 2: "Gold Coast" id=9 type=2 content=0 zone=3 "Gold Coast"'
    )
    expect(lines.join("\n")).toContain("breadcrumb=false")
    expect(lines.join("\n")).toContain("universal (0.55, 0.35)")
    expect(lines).toContain("      no answer in time")
    expect(lines.at(-1)).toBe("      not asked")
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

  test("what the task list drew is read back row by row", () => {
    const lines = drawnLines({
      exit: "completed",
      window: {
        name: "TemperTaskHUD_v2",
        hidden: false,
        controlHidden: false,
        alpha: 1,
        left: 10,
        top: 20,
        width: 300,
        height: 90,
      },
      contentHidden: false,
      contentChildren: 12,
      emptyHidden: true,
      fragmentShowing: true,
      named: [{ name: "TemperTaskHUD", exists: false }],
      rows: [
        {
          name: "",
          hidden: false,
          controlHidden: false,
          offsetY: 30,
          labels: [{ text: "Focused Quest", r: 1, g: 0.8, b: 0, a: 1 }],
        },
      ],
    })
    expect(lines[0]).toContain('exit=completed window "TemperTaskHUD_v2"')
    expect(lines[0]).toContain("content-children=12 empty-hidden fragment-showing=true")
    expect(lines[1]).toContain('named "TemperTaskHUD" absent')
    expect(lines[2]).toBe('          row "" y=30: "Focused Quest" rgba(1.00,0.80,0.00,1.00)')
  })

  test("a table with no capture reads as nothing captured", () => {
    const none = capturesIn(QUEST_PORT_SAVED_VARIABLES.parse({ Default: {} }))
    expect(none).toEqual({ journals: [], presses: [], assistMoves: [], keyOwners: [] })
  })
})
