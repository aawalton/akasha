"use client"

import {
  patchCraftBagDestination,
  patchFurnitureVaultDestination,
} from "@akasha/temper-items-rules-core/inventory-rule-settings"
import type { InventoryRuleSettings } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { useCraftBagAccess } from "../hooks-inventory-settings/hooks-inventory-settings.module.code.ts"
import { useInventoryRulesHandlers } from "../inventory-rules-handlers/inventory-rules-handlers.module.code.ts"
import {
  rulesFingerprint,
  useInventoryRuleSettings,
  usePersistSettings,
} from "../inventory-rules-state/inventory-rules-state.module.code.ts"

interface InventoryRulesSettingsState {
  localSettings: InventoryRuleSettings
  handlers: ReturnType<typeof useInventoryRulesHandlers>
}

export function useInventoryRulesSettingsState(): InventoryRulesSettingsState {
  const { settings } = useInventoryRuleSettings()
  const { craftBagAccess } = useCraftBagAccess()
  const persistServer = usePersistSettings()

  const [localSettings, setLocalSettings] = useState<InventoryRuleSettings>(settings)
  const dirtyRef = useRef(false)
  const localFingerprintRef = useRef(rulesFingerprint(settings))

  useEffect(() => {
    if (dirtyRef.current) {
      if (rulesFingerprint(settings) === localFingerprintRef.current) {
        dirtyRef.current = false
      }
      return
    }
    setLocalSettings(settings)
  }, [settings])

  const settingsRef = useRef(localSettings)
  settingsRef.current = localSettings

  const serverSettingsRef = useRef(settings)
  serverSettingsRef.current = settings

  const applyChange = useCallback(
    (next: InventoryRuleSettings) => {
      const revertTo = serverSettingsRef.current
      dirtyRef.current = true
      localFingerprintRef.current = rulesFingerprint(next)
      setLocalSettings(next)
      persistServer(next, (err) => {
        console.error("[inventory-rules] settings persist failed:", err)
        toast.error("Couldn't save your rule change — reverting to the last saved version.")
        dirtyRef.current = false
        localFingerprintRef.current = rulesFingerprint(revertTo)
        setLocalSettings(revertTo)
      })
    },
    [persistServer]
  )

  useEffect(() => {
    if (craftBagAccess == null) return
    const rules = settingsRef.current.rules
    const needsPatch = craftBagAccess
      ? rules.some(
          (r) => r.id === "crafting-craft-bag" && r.action === "move-to" && r.destination === "bank"
        )
      : rules.some((r) => r.action === "move-to" && r.destination === "craft-bag")
    if (!needsPatch) return
    applyChange(patchCraftBagDestination(settingsRef.current, craftBagAccess))
  }, [craftBagAccess, applyChange, settingsRef])

  useEffect(() => {
    if (craftBagAccess == null) return
    const rules = settingsRef.current.rules
    const needsPatch = craftBagAccess
      ? rules.some(
          (r) =>
            r.id === "furnishings-house-storage" &&
            r.action === "move-to" &&
            r.destination === "bank"
        )
      : rules.some((r) => r.action === "move-to" && r.destination === "furniture-vault")
    if (!needsPatch) return
    applyChange(patchFurnitureVaultDestination(settingsRef.current, craftBagAccess))
  }, [craftBagAccess, applyChange, settingsRef])

  const handlers = useInventoryRulesHandlers(settingsRef, applyChange, craftBagAccess)

  return { localSettings, handlers }
}
