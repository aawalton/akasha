import "akasha/temper/addon/pages/temper-core/temper-keybinder/keybinder-declarations/keybinder-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"

export interface AccountData {
  Keybindings: Record<string, VkBind[] | undefined>
  Changes: Record<string, KeybindingChange | undefined>
  Captured?: KeybindingCapture
}

interface KeybinderState {
  account: AccountData
  masterList: Record<string, VkBind[] | undefined>
  isDirty: boolean
  editMode: boolean
  bindingsSynchronised: boolean
  applying: boolean
  searchBox: EditControl | undefined
}

export const KEYBINDER_STATE: KeybinderState = {
  account: { Keybindings: {}, Changes: {} },
  masterList: {},
  isDirty: true,
  editMode: false,
  bindingsSynchronised: false,
  applying: false,
  searchBox: undefined,
}

export function resetBindingSyncState(this: void): undefined {
  KEYBINDER_STATE.bindingsSynchronised = false
  KEYBINDER_STATE.editMode = false
}
