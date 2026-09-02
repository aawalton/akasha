import "../inventory-public-api/inventory-public-api.module.code.ts"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { startPerfTrace } from "@akasha/temper-capture-perf/perf-trace"
import { initializeInventoryActionPanel } from "../inventory-action-panel/inventory-action-panel.module.code.ts"
import { initializeBankActionPanel } from "../inventory-bank-action-panel/inventory-bank-action-panel.module.code.ts"
import {
  initializeInventoryBrowser,
  toggleInventoryBrowser,
} from "../inventory-browser/inventory-browser.module.code.ts"
import {
  ADDON_NAME,
  BANK_BAGS,
  PERSONAL_BAGS,
} from "../inventory-constants/inventory-constants.module.code.ts"
import {
  scanAccountCurrencies,
  scanCharacterCurrencies,
} from "../inventory-currency/inventory-currency.module.code.ts"
import { registerEquipmentLockOverlay } from "../inventory-equipment-lock-overlay/inventory-equipment-lock-overlay.module.code.ts"
import { registerInventoryEvents } from "../inventory-events/inventory-events.module.code.ts"
import { onTemperInventorySubcommand } from "../inventory-explain-slash-command/inventory-explain-slash-command.module.code.ts"
import { initializeFilterBar } from "../inventory-filter-bar-init/inventory-filter-bar-init.module.code.ts"
import { registerHudFields } from "../inventory-hud-fields/inventory-hud-fields.module.code.ts"
import { pruneConfirmedVerdicts } from "../inventory-item-rule-verdict-store/inventory-item-rule-verdict-store.module.code.ts"
import { registerLocationTooltip } from "../inventory-location-tooltip/inventory-location-tooltip.module.code.ts"
import { registerInventoryLockOverlay } from "../inventory-lock-overlay/inventory-lock-overlay.module.code.ts"
import { registerMailHandler } from "../inventory-mail-handler/inventory-mail-handler.module.code.ts"
import { cleanupExpiredCooldowns } from "../inventory-open-cooldown-protection/inventory-open-cooldown-protection.module.code.ts"
import {
  scanCompanionWorn,
  scanCraftBag,
  scanPersonalBags,
} from "../inventory-ops/inventory-ops.module.code.ts"
import { finishPerfTrace } from "../inventory-perf/inventory-perf.module.code.ts"
import { handleTemperPlanCommand } from "../inventory-plan/inventory-plan.module.code.ts"
import { pruneStaleAnnotations } from "../inventory-quest-annotations/inventory-quest-annotations.module.code.ts"
import { getCompiledConfig } from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { registerConfirmDialog } from "../inventory-rules-core-confirm-dialog/inventory-rules-core-confirm-dialog.module.code.ts"
import { repackGuildBank } from "../inventory-rules-dispatch-guild-repack/inventory-rules-dispatch-guild-repack.module.code.ts"
import { rescanInventory } from "../inventory-rules-eval/inventory-rules-eval.module.code.ts"
import { onTemperRulesCommand } from "../inventory-rules-slash-command/inventory-rules-slash-command.module.code.ts"
import {
  initializeSavedVariables,
  migrateCraftedField,
  migrateEmptyLocationKey,
  migrateHouseBankLocationKeys,
  migrateItemLinkDerivedFields,
  pruneDeletedCharacters,
} from "../inventory-saved-variables/inventory-saved-variables.module.code.ts"
import { getSavedVariables } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import { pruneStaleTemperLocks } from "../inventory-temper-lock-store/inventory-temper-lock-store.module.code.ts"
import { registerTooltipHook } from "../inventory-tooltip-cooldown/inventory-tooltip-cooldown.module.code.ts"
import { registerTooltipLockIcon } from "../inventory-tooltip-lock-icon/inventory-tooltip-lock-icon.module.code.ts"
import { registerRuleTooltipHook } from "../inventory-tooltip-rule-line/inventory-tooltip-rule-line.module.code.ts"
import { probeMasterWrits } from "../inventory-writ-master-probe/inventory-writ-master-probe.module.code.ts"

function initialize(): undefined {
  const perfStart = startPerfTrace()
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
    addon: "TemperInventory",
    handler: onTemperInventorySubcommand,
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
      addon: "TemperInventory",
    })
  }

  getSavedVariables().perf = finishPerfTrace(perfStart)
}

registerAddonInit(ADDON_NAME, initialize)
