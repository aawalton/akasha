import "akasha/temper/addon/pages/catalog/modules/catalog-public-api/catalog-public-api.module.code.ts"
import "akasha/temper/addon/pages/catalog/modules/datamining-entry/datamining-entry.module.code.ts"

import {
  type CaptureWriter,
  defineCaptureWriter,
} from "akasha/temper/capture/writer/modules/capture-writer/capture-writer.module.code.ts"
import { CATALOG_CAPTURE_DESCRIPTOR } from "akasha/temper/catalog/core/modules/catalog-descriptor/catalog-descriptor.module.code.ts"
import type { CatalogPayload } from "akasha/temper/catalog/core/modules/catalog-payload/catalog-payload.module.code.ts"
import { setCatalogSavedVariablesAccessor } from "akasha/temper/catalog/core/modules/saved-variables-accessor/saved-variables-accessor.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/achievement-catalog-capture/achievement-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/recipe-catalog-capture/recipe-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/lore-library-catalog-capture/lore-library-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/antiquity-lore-catalog-capture/antiquity-lore-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/cadwell-catalog-capture/cadwell-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/item-set-catalog-capture/item-set-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/scribing-catalog-capture/scribing-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/trait-research-catalog-capture/trait-research-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/collectibles-catalog-capture/collectibles-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/tribute-catalog-capture/tribute-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/zone-completion-catalog-capture/zone-completion-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/poi-catalog-capture/poi-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/companion-equipment-catalog-capture/companion-equipment-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/currency-catalog-capture/currency-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/inventory-constants-catalog-capture/inventory-constants-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/furniture-catalog-capture/furniture-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/class-catalog-capture/class-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/companion-skill-catalog-capture/companion-skill-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/skill-catalog-capture/skill-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/engine-globals-catalog-capture/engine-globals-catalog-capture.module.code.ts"
import "akasha/temper/capture/game-catalog-capture-addon/modules/interface-color-catalog-capture/interface-color-catalog-capture.module.code.ts"
import { registerApiTestCommand } from "akasha/temper/addon/pages/catalog/modules/catalog-api-test/catalog-api-test.module.code.ts"
import { autoCollect } from "akasha/temper/addon/pages/catalog/modules/catalog-auto-collect/catalog-auto-collect.module.code.ts"
import {
  clearCatalogs,
  parseLuaCommand,
  printStatus,
} from "akasha/temper/addon/pages/catalog/modules/catalog-command/catalog-command.module.code.ts"
import {
  ADDON_NAME,
  AUTO_START_DELAY,
} from "akasha/temper/addon/pages/catalog/modules/catalog-constants/catalog-constants.module.code.ts"
import { applyHostInvalidations } from "akasha/temper/addon/pages/catalog/modules/catalog-invalidations/catalog-invalidations.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-global/temper-global.type-declaration.d.ts"

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
    globalThis.Temper?.registerCommand({
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
