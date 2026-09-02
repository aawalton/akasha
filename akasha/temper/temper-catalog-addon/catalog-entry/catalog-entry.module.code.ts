import "../catalog-public-api/catalog-public-api.module.code.ts"

import {
  type CaptureWriter,
  defineCaptureWriter,
} from "@akasha/temper-capture-writer/capture-writer"
import { CATALOG_CAPTURE_DESCRIPTOR } from "@akasha/temper-catalog-core/catalog-descriptor"
import type { CatalogPayload } from "@akasha/temper-catalog-core/catalog-payload"
import { setCatalogSavedVariablesAccessor } from "@akasha/temper-catalog-core/saved-variables-accessor"
import "@akasha/temper-game-catalog-capture-addon/achievement-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/recipe-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/lore-library-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/antiquity-lore-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/cadwell-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/item-set-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/scribing-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/trait-research-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/collectibles-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/tribute-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/zone-completion-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/poi-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/companion-equipment-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/currency-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/inventory-constants-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/furniture-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/class-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/companion-skill-catalog-capture"
import "@akasha/temper-game-catalog-capture-addon/skill-catalog-capture"
import { registerApiTestCommand } from "../catalog-api-test/catalog-api-test.module.code.ts"
import { autoCollect } from "../catalog-auto-collect/catalog-auto-collect.module.code.ts"
import {
  clearCatalogs,
  parseLuaCommand,
  printStatus,
} from "../catalog-commands/catalog-commands.module.code.ts"
import { ADDON_NAME, AUTO_START_DELAY } from "../catalog-constants/catalog-constants.module.code.ts"
import { applyHostInvalidations } from "../catalog-invalidations/catalog-invalidations.module.code.ts"

defineCaptureWriter(
  CATALOG_CAPTURE_DESCRIPTOR,
  function (this: void, writer: CaptureWriter<CatalogPayload>): undefined {
    setCatalogSavedVariablesAccessor(writer.getSavedVariables)
    applyHostInvalidations()
    registerApiTestCommand()

    SLASH_COMMANDS["/tempercatalog"] = function (this: void, args: string): undefined {
      const [verbCapture, targetCapture] = string.match(args, "^%s*(%a+)%s*(%a*)")
      const cmd = parseLuaCommand(verbCapture)
      const target = parseLuaCommand(targetCapture)
      if (cmd === "clear") {
        clearCatalogs(target)
      } else if (cmd === "status") {
        printStatus()
      } else {
        d(`[${ADDON_NAME}] Usage: /tempercatalog clear all|<domainKey> | status`)
      }
    }
    globalThis.TemperHud?.registerCommand({
      name: "/tempercatalog",
      description: "Clear or view catalog collection status",
      addon: "TemperCatalog",
    })

    EVENT_MANAGER.RegisterForEvent(
      ADDON_NAME,
      EVENT_PLAYER_ACTIVATED,
      function (this: void): undefined {
        EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_PLAYER_ACTIVATED)
        zo_callLater(function (this: void): undefined {
          autoCollect()
        }, AUTO_START_DELAY)
      }
    )
  }
)
