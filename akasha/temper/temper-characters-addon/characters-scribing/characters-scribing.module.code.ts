import type {
  GrimoireEntry,
  ScribingProgress,
  ScriptEntry,
} from "@akasha/temper-completion/completion-progress"
import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"
import { mergeScribing } from "../characters-scribing-merge/characters-scribing-merge.module.code.ts"

export const SCRIBING_SLOTS = [
  SCRIBING_SLOT_PRIMARY,
  SCRIBING_SLOT_SECONDARY,
  SCRIBING_SLOT_TERTIARY,
]

export function scanScribing(): ScribingProgress {
  const grimoires: Record<number, GrimoireEntry> = {}
  const scripts: Record<number, ScriptEntry> = {}

  const numAbilities = GetNumCraftedAbilities()
  for (let i = 1; i <= numAbilities; i++) {
    const craftedAbilityId = GetCraftedAbilityIdAtIndex(i)
    if (craftedAbilityId === 0) continue

    grimoires[craftedAbilityId] = {
      name: zo_strformat("<<1>>", GetCraftedAbilityDisplayName(craftedAbilityId)),
      unlocked: IsCraftedAbilityUnlocked(craftedAbilityId),
    }

    for (const slot of SCRIBING_SLOTS) {
      const numScripts = GetNumScriptsInSlotForCraftedAbility(craftedAbilityId, slot)
      for (let j = 1; j <= numScripts; j++) {
        const scriptId = GetScriptIdAtSlotIndexForCraftedAbility(craftedAbilityId, slot, j)
        if (scriptId === 0) continue
        if (scripts[scriptId] !== undefined) continue

        scripts[scriptId] = {
          name: zo_strformat("<<1>>", GetCraftedAbilityScriptDisplayName(scriptId)),
          slot: GetCraftedAbilityScriptScribingSlot(scriptId),
          unlocked: IsCraftedAbilityScriptUnlocked(scriptId),
        }
      }
    }
  }

  return { grimoires, scripts }
}

export function collectScribing(): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  charEntry.scribing = mergeScribing(charEntry.scribing, scanScribing())
}

function markUnlocked<T extends { unlocked: boolean }>(
  entries: Record<number, T>,
  id: number,
  isUnlocked: boolean,
  readEntry: () => T
): undefined {
  const existing = entries[id]
  if (existing !== undefined) {
    existing.unlocked = isUnlocked
    return
  }
  entries[id] = readEntry()
}

export function updateGrimoire(craftedAbilityId: number, isUnlocked: boolean): undefined {
  const scribing = currentCharacterEntry()?.scribing
  if (scribing === undefined) return

  markUnlocked(scribing.grimoires, craftedAbilityId, isUnlocked, () => ({
    name: zo_strformat("<<1>>", GetCraftedAbilityDisplayName(craftedAbilityId)),
    unlocked: isUnlocked,
  }))
}

export function updateScript(scriptId: number, isUnlocked: boolean): undefined {
  const scribing = currentCharacterEntry()?.scribing
  if (scribing === undefined) return

  markUnlocked(scribing.scripts, scriptId, isUnlocked, () => ({
    name: zo_strformat("<<1>>", GetCraftedAbilityScriptDisplayName(scriptId)),
    slot: GetCraftedAbilityScriptScribingSlot(scriptId),
    unlocked: isUnlocked,
  }))
}
