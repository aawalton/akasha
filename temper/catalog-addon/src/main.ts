import "./public-api"

import { applyPendingInvalidations } from "@temper/catalog-core/apply-invalidations"
import { decideClearTarget } from "@temper/catalog-core/clear-target"
import { catalogCaptureDescriptor } from "@temper/catalog-core/descriptor"
import { type CatalogDomainEntry, getCatalogDomains } from "@temper/catalog-core/registry"
import type { CatalogPayload } from "@temper/catalog-core/types"
import { type CatalogWalkVerdict, runCatalogWalk } from "@temper/catalog-core/walk"
import {
  type CaptureWriter,
  defineCaptureWriter,
} from "@temper/shared-capture-core/define-capture-writer"
import { registerApiTestCommand } from "./api-test"
import "@temper/game-completion-capture-addon/achievements"
import "@temper/game-crafting-capture-addon/recipes"
import "@temper/game-collections-lore-capture-addon/lore-library"
import "@temper/game-collections-antiquities-capture-addon/antiquity-lore"
import "@temper/game-completion-capture-addon/cadwell"
import "@temper/game-items-capture-addon/item-sets"
import "@temper/game-crafting-capture-addon/scribing"
import "@temper/game-crafting-capture-addon/trait-research"
import "@temper/game-collections-capture-addon/collectibles"
import "@temper/game-collections-tribute-capture-addon/tribute"
import "@temper/game-completion-capture-addon/zone-completion"
import "@temper/game-navigation-capture-addon/points-of-interest"
import "@temper/game-companions-capture-addon/companion-equipment"
import "@temper/game-items-currency-capture-addon/currency"
import "@temper/game-items-capture-addon/inventory-constants"
import "@temper/game-housing-capture-addon/furniture"
import "@temper/game-characters-capture-addon/classes"
import "@temper/game-companions-capture-addon/companion-skills"
import "@temper/game-characters-capture-addon/skills"
import { ADDON_NAME, AUTO_START_DELAY, DOMAIN_DELAY, DOMAIN_TIMEOUT } from "./constants"
import { getSavedVariables, setCatalogSavedVariablesAccessor } from "@temper/catalog-core/saved-variables-accessor"
import { getPendingInvalidation } from "./side-file-config"

declare global {
  var TemperHud:
    | {
        registerCommand: (
          this: void,
          command: {
            name: string
            description: string
            addon: string
            handler?: (this: void, args: string) => undefined
          }
        ) => undefined
      }
    | undefined
}

function parseLuaCommand(captured: string | undefined): string | undefined {
  return captured
}

function runProtected(this: void, run: (this: void) => void): string | undefined {
  const [ok, err] = pcall(run)
  if (ok) return undefined
  return typeof err === "string" ? err : "collector failed with a non-string error"
}

function scheduleLater(this: void, run: (this: void) => void, delayMs: number): undefined {
  zo_callLater(run, delayMs)
}

function logLine(this: void, message: string): undefined {
  d(`[${ADDON_NAME}] ${message}`)
}

function hasCollectedDomain(this: void, domainKey: string): boolean {
  const savedVars = getSavedVariables()
  for (const domain of getCatalogDomains()) {
    if (domain.key === domainKey) return savedVars[domain.key] !== undefined
  }
  return false
}

function writeWalkVerdict(this: void, verdict: CatalogWalkVerdict): undefined {
  const savedVars = getSavedVariables()
  savedVars.completed = verdict.completed
  if (verdict.skips.length === 0) {
    savedVars.collectionSkips = undefined
    return
  }
  const skipRecord: Record<string, string> = {}
  for (const skip of verdict.skips) {
    skipRecord[skip.domain] = skip.reason
    d(`[${ADDON_NAME}] Skipped ${skip.domain}: ${skip.reason}`)
  }
  savedVars.collectionSkips = skipRecord
}

function autoCollect(): undefined {
  const savedVars = getSavedVariables()
  const currentApiVersion = GetESOVersionString()
  const currentManifestApiVersion = GetAPIVersion()

  if (savedVars.apiVersion !== undefined && savedVars.apiVersion !== currentApiVersion) {
    d(
      `[${ADDON_NAME}] API version changed (${savedVars.apiVersion} -> ${currentApiVersion}), invalidating all catalogs.`
    )
    for (const domain of getCatalogDomains()) {
      savedVars[domain.key] = undefined
    }
    savedVars.completed = false
    savedVars.collectionSkips = undefined
  }

  const pending: CatalogDomainEntry[] = []
  for (const domain of getCatalogDomains()) {
    if (savedVars[domain.key] === undefined) {
      pending.push(domain)
    }
  }

  if (pending.length === 0) {
    savedVars.completed = true
    savedVars.collectionSkips = undefined
    savedVars.apiVersion = currentApiVersion
    savedVars.manifestApiVersion = currentManifestApiVersion
    d(`[${ADDON_NAME}] All catalogs already collected, marking complete.`)
    return
  }

  d(`[${ADDON_NAME}] Auto-collecting ${pending.length} remaining catalog(s)...`)

  runCatalogWalk(
    pending,
    {
      attempt: runProtected,
      schedule: scheduleLater,
      hasCollected: hasCollectedDomain,
      log: logLine,
    },
    { domainDelayMs: DOMAIN_DELAY, domainTimeoutMs: DOMAIN_TIMEOUT },
    function (this: void, verdict: CatalogWalkVerdict): undefined {
      writeWalkVerdict(verdict)
      const finalSavedVars = getSavedVariables()
      finalSavedVars.apiVersion = currentApiVersion
      finalSavedVars.manifestApiVersion = currentManifestApiVersion
      if (verdict.completed) {
        d(`[${ADDON_NAME}] Auto-collection complete.`)
      } else {
        d(
          `[${ADDON_NAME}] Auto-collection finished with ${verdict.collected.length} collected, ${verdict.skips.length} skipped — run /tempercatalog status for details.`
        )
      }
    }
  )
}

function clearCatalogs(target: string | undefined): undefined {
  const savedVars = getSavedVariables()
  const domains = getCatalogDomains()
  const decision = decideClearTarget(
    target,
    domains.map((domain) => domain.key)
  )

  if (decision.kind === "all") {
    for (const domain of domains) {
      savedVars[domain.key] = undefined
    }
    savedVars.completed = false
    savedVars.collectionSkips = undefined
    d(`[${ADDON_NAME}] All catalog data cleared. Will re-collect on next login.`)
    return
  }

  if (decision.kind === "one") {
    for (const domain of domains) {
      if (domain.key === decision.domainKey) {
        savedVars[domain.key] = undefined
        savedVars.completed = false
        savedVars.collectionSkips = undefined
        d(`[${ADDON_NAME}] Cleared ${domain.key}. Will re-collect on next login.`)
        return
      }
    }
    return
  }

  if (decision.kind === "unknown") {
    d(
      `[${ADDON_NAME}] Unknown catalog domain "${decision.requested}" — nothing cleared. /tempercatalog status lists the keys.`
    )
    return
  }

  d(`[${ADDON_NAME}] "clear" needs a target and cleared nothing.`)
  d(`  /tempercatalog clear all          — wipe every domain`)
  d(`  /tempercatalog clear <domainKey>  — wipe one domain`)
  const skips = savedVars.collectionSkips
  if (skips === undefined) return
  d(`  Skipped on the last collection pass, and worth targeting:`)
  for (const domain of domains) {
    const reason = skips[domain.key]
    if (reason !== undefined) d(`    ${domain.key} — ${reason}`)
  }
}

function printStatus(): undefined {
  const savedVars = getSavedVariables()
  const skips = savedVars.collectionSkips
  d(`[${ADDON_NAME}] Catalog status (completed: ${savedVars.completed}):`)
  for (const domain of getCatalogDomains()) {
    if (savedVars[domain.key] !== undefined) {
      d(`  ${domain.key}: collected`)
      continue
    }
    const reason = skips === undefined ? undefined : skips[domain.key]
    if (reason === undefined) {
      d(`  ${domain.key}: pending`)
    } else {
      d(`  ${domain.key}: skipped — ${reason}`)
    }
  }
}

function applyHostInvalidations(): undefined {
  const savedVars = getSavedVariables()
  const allKeys = getCatalogDomains().map((d) => d.key)
  const presentDomainKeys = allKeys.filter((k) => savedVars[k] !== undefined)
  const result = applyPendingInvalidations(
    {
      lastSeenInvalidateVersion: savedVars.lastSeenInvalidateVersion ?? 0,
      completed: savedVars.completed,
      presentDomainKeys,
    },
    getPendingInvalidation(),
    allKeys
  )
  if (result.kind === "noop") return

  const nextPresent = new Set(result.next.presentDomainKeys)
  for (const key of allKeys) {
    if (!nextPresent.has(key)) savedVars[key] = undefined
  }
  savedVars.completed = result.next.completed
  savedVars.collectionSkips = undefined
  savedVars.lastSeenInvalidateVersion = result.next.lastSeenInvalidateVersion
  d(
    `[${ADDON_NAME}] Applied side-file invalidation v${savedVars.lastSeenInvalidateVersion}; will re-collect on next login.`
  )
}

defineCaptureWriter(
  catalogCaptureDescriptor,
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
