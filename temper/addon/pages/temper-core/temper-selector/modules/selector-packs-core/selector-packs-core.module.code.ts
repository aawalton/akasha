import type {
  AddonEntry,
  Pack,
} from "akasha/temper/addon/pages/temper-core/temper-selector/modules/selector-types/selector-types.module.code.ts"

export function buildPackFromEntries(entries: readonly AddonEntry[]): Pack {
  const pack: Pack = {}
  for (const entry of entries) {
    if (entry.enabled === true) {
      pack[entry.name] = true
    }
  }
  return pack
}

export interface EnableAction {
  index: number
  enabled: boolean
}

export function computeEnableActions(pack: Pack, entries: readonly AddonEntry[]): EnableAction[] {
  const actions: EnableAction[] = []
  for (const entry of entries) {
    const shouldBeEnabled = pack[entry.name] !== undefined
    if (shouldBeEnabled !== entry.enabled) {
      actions.push({ index: entry.index, enabled: shouldBeEnabled })
    }
  }
  return actions
}

export function isPackActive(pack: Pack, entries: readonly AddonEntry[]): boolean {
  const actions = computeEnableActions(pack, entries)
  return actions.length === 0
}
