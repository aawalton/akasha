import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { optionSection } from "akasha/temper/addon/pages/combat/modules/combat-alerts-options/combat-alerts-options.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

interface StageData {
  stage: number
  numRounds: number
}

const STAGES_DATA: Record<number, StageData> = {
  [988]: { stage: 1, numRounds: 4 },
  [963]: { stage: 2, numRounds: 4 },
  [978]: { stage: 3, numRounds: 4 },
  [970]: { stage: 4, numRounds: 4 },
  [976]: { stage: 5, numRounds: 5 },
  [973]: { stage: 6, numRounds: 5 },
  [987]: { stage: 7, numRounds: 5 },
  [986]: { stage: 8, numRounds: 5 },
  [985]: { stage: 9, numRounds: 6 },
}

function onCSA(this: void, _eventCode: number, title: string, _description: string): undefined {
  if (!CRUTCH.savedOptions.maelstrom.showRounds) return

  const [roundText] = string.match(title, "^.+%s(%d)$")
  if (roundText !== undefined) {
    const round = tonumber(roundText)
    const stageData = STAGES_DATA[GetCurrentMapId()]
    if (round === undefined || stageData === undefined) return
    const stage = stageData.stage

    CHAT_ROUTER.AddSystemMessage(
      string.format(
        "|c3bdb5e[CrutchAlerts] |cAAAAAAStage |cFFFFFF%d|cAAAAAA, Round |cFFFFFF%d|r",
        stage,
        round
      )
    )

    if (round === stageData.numRounds - 1) {
      zo_callLater(function (this: void) {
        const extraText = optionSection(CRUTCH.savedOptions, "maelstrom")["stage" + stage + "Boss"]
        CHAT_ROUTER.AddSystemMessage(
          string.format(
            "|c3bdb5e[CrutchAlerts] |cAAAAAAFinal round soonTM!%s|r",
            extraText !== "" ? " |cFF00FF" + tostring(extraText) : ""
          )
        )
      }, 15000)
    }
  }
}

function registerMaelstromArena(this: void): undefined {
  EVENT_MANAGER.RegisterForEvent(CRUTCH.name + "MAAnnouncement", EVENT_DISPLAY_ANNOUNCEMENT, onCSA)

  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Maelstrom Arena")
}

function unregisterMaelstromArena(this: void): undefined {
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "MAAnnouncement", EVENT_DISPLAY_ANNOUNCEMENT)

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Maelstrom Arena")
}

registerZone(677, registerMaelstromArena, unregisterMaelstromArena)
