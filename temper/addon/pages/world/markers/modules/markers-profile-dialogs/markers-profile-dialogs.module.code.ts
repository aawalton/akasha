import {
  registerCustomDialog,
  registerDialog,
} from "akasha/temper/addon/pages/world/markers/modules/markers-dialogs/markers-dialogs.module.code.ts"
import {
  getCurrentZoneProfiles,
  loadProfile,
} from "akasha/temper/addon/pages/world/markers/modules/markers-profiles/markers-profiles.module.code.ts"
import { MM } from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import "akasha/temper/eso/type/eso-addon-list/eso-addon-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings-2/eso-lib-sets-strings-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-scroll-list-extra/eso-scroll-list-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-4/eso-ui-4.type-declaration.d.ts"

interface ProfileItem {
  name: string
}

interface StatusRow extends Control {
  statusIndicator: {
    AddIcon: (this: unknown, icon: string) => void
    Show: (this: unknown) => void
  }
}

interface ProfileEntryData {
  name: string
  isActive: boolean
  setup: (this: void, control: StatusRow, data: ProfileEntryData, ...rest: unknown[]) => void
  SetFontScaleOnSelection: (this: ProfileEntryData, scale: boolean) => void
  SetIconTintOnSelection: (this: ProfileEntryData, tint: boolean) => void
}

interface ParametricProfileDialog extends ZO_DialogData {
  info: { parametricList: unknown[] }
  setupFunc: (this: ParametricProfileDialog) => void
  entryList: {
    SetSelectedDataByEval: (
      this: unknown,
      test: (this: void, data: ProfileEntryData) => boolean
    ) => void
    GetTargetData: (this: unknown) => ProfileEntryData | undefined
  }
}

export const PC_PROFILE_SELECT = "TemperWorldMarkerPCProfileSelect"
export const PC_PROFILE_SELECT_MULTI = "TemperWorldMarkerPCProfileSelectMulti"
export const GAMEPAD_PROFILE_SELECT = "TemperWorldMarkerProfileSelect"

const ROW_TEMPLATE = "TemperWorldMarkerProfileSelectDialogItemTemplate"
const BELOW_TEXT = "Only profiles for the active zone can be seleted."
const CHECKED_ICON = "EsoUI/Art/Inventory/Gamepad/gp_inventory_icon_equipped.dds"

export const HIGHLIGHT_ANIMATION = ZO_ReversibleAnimationProvider.New(
  "ShowOnMouseOverLabelAnimation"
)

function currentProfileName(this: void): string | undefined {
  const [zone] = GetUnitRawWorldPosition("player")
  return MM.vars.loadedProfile[zone]
}

let listDialog: ZoListDialog<ProfileItem> | undefined

function profileListDialog(this: void): ZoListDialog<ProfileItem> {
  if (listDialog === undefined) {
    const made = ZO_ListDialog.New<ProfileItem>(ROW_TEMPLATE, 52, (row, item) => {
      row.GetNamedChild<LabelControl>("Name")?.SetText(item.name)
      row.GetNamedChild("Selected")?.SetHidden(made.GetSelectedItem() !== item)
      if (made.GetSelectedItem() !== undefined) made.SetFirstButtonEnabled(true)
    })
    listDialog = made
  }
  listDialog.SetFirstButtonEnabled(false)
  return listDialog
}

let multiDialog: ZoListDialog<ProfileItem> | undefined

function profileMultiDialog(this: void): ZoListDialog<ProfileItem> {
  if (multiDialog === undefined) {
    const made = ZO_MultiSelectListDialog.New<ProfileItem>(ROW_TEMPLATE, 52, (row, item) => {
      row.GetNamedChild<LabelControl>("Name")?.SetText(item.name)
      let unfound = true
      for (const selected of made.GetSelectedItems()) {
        if (selected.name === item.name) {
          unfound = false
          break
        }
      }
      row.GetNamedChild("Selected")?.SetHidden(unfound)
      if (!unfound) made.SetFirstButtonEnabled(true)
    })
    multiDialog = made
  }
  multiDialog.SetFirstButtonEnabled(false)
  return multiDialog
}

function fillList(this: void, dialog: ZoListDialog<ProfileItem>): undefined {
  dialog.SetAboveText()
  dialog.SetBelowText(BELOW_TEXT)
  dialog.SetEmptyListText()
  dialog.ClearList()
  const names = getCurrentZoneProfiles()
  table.sort(names)
  for (const name of names) dialog.AddListItem({ name })
  const loaded = currentProfileName()
  for (const row of ZO_ScrollList_GetDataList<ProfileItem>(dialog.list) ?? []) {
    const item = row?.data
    if (loaded !== undefined && item !== undefined && item.name === loaded) {
      ZO_ScrollList_SelectData(dialog.list, item)
    }
  }
  dialog.CommitList()
  return undefined
}

registerCustomDialog(PC_PROFILE_SELECT, {
  customControl: () => profileListDialog().GetControl(),
  setup: () => fillList(profileListDialog()),
  title: { text: "Select your Profile" },
  buttons: [
    {
      control: profileListDialog().GetButton(1),
      text: SI_GAMEPAD_SELECT_OPTION,
      callback: () => {
        const name = profileListDialog().GetSelectedItem()?.name
        if (name === undefined) return
        MM.currentLoadProfileName = name
        loadProfile(name)
      },
    },
    { control: profileListDialog().GetButton(2), text: SI_DIALOG_EXIT },
  ],
})

registerCustomDialog(PC_PROFILE_SELECT_MULTI, {
  customControl: () => profileMultiDialog().GetControl(),
  setup: () => fillList(profileMultiDialog()),
  title: { text: "Select your Profile" },
  buttons: [
    {
      control: profileMultiDialog().GetButton(1),
      text: SI_GAMEPAD_SELECT_OPTION,
      callback: (dialog: ZO_DialogData) => {
        const selected: string[] = []
        for (const item of profileMultiDialog().GetSelectedItems()) selected.push(item.name)
        const answer = dialog.data["callbackFunc"] as
          | ((this: void, names: string[]) => void)
          | undefined
        answer?.(selected)
      },
    },
    { control: profileMultiDialog().GetButton(2), text: SI_DIALOG_EXIT },
  ],
})

export function setupProfileItem(
  this: void,
  control: StatusRow,
  data: ProfileEntryData,
  ...rest: unknown[]
): undefined {
  ZO_SharedGamepadEntry_OnSetup(control, data, ...rest)
  control.statusIndicator.AddIcon(CHECKED_ICON)
  if (data.isActive) control.statusIndicator.Show()
  return undefined
}

export function gamepadEntry(this: void, name: string, isActive: boolean): unknown {
  const entry = ZO_GamepadEntryData.New(name)
  entry.SetFontScaleOnSelection(false)
  entry.SetIconTintOnSelection(true)
  entry["setup"] = setupProfileItem
  entry["name"] = name
  entry["isActive"] = isActive
  return { template: "ZO_GamepadSubMenuEntryWithStatusTemplate", entryData: entry }
}

function isSelected(this: void, data: ProfileEntryData): boolean {
  return data.isActive
}

registerDialog(GAMEPAD_PROFILE_SELECT, {
  canQueue: true,
  gamepadInfo: { dialogType: GAMEPAD_DIALOGS["PARAMETRIC"] ?? 0 },
  setup: (given) => {
    const dialog = given as ParametricProfileDialog
    const loaded = currentProfileName() ?? "Default"
    dialog.info.parametricList = []
    for (const name of getCurrentZoneProfiles()) {
      dialog.info.parametricList.push(gamepadEntry(name, name === loaded))
    }
    dialog.setupFunc()
    dialog.entryList.SetSelectedDataByEval(isSelected)
  },
  title: { text: "Select your Profile" },
  buttons: [
    {
      text: SI_GAMEPAD_SELECT_OPTION,
      callback: (dialog: ZO_DialogData) => {
        const name = (dialog as ParametricProfileDialog).entryList.GetTargetData()?.name
        if (name !== undefined) {
          MM.currentLoadProfileName = name
          loadProfile(name)
        }
      },
    },
    { text: SI_DIALOG_EXIT },
  ],
})

export function showProfileSelect(this: void): undefined {
  if (IsInGamepadPreferredMode()) {
    ZO_Dialogs_ShowPlatformDialog(GAMEPAD_PROFILE_SELECT)
  } else {
    ZO_Dialogs_ShowPlatformDialog(PC_PROFILE_SELECT)
  }
  return undefined
}

export function showMultiProfileSelect(
  this: void,
  callback: (this: void, names: string[]) => void
): undefined {
  ZO_Dialogs_ShowPlatformDialog(PC_PROFILE_SELECT_MULTI, { callbackFunc: callback })
  return undefined
}
