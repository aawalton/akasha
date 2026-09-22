import "akasha/temper/addon/pages/hud/temper-keybinder/keybinder-declarations/keybinder-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"

export interface AccountData {
  Keybindings: Record<string, VkBind[] | undefined>
}

interface KeybinderState {
  account: AccountData
  masterList: Record<string, VkBind[] | undefined>
  isDirty: boolean
  editMode: boolean
  bindingsSynchronised: boolean
  searchBox: EditControl | undefined
}

export const KEYBINDER_STATE: KeybinderState = {
  account: { Keybindings: {} },
  masterList: {},
  isDirty: true,
  editMode: false,
  bindingsSynchronised: false,
  searchBox: undefined,
}

export function resetBindingSyncState(this: void): undefined {
  KEYBINDER_STATE.bindingsSynchronised = false
  KEYBINDER_STATE.editMode = false
}
