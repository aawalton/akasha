import "../datamining-public-api/datamining-public-api.module.code.ts"

import { DATAMINING_CAPTURE_DESCRIPTOR } from "@akasha/temper-capture-datamining/datamining-descriptor"
import { defineCaptureWriter } from "@akasha/temper-capture-writer/capture-writer"
import {
  ADDON_NAME,
  AUTO_START_DELAY,
} from "../datamining-constants/datamining-constants.module.code.ts"
import {
  printStatus,
  resetMining,
  startMining,
  stopMining,
  testItemLinkRanges,
} from "../datamining-item-miner/datamining-item-miner.module.code.ts"
import {
  printQuestStatus,
  resetQuestMining,
  startQuestMining,
  stopQuestMining,
} from "../datamining-quest-miner/datamining-quest-miner.module.code.ts"
import {
  getSavedVariables,
  setSavedVariablesAccessor,
} from "../datamining-saved-variables/datamining-saved-variables.module.code.ts"

function parseStringMatchAsString(matched: unknown): string | null {
  return typeof matched === "string" ? matched : null
}

function onPlayerActivated(): undefined {
  EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_PLAYER_ACTIVATED)

  const savedVars = getSavedVariables()

  const currentApiVersion = GetESOVersionString()
  if (savedVars.apiVersion !== currentApiVersion) {
    d(
      `[${ADDON_NAME}] ESO version changed (${savedVars.apiVersion ?? "none"} -> ${currentApiVersion}), re-mining all data.`
    )
    resetMining()
    resetQuestMining()
    savedVars.apiVersion = currentApiVersion
  }

  if (savedVars.completed && !savedVars.questCompleted) {
    const startId = savedVars.questNextId ?? 1
    zo_callLater(function (this: void): undefined {
      d(`[${ADDON_NAME}] Items complete. Resuming quest mining from quest ID ${startId}...`)
      startQuestMining()
    }, AUTO_START_DELAY)
    return
  }

  if (!savedVars.completed) {
    const startId = savedVars.nextItemId ?? 1
    zo_callLater(function (this: void): undefined {
      d(`[${ADDON_NAME}] Resuming mining from item ID ${startId}...`)
      startMining()
    }, AUTO_START_DELAY)
  }
}

defineCaptureWriter(DATAMINING_CAPTURE_DESCRIPTOR, (writer) => {
  setSavedVariablesAccessor(writer.getSavedVariables)

  const savedVars = writer.getSavedVariables()
  savedVars.isRunning = false
  savedVars.questIsRunning = false

  SLASH_COMMANDS["/temperdatamine"] = function (this: void, args: string): undefined {
    const [matched] = string.match(args, "^%s*(%a+)")
    const cmd = parseStringMatchAsString(matched)
    if (cmd === "start") {
      startMining()
    } else if (cmd === "stop") {
      stopMining()
    } else if (cmd === "reset") {
      resetMining()
    } else if (cmd === "status") {
      printStatus()
    } else if (cmd === "startquests") {
      startQuestMining()
    } else if (cmd === "stopquests") {
      stopQuestMining()
    } else if (cmd === "resetquests") {
      resetQuestMining()
    } else if (cmd === "queststatus") {
      printQuestStatus()
    } else {
      d(
        `[${ADDON_NAME}] Usage: /temperdatamine start|stop|reset|status|startquests|stopquests|resetquests|queststatus`
      )
    }
  }

  globalThis.TemperHud?.registerCommand({
    name: "/temperdatamine",
    description: "Run a datamining capture",
    addon: "TemperDataMining",
  })

  SLASH_COMMANDS["/temperdataminetest"] = function (this: void): undefined {
    testItemLinkRanges()
  }

  globalThis.TemperHud?.registerCommand({
    name: "/temperdataminetest",
    description: "Test item-link ID ranges",
    addon: "TemperDataMining",
  })

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME,
    EVENT_PLAYER_ACTIVATED,
    function (this: void): undefined {
      onPlayerActivated()
    }
  )

  d(
    `[${ADDON_NAME}] Loaded. Use /temperdatamine start|stop|reset|status|startquests|stopquests|resetquests|queststatus`
  )
})
