import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-armory/eso-armory.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import {
  type ArmoryBuildData,
  armoryBuildDataOf,
} from "akasha/temper/addon/pages/characters/modules/characters-armory-build-data/characters-armory-build-data.module.code.ts"
import {
  liveTargetOf,
  newLiveTarget,
} from "akasha/temper/addon/pages/characters/modules/characters-armory-live/characters-armory-live.module.code.ts"
import {
  type ArmoryBuild,
  recordEdit,
  recordNew,
} from "akasha/temper/addon/pages/characters/modules/characters-armory-pending/characters-armory-pending.module.code.ts"
import { currentCharacterTarget } from "akasha/temper/addon/pages/characters/modules/characters-build-checklist/characters-build-checklist.module.code.ts"
import {
  applyCharacterTarget,
  chooseCharacterTarget,
} from "akasha/temper/addon/pages/characters/modules/characters-build-target-panel/characters-build-target-panel.module.code.ts"
import { captureCharacterBuildHash } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-build/character-capture-build.module.code.ts"

const EQUIP_DIALOG = "TEMPER_CHARACTERS_ARMORY_EQUIP"

const SAVE_DIALOG = "TEMPER_CHARACTERS_ARMORY_SAVE"

const SAID_DIALOG = "TEMPER_CHARACTERS_ARMORY_SAID"

const SETTINGS_DIALOG = "ArmorySettingsDialog"

const SAVED_DIALOG = "ARMORY_BUILD_SAVE_SUCCESS_DIALOG"

const EQUIPPED_ALREADY = "The build is already equipped."

export interface ArmoryView {
  readonly selected: () => ArmoryBuild | undefined
  readonly shownAs: (key: unknown) => ArmoryBuild | undefined
  readonly count: () => number
  readonly refresh: () => undefined
  readonly choose: (key: string) => undefined
}

function saidSaved(view: ArmoryView, title: string): undefined {
  PlaySound(SOUNDS["ARMORY_SAVE_SUCCESS"])
  view.refresh()
  ZO_Dialogs_ShowPlatformDialog(SAVED_DIALOG, undefined, {
    mainTextParams: [ZO_SELECTED_TEXT.Colorize(title)],
  })
  return undefined
}

function equip(view: ArmoryView, build: ArmoryBuild | undefined): undefined {
  if (build === undefined) return undefined
  if (build.buildId !== undefined) chooseCharacterTarget(build.buildId)
  const said = applyCharacterTarget(build.target)
  PlaySound(SOUNDS["ARMORY_RESTORE_SUCCESS"])
  view.refresh()
  ZO_Dialogs_ShowDialog(SAID_DIALOG, { said: said === "" ? EQUIPPED_ALREADY : said })
  return undefined
}

function save(view: ArmoryView, build: ArmoryBuild | undefined): undefined {
  if (build === undefined) return undefined
  const buildHash = captureCharacterBuildHash().buildHash
  recordEdit(build, { buildHash, view: liveTargetOf(build.target) })
  return saidSaved(view, build.title)
}

function openSettings(build: ArmoryBuild, closed: (data: ArmoryBuildData) => undefined): undefined {
  const data = armoryBuildDataOf(build, 0)
  ZO_Dialogs_ShowDialog(SETTINGS_DIALOG, {
    selectedBuildData: data,
    confirmCallback: () => closed(data),
  })
  return undefined
}

function settingsOf(view: ArmoryView): undefined {
  const build = view.selected()
  if (build === undefined) return undefined
  return openSettings(build, (data) => {
    if (data.name !== build.title || data.icon !== build.icon) {
      recordEdit(build, {
        ...(data.name === build.title ? {} : { title: data.name }),
        ...(data.icon === build.icon ? {} : { icon: data.icon }),
      })
    }
    return view.refresh()
  })
}

export function saveNewBuild(view: ArmoryView): undefined {
  const title = zo_strformat(SI_ARMORY_BUILD_DEFAULT_NAME_FORMATTER, view.count() + 1)
  const target = newLiveTarget(currentCharacterTarget(), title)
  const draft: ArmoryBuild = { key: "", title, icon: target.icon, target }
  return openSettings(draft, (data) => {
    const buildHash = captureCharacterBuildHash().buildHash
    const named = { ...target, title: data.name, icon: data.icon }
    view.choose(recordNew({ title: data.name, icon: data.icon, buildHash, view: named }))
    return saidSaved(view, data.name)
  })
}

function askAbout(view: ArmoryView, dialog: string): undefined {
  const build = view.selected()
  if (build !== undefined) ZO_Dialogs_ShowDialog(dialog, { key: build.key })
  return undefined
}

export function armoryKeybinds(view: ArmoryView): KeybindButtonGroupDescriptor[] {
  const chosen = (): boolean => view.selected() !== undefined
  const bind = (name: number, keybind: string, callback: () => undefined) => ({
    alignment: KEYBIND_STRIP_ALIGN_CENTER,
    name: GetString(name),
    keybind,
    callback,
    visible: chosen,
  })
  return [
    bind(SI_ARMORY_RESTORE_BUILD_ACTION, "UI_SHORTCUT_PRIMARY", () => askAbout(view, EQUIP_DIALOG)),
    bind(SI_ARMORY_SAVE_BUILD_ACTION, "UI_SHORTCUT_SECONDARY", () => askAbout(view, SAVE_DIALOG)),
    bind(SI_ARMORY_OPEN_BUILD_DIALOG_ACTION, "UI_SHORTCUT_TERTIARY", () => settingsOf(view)),
  ]
}

function confirmDialog(
  view: ArmoryView,
  title: number,
  text: number,
  accepted: (view: ArmoryView, build: ArmoryBuild | undefined) => undefined
): ZO_DialogInfo {
  const buildIn = (dialog: ZO_DialogData) => view.shownAs(dialog.data["key"])
  return {
    title: { text: title },
    mainText: {
      text: (dialog) => zo_strformat(text, ZO_SELECTED_TEXT.Colorize(buildIn(dialog)?.title ?? "")),
    },
    buttons: [
      {
        text: SI_DIALOG_ACCEPT,
        keybind: "DIALOG_PRIMARY",
        callback: (dialog) => accepted(view, buildIn(dialog)),
      },
      { text: SI_DIALOG_CANCEL, keybind: "DIALOG_NEGATIVE" },
    ],
  }
}

export function addArmoryDialogs(view: ArmoryView): undefined {
  const equipText = SI_ARMORY_BUILD_RESTORE_CONFIRMATION_DIALOG_TEXT
  const saveText = SI_ARMORY_BUILD_SAVE_CONFIRMATION_DIALOG_TEXT
  ZO_Dialogs_RegisterCustomDialog(
    EQUIP_DIALOG,
    confirmDialog(view, SI_ARMORY_RESTORE_BUILD_ACTION, equipText, equip)
  )
  ZO_Dialogs_RegisterCustomDialog(
    SAVE_DIALOG,
    confirmDialog(view, SI_ARMORY_SAVE_BUILD_ACTION, saveText, save)
  )
  ZO_Dialogs_RegisterCustomDialog(SAID_DIALOG, {
    title: { text: SI_ARMORY_RESTORE_BUILD_ACTION },
    mainText: {
      text: (dialog) => {
        const said = dialog.data["said"]
        return typeof said === "string" ? said : ""
      },
    },
    buttons: [{ text: SI_OK, keybind: "DIALOG_NEGATIVE" }],
  })
  return undefined
}
