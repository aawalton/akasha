import "akasha/temper/eso/type/eso-addon-list/eso-addon-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-alchemy-station/eso-alchemy-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-armory/eso-armory.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-fonts/eso-fonts.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"
import {
  type ArmoryView,
  addArmoryDialogs,
  armoryKeybinds,
  saveNewBuild,
} from "akasha/temper/addon/pages/characters/modules/characters-armory-actions/characters-armory-actions.module.code.ts"
import { armoryBuildDataOf } from "akasha/temper/addon/pages/characters/modules/characters-armory-build-data/characters-armory-build-data.module.code.ts"
import {
  type ArmoryBuild,
  armoryBuilds,
  settlePending,
} from "akasha/temper/addon/pages/characters/modules/characters-armory-pending/characters-armory-pending.module.code.ts"
import {
  type ArmoryRow,
  addArmoryRows,
  COLLAPSED_ROW,
  EXPANDED_ROW,
  NEW_BUILD_ROW,
} from "akasha/temper/addon/pages/characters/modules/characters-armory-rows/characters-armory-rows.module.code.ts"
import {
  currentCharacterTarget,
  currentCharacterTargets,
} from "akasha/temper/addon/pages/characters/modules/characters-build-checklist/characters-build-checklist.module.code.ts"
import {
  colorText,
  textColorOf,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"

const WINDOW_NAME = "TemperCharactersArmory"

const SCENE_NAME = "temperCharactersArmory"

const TITLE = "Temper Armory"

const WIDTH = 645

const HEIGHT = 730

const SETTLE_SAID_MS = 5000

interface Armory {
  readonly window: TopLevelWindow
  readonly list: Control
  readonly count: LabelControl
}

let held: Armory | undefined

let shown: readonly ArmoryBuild[] = []

let selectedKey: string | undefined

const VIEW: ArmoryView = {
  selected: () => shown.find((build) => build.key === selectedKey),
  shownAs: (key) =>
    typeof key === "string" ? shown.find((build) => build.key === key) : undefined,
  count: () => shown.length,
  refresh: () => refresh(),
  choose: (key) => {
    selectedKey = key
    return undefined
  },
}

const KEYBINDS = armoryKeybinds(VIEW)

function refresh(): undefined {
  if (held === undefined) return undefined
  shown = armoryBuilds(currentCharacterTargets())
  if (VIEW.selected() === undefined) selectedKey = undefined
  held.count.SetText(zo_strformat(SI_ARMORY_UNLOCKED_BUILD_COUNT, shown.length))
  ZO_ScrollList_Clear(held.list)
  const rows = ZO_ScrollList_GetDataList<ArmoryRow>(held.list)
  if (rows !== undefined) {
    shown.forEach((build, at) => {
      const kind = build.key === selectedKey ? EXPANDED_ROW : COLLAPSED_ROW
      const data = armoryBuildDataOf(build, at + 1)
      rows.push(ZO_ScrollList_CreateDataEntry<ArmoryRow>(kind, { build, data }))
    })
    rows.push(ZO_ScrollList_CreateDataEntry<ArmoryRow>(NEW_BUILD_ROW, {}))
  }
  ZO_ScrollList_Commit(held.list)
  KEYBIND_STRIP.UpdateKeybindButtonGroup(KEYBINDS)
  return undefined
}

function select(key: string | undefined): undefined {
  if (key === selectedKey) return undefined
  const sound = key === undefined ? "ARMORY_BUILD_SLOT_COLLAPSED" : "ARMORY_BUILD_SLOT_EXPANDED"
  PlaySound(SOUNDS[sound])
  selectedKey = key
  refresh()
  const at = shown.findIndex((build) => build.key === key)
  if (held !== undefined && at >= 0) {
    ZO_ScrollList_ScrollDataIntoView(held.list, at + 1, undefined, true)
  }
  return undefined
}

function headingLabel(name: string, parent: Control, font: string): LabelControl {
  const label = WINDOW_MANAGER.CreateControl(name, parent, CT_LABEL)
  label.SetFont(font)
  colorText(label, textColorOf(INTERFACE_TEXT_COLOR_SELECTED))
  return label
}

function createArmory(): Armory {
  const window = WINDOW_MANAGER.CreateTopLevelWindow(WINDOW_NAME)
  window.SetHidden(true)
  window.SetDimensions(WIDTH, HEIGHT)
  window.SetAnchor(RIGHT, GuiRoot, RIGHT, 0, 18)
  const section = WINDOW_MANAGER.CreateControl(`${WINDOW_NAME}TitleSection`, window, CT_CONTROL)
  section.SetAnchor(TOPLEFT, window, TOPLEFT, 0, 0)
  section.SetDimensions(WIDTH - 40, 32)
  const header = headingLabel(`${WINDOW_NAME}TitleSectionHeader`, section, "ZoFontHeader4")
  header.SetModifyTextType(MODIFY_TEXT_TYPE_UPPERCASE)
  header.SetText(TITLE)
  header.SetAnchor(LEFT, section, LEFT, 0, 0)
  const count = headingLabel(`${WINDOW_NAME}TitleSectionBuildCount`, section, "ZoFontHeader2")
  count.SetAnchor(RIGHT, section, RIGHT, 0, 0)
  const divider = WINDOW_MANAGER.CreateControlFromVirtual(
    `${WINDOW_NAME}Divider`,
    window,
    "ZO_DynamicHorizontalDivider"
  )
  divider.SetAnchor(TOPLEFT, window, TOPLEFT, 0, 35)
  divider.SetAnchor(RIGHT, window, RIGHT, -40, 0, ANCHOR_CONSTRAINS_X)
  const list = WINDOW_MANAGER.CreateControlFromVirtual(
    `${WINDOW_NAME}List`,
    window,
    "ZO_ScrollList"
  )
  list.SetAnchor(TOPLEFT, section, BOTTOMLEFT, 0, 30)
  list.SetAnchor(BOTTOMRIGHT, window, BOTTOMRIGHT, -20, 0)
  addArmoryRows(list, { select, saveNew: () => saveNewBuild(VIEW) })
  return { window, list, count }
}

function addScene(armory: Armory): undefined {
  const scene = ZO_Scene.New(SCENE_NAME, SCENE_MANAGER)
  const groups: Readonly<Record<string, object | undefined>> = FRAGMENT_GROUP
  scene.AddFragmentGroup(FRAGMENT_GROUP.MOUSE_DRIVEN_UI_WINDOW)
  const equipped = groups["READ_ONLY_EQUIPPED_ITEMS"]
  if (equipped !== undefined) scene.AddFragmentGroup(equipped)
  scene.AddFragment(STATS_BG_FRAGMENT)
  scene.AddFragment(ZO_FadeSceneFragment.New(armory.window))
  scene.AddFragment(MINIMIZE_CHAT_FRAGMENT)
  scene.RegisterCallback("StateChange", (_oldState, newState) => {
    if (newState === SCENE_SHOWING) {
      ZO_ARMORY_MANAGER.PerformDeferredInitialization()
      PlaySound(SOUNDS["ARMORY_OPEN"])
      KEYBIND_STRIP.AddKeybindButtonGroup(KEYBINDS)
      selectedKey ??= currentCharacterTarget()?.buildId
      refresh()
    } else if (newState === SCENE_HIDDEN) {
      KEYBIND_STRIP.RemoveKeybindButtonGroup(KEYBINDS)
    }
  })
  return undefined
}

export function toggleArmory(this: void): undefined {
  if (held !== undefined) SCENE_MANAGER.Toggle(SCENE_NAME)
  return undefined
}

function sayUnkept(): undefined {
  const said: string[] = []
  settlePending(currentCharacterTargets(), (text) => {
    said.push(text)
    return undefined
  })
  if (said.length === 0) return undefined
  zo_callLater(() => {
    for (const line of said) d(`[${TITLE}] ${line}`)
  }, SETTLE_SAID_MS)
  return undefined
}

export function initializeArmory(): undefined {
  if (held !== undefined) return undefined
  held = createArmory()
  addScene(held)
  addArmoryDialogs(VIEW)
  SLASH_COMMANDS["/temperarmory"] = toggleArmory
  ZO_CreateStringId("SI_BINDING_NAME_TEMPER_TOGGLE_ARMORY", `Toggle ${TITLE}`)
  return sayUnkept()
}
