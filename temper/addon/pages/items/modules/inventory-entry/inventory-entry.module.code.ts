import "akasha/temper/addon/pages/items/modules/inventory-public-api/inventory-public-api.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/modules/crafting-entry/crafting-entry.module.code.ts"
import "akasha/temper/addon/pages/items/modules/sales-addon-entry/sales-addon-entry.module.code.ts"
import "akasha/temper/addon/pages/items/modules/trading-entry/trading-entry.module.code.ts"

import { initializeInventoryActionPanel } from "akasha/temper/addon/pages/items/modules/inventory-action-panel/inventory-action-panel.module.code.ts"
import { initializeBankActionPanel } from "akasha/temper/addon/pages/items/modules/inventory-bank-action-panel/inventory-bank-action-panel.module.code.ts"
import {
  initializeInventoryBrowser,
  toggleInventoryBrowser,
} from "akasha/temper/addon/pages/items/modules/inventory-browser/inventory-browser.module.code.ts"
import {
  ADDON_NAME,
  BANK_BAGS,
  PERSONAL_BAGS,
  registerItemsStringIds,
} from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import {
  scanAccountCurrencies,
  scanCharacterCurrencies,
} from "akasha/temper/addon/pages/items/modules/inventory-currency/inventory-currency.module.code.ts"
import { registerEquipmentLockOverlay } from "akasha/temper/addon/pages/items/modules/inventory-equipment-lock-overlay/inventory-equipment-lock-overlay.module.code.ts"
import { registerInventoryEvents } from "akasha/temper/addon/pages/items/modules/inventory-events/inventory-events.module.code.ts"
import { onTemperItemsSubcommand } from "akasha/temper/addon/pages/items/modules/inventory-explain-slash-command/inventory-explain-slash-command.module.code.ts"
import { initializeFilterBar } from "akasha/temper/addon/pages/items/modules/inventory-filter-bar-init/inventory-filter-bar-init.module.code.ts"
import { registerHudFields } from "akasha/temper/addon/pages/items/modules/inventory-hud-fields/inventory-hud-fields.module.code.ts"
import { pruneConfirmedVerdicts } from "akasha/temper/addon/pages/items/modules/inventory-item-rule-verdict-store/inventory-item-rule-verdict-store.module.code.ts"
import { registerLocationTooltip } from "akasha/temper/addon/pages/items/modules/inventory-location-tooltip/inventory-location-tooltip.module.code.ts"
import { registerInventoryLockOverlay } from "akasha/temper/addon/pages/items/modules/inventory-lock-overlay/inventory-lock-overlay.module.code.ts"
import { registerMailHandler } from "akasha/temper/addon/pages/items/modules/inventory-mail-handler/inventory-mail-handler.module.code.ts"
import { cleanupExpiredCooldowns } from "akasha/temper/addon/pages/items/modules/inventory-open-cooldown-protection/inventory-open-cooldown-protection.module.code.ts"
import {
  scanCompanionWorn,
  scanCraftBag,
  scanPersonalBags,
} from "akasha/temper/addon/pages/items/modules/inventory-ops/inventory-ops.module.code.ts"
import { finishPerfTrace } from "akasha/temper/addon/pages/items/modules/inventory-perf/inventory-perf.module.code.ts"
import { handleTemperPlanCommand } from "akasha/temper/addon/pages/items/modules/inventory-plan/inventory-plan.module.code.ts"
import { pruneStaleAnnotations } from "akasha/temper/addon/pages/items/modules/inventory-quest-annotations/inventory-quest-annotations.module.code.ts"
import { getCompiledConfig } from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import { registerConfirmDialog } from "akasha/temper/addon/pages/items/modules/inventory-rules-core-confirm-dialog/inventory-rules-core-confirm-dialog.module.code.ts"
import { repackGuildBank } from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-guild-repack/inventory-rules-dispatch-guild-repack.module.code.ts"
import { rescanInventory } from "akasha/temper/addon/pages/items/modules/inventory-rules-eval/inventory-rules-eval.module.code.ts"
import { onTemperRulesCommand } from "akasha/temper/addon/pages/items/modules/inventory-rules-slash-command/inventory-rules-slash-command.module.code.ts"
import {
  initializeSavedVariables,
  migrateCraftedField,
  migrateEmptyLocationKey,
  migrateHouseBankLocationKeys,
  migrateItemLinkDerivedFields,
  pruneDeletedCharacters,
} from "akasha/temper/addon/pages/items/modules/inventory-saved-variables/inventory-saved-variables.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import { pruneStaleTemperLocks } from "akasha/temper/addon/pages/items/modules/inventory-temper-lock-store/inventory-temper-lock-store.module.code.ts"
import { registerTooltipHook } from "akasha/temper/addon/pages/items/modules/inventory-tooltip-cooldown/inventory-tooltip-cooldown.module.code.ts"
import { registerTooltipLockIcon } from "akasha/temper/addon/pages/items/modules/inventory-tooltip-lock-icon/inventory-tooltip-lock-icon.module.code.ts"
import { registerRuleTooltipHook } from "akasha/temper/addon/pages/items/modules/inventory-tooltip-rule-line/inventory-tooltip-rule-line.module.code.ts"
import { probeMasterWrits } from "akasha/temper/addon/pages/items/modules/inventory-writ-master-probe/inventory-writ-master-probe.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"
import { startPerfTrace } from "akasha/temper/modules/perf-trace/perf-trace.module.code.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-hud-global/temper-hud-global.type-declaration.d.ts"

function initialize(): undefined {
  const perfStart = startPerfTrace()
  registerItemsStringIds()
  initializeSavedVariables()
  cleanupExpiredCooldowns()
  registerTooltipHook()
  registerRuleTooltipHook()
  registerTooltipLockIcon()
  registerLocationTooltip()
  migrateHouseBankLocationKeys()
  migrateItemLinkDerivedFields()
  migrateCraftedField()
  migrateEmptyLocationKey()
  pruneStaleAnnotations()
  const prunedLocks = pruneStaleTemperLocks([...PERSONAL_BAGS, ...BANK_BAGS])
  if (prunedLocks > 0) d(`[${ADDON_NAME}] Pruned ${prunedLocks} stale Temper Lock(s)`)
  const compiledForPrune = getCompiledConfig()
  if (compiledForPrune !== undefined) {
    const prunedVerdicts = pruneConfirmedVerdicts(compiledForPrune)
    if (prunedVerdicts > 0)
      d(`[${ADDON_NAME}] Pruned ${prunedVerdicts} confirmed item-rule verdict(s)`)
  }
  pruneDeletedCharacters()
  registerInventoryEvents()
  registerInventoryLockOverlay()
  registerEquipmentLockOverlay()
  registerConfirmDialog()
  initializeInventoryActionPanel()
  initializeBankActionPanel()
  initializeFilterBar()
  initializeInventoryBrowser()
  registerHudFields()
  registerMailHandler()

  SLASH_COMMANDS["/temperinv"] = function (this: void): undefined {
    scanPersonalBags()
    scanCraftBag()
    scanCharacterCurrencies()
    scanAccountCurrencies()
    if (HasActiveCompanion()) {
      scanCompanionWorn()
    }
    d(`[${ADDON_NAME}] Manual scan complete`)
  }

  SLASH_COMMANDS["/temperscan"] = function (this: void): undefined {
    rescanInventory()
    d(`[${ADDON_NAME}] Inventory rules rescan complete`)
  }

  SLASH_COMMANDS["/temperrepack"] = function (this: void): undefined {
    repackGuildBank()
  }

  SLASH_COMMANDS["/temperplan"] = function (this: void): undefined {
    handleTemperPlanCommand()
  }

  SLASH_COMMANDS["/temperrules"] = onTemperRulesCommand

  SLASH_COMMANDS["/temperbrowse"] = function (this: void): undefined {
    toggleInventoryBrowser()
  }

  globalThis.TemperHud?.registerCommand({
    name: "inventory",
    description: "Inventory rule diagnostics (explain / explain-buy)",
    addon: "TemperItems",
    handler: onTemperItemsSubcommand,
  })

  SLASH_COMMANDS["/tempermwprobe"] = function (this: void): undefined {
    probeMasterWrits()
  }

  for (const entry of [
    { name: "/temperinv", description: "Manual inventory + currency scan" },
    { name: "/temperscan", description: "Rescan inventory rules" },
    { name: "/temperrepack", description: "Repack the guild bank" },
    { name: "/temperplan", description: "Print pending inventory actions" },
    { name: "/temperrules", description: "Manage inventory rules" },
    { name: "/temperbrowse", description: "Toggle the inventory browser" },
    { name: "/tempermwprobe", description: "Probe master writs" },
  ]) {
    globalThis.TemperHud?.registerCommand({
      name: entry.name,
      description: entry.description,
      addon: "TemperItems",
    })
  }

  getSavedVariables().perf = finishPerfTrace(perfStart)
}

registerAddonInit(ADDON_NAME, initialize)
