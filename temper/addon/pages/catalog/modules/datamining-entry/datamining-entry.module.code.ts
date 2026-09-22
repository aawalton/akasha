import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/catalog/modules/catalog-constants/catalog-constants.module.code.ts"
import { AUTO_START_DELAY } from "akasha/temper/addon/pages/catalog/modules/datamining-constants/datamining-constants.module.code.ts"
import {
  printStatus,
  resetMining,
  startMining,
  stopMining,
  testItemLinkRanges,
} from "akasha/temper/addon/pages/catalog/modules/datamining-item-miner/datamining-item-miner.module.code.ts"
import {
  printQuestStatus,
  resetQuestMining,
  startQuestMining,
  stopQuestMining,
} from "akasha/temper/addon/pages/catalog/modules/datamining-quest-miner/datamining-quest-miner.module.code.ts"
import {
  getSavedVariables,
  setSavedVariablesAccessor,
} from "akasha/temper/addon/pages/catalog/modules/datamining-saved-variables/datamining-saved-variables.module.code.ts"
import { DATAMINING_CAPTURE_DESCRIPTOR } from "akasha/temper/capture/datamining/modules/datamining-descriptor/datamining-descriptor.module.code.ts"
import { defineCaptureWriter } from "akasha/temper/capture/writer/modules/capture-writer/capture-writer.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-hud-global/temper-hud-global.type-declaration.d.ts"

const PLAYER_ACTIVATED_NAMESPACE = `${ADDON_NAME}Datamining`

function onPlayerActivated(): undefined {
  EVENT_MANAGER.UnregisterForEvent(PLAYER_ACTIVATED_NAMESPACE, EVENT_PLAYER_ACTIVATED)

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
    const cmd = stringIn(matched)
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

  globalThis.Temper?.registerCommand({
    name: "/temperdatamine",
    description: "Run a datamining capture",
    addon: ADDON_NAME,
  })

  SLASH_COMMANDS["/temperdataminetest"] = function (this: void): undefined {
    testItemLinkRanges()
  }

  globalThis.Temper?.registerCommand({
    name: "/temperdataminetest",
    description: "Test item-link ID ranges",
    addon: ADDON_NAME,
  })

  EVENT_MANAGER.RegisterForEvent(
    PLAYER_ACTIVATED_NAMESPACE,
    EVENT_PLAYER_ACTIVATED,
    function (this: void): undefined {
      onPlayerActivated()
    }
  )

  d(
    `[${ADDON_NAME}] Loaded. Use /temperdatamine start|stop|reset|status|startquests|stopquests|resetquests|queststatus`
  )
})
