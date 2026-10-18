import { ROOT_CONTROL_NAME } from "akasha/temper/addon/pages/temper-core/temper-selector/modules/selector-constants/selector-constants.module.code.ts"
import { saveCurrentAsPack } from "akasha/temper/addon/pages/temper-core/temper-selector/modules/selector-packs/selector-packs.module.code.ts"
import { STRINGS } from "akasha/temper/addon/pages/temper-core/temper-selector/modules/selector-strings/selector-strings.module.code.ts"
import { spaceOf } from "akasha/temper/window/modules/window-spacing/window-spacing.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

interface SelectorControls {
  root: Control
  searchBox: EditControl
  packNameEditBox: EditControl
  saveButton: ButtonControl
  deleteButton: ButtonControl
  comboBox: Control
  selectedPackLabel: LabelControl
  settingsButton: ButtonControl
}

const ROOT_WIDTH = 400
const ROOT_OFFSET_X = 10
const LIST_GAP_BELOW_DIVIDER = 40

const SEARCH_WIDTH = 200
const SEARCH_HEIGHT = 20
const SEARCH_OFFSET_X = -5
const SEARCH_OFFSET_Y = 75

const LABEL_WIDTH = 100
const ROW_HEIGHT = 30
const ROW_GAP = spaceOf("2")
const EDITBOX_WIDTH = 200
const EDITBOX_HEIGHT = ROW_HEIGHT
const FIELD_GAP = spaceOf("4")

const BUTTON_WIDTH = 100
const BUTTON_HEIGHT = 30

const DDL_HEIGHT = 30

const SELECTED_LABEL_WIDTH = 500
const SELECTED_LABEL_OFFSET_Y = ROW_GAP

const GEAR_SIZE = 45
const GEAR_OFFSET_X = 100
const GEAR_OFFSET_Y = 65

const ROOT_HEIGHT = ROW_HEIGHT * 3 + ROW_GAP * 2

const LABEL_FONT = "ZoFontWinH5"

const EDIT_BACKDROP = "ZO_EditBackdrop"
const EDIT_IN_BACKDROP = "ZO_DefaultEditForBackdrop"

function editIn(
  this: void,
  name: string,
  parent: Control,
  width: number,
  height: number
): [EditControl, Control] {
  const backdrop = WINDOW_MANAGER.CreateControlFromVirtual(`${name}BG`, parent, EDIT_BACKDROP)
  backdrop.SetDimensions(width, height)
  const edit = WINDOW_MANAGER.CreateControlFromVirtual<EditControl>(
    name,
    backdrop,
    EDIT_IN_BACKDROP
  )
  edit.SetMaxInputChars(64)
  return [edit, backdrop]
}

function makeRoomForPacks(this: void, root: Control, divider: Control): undefined {
  const list = WINDOW_MANAGER.GetControlByName("ZO_AddOnsList")
  if (list === undefined) return
  const wasTop = divider.GetBottom() + LIST_GAP_BELOW_DIVIDER
  list.ClearAnchors()
  list.SetAnchor(TOPLEFT, root, BOTTOMLEFT, -ROOT_OFFSET_X, ROW_GAP)
  const moved = root.GetBottom() + ROW_GAP - wasTop
  if (moved > 0) list.SetHeight(list.GetHeight() - moved)
}

let controls: SelectorControls | undefined

export function getControls(): SelectorControls | undefined {
  return controls
}

export function createSelectorControls(): undefined {
  if (controls !== undefined) {
    return
  }

  const divider = WINDOW_MANAGER.GetControlByName("ZO_AddOnsDivider")
  const addOnsScreen = WINDOW_MANAGER.GetControlByName("ZO_AddOns")
  if (divider === undefined || addOnsScreen === undefined) {
    return
  }

  const root = WINDOW_MANAGER.CreateControl(ROOT_CONTROL_NAME, addOnsScreen, CT_CONTROL)
  root.SetDimensions(ROOT_WIDTH, ROOT_HEIGHT)
  const characters = WINDOW_MANAGER.GetControlByName("ZO_AddOnsCharacterSelectDropdown")
  if (characters === undefined) root.SetAnchor(TOPLEFT, divider, BOTTOMLEFT, ROOT_OFFSET_X, 0)
  else root.SetAnchor(TOPLEFT, characters, BOTTOMLEFT, ROOT_OFFSET_X, ROW_GAP)

  WINDOW_MANAGER.GetControlByName("ZO_AddOnsAdvancedUIErrors")?.SetHidden(true)

  const [searchBox, searchField] = editIn(
    `${ROOT_CONTROL_NAME}SearchBox`,
    root,
    SEARCH_WIDTH,
    SEARCH_HEIGHT
  )
  searchField.SetAnchor(TOPRIGHT, addOnsScreen, TOPRIGHT, SEARCH_OFFSET_X, SEARCH_OFFSET_Y)

  const searchLabel = WINDOW_MANAGER.CreateControl(
    `${ROOT_CONTROL_NAME}SearchLabel`,
    searchBox,
    CT_LABEL
  )
  searchLabel.SetFont(LABEL_FONT)
  searchLabel.SetText(STRINGS.addonSearch)
  searchLabel.SetHorizontalAlignment(TEXT_ALIGN_RIGHT)
  searchLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  searchLabel.SetAnchor(RIGHT, searchField, LEFT, -10, 0)

  const nameLabel = WINDOW_MANAGER.CreateControl(`${ROOT_CONTROL_NAME}NameLabel`, root, CT_LABEL)
  nameLabel.SetDimensions(LABEL_WIDTH, ROW_HEIGHT)
  nameLabel.SetFont(LABEL_FONT)
  nameLabel.SetText(STRINGS.packName)
  nameLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  nameLabel.SetAnchor(TOPLEFT, root, TOPLEFT, 0, 0)

  const [packNameEditBox, packNameField] = editIn(
    `${ROOT_CONTROL_NAME}EditBox`,
    root,
    EDITBOX_WIDTH,
    EDITBOX_HEIGHT
  )
  packNameField.SetAnchor(TOPLEFT, nameLabel, TOPRIGHT, FIELD_GAP, 0)

  const saveButton = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    `${ROOT_CONTROL_NAME}Save`,
    root,
    "ZO_DefaultButton"
  )
  saveButton.SetDimensions(BUTTON_WIDTH, BUTTON_HEIGHT)
  saveButton.SetText(STRINGS.saveButton)
  saveButton.SetAnchor(TOPLEFT, packNameField, TOPRIGHT, FIELD_GAP, 0)
  saveButton.SetHandler("OnClicked", function (this: void): undefined {
    onSaveClicked()
  })

  const selectLabel = WINDOW_MANAGER.CreateControl(
    `${ROOT_CONTROL_NAME}SelectLabel`,
    root,
    CT_LABEL
  )
  selectLabel.SetDimensions(LABEL_WIDTH, ROW_HEIGHT)
  selectLabel.SetFont(LABEL_FONT)
  selectLabel.SetText(STRINGS.selectPack)
  selectLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  selectLabel.SetAnchor(TOPLEFT, nameLabel, BOTTOMLEFT, 0, ROW_GAP)

  const selectedPackLabel = WINDOW_MANAGER.CreateControl(
    `${ROOT_CONTROL_NAME}SelectedPackNameLabel`,
    root,
    CT_LABEL
  )
  selectedPackLabel.SetDimensions(SELECTED_LABEL_WIDTH, ROW_HEIGHT)
  selectedPackLabel.SetFont(LABEL_FONT)
  selectedPackLabel.SetText("")
  selectedPackLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  selectedPackLabel.SetAnchor(TOPLEFT, selectLabel, BOTTOMLEFT, 0, SELECTED_LABEL_OFFSET_Y)

  const comboBox = WINDOW_MANAGER.CreateControlFromVirtual(
    `${ROOT_CONTROL_NAME}ddl`,
    root,
    "ZO_ComboBox"
  )
  comboBox.SetDimensions(EDITBOX_WIDTH, DDL_HEIGHT)
  comboBox.SetMouseEnabled(true)
  comboBox.SetAnchor(TOPLEFT, selectLabel, TOPRIGHT, FIELD_GAP, 0)

  const deleteButton = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    `${ROOT_CONTROL_NAME}Delete`,
    root,
    "ZO_DefaultButton"
  )
  deleteButton.SetDimensions(BUTTON_WIDTH, BUTTON_HEIGHT)
  deleteButton.SetText(STRINGS.deleteButton)
  deleteButton.SetAnchor(TOPLEFT, comboBox, TOPRIGHT, FIELD_GAP, 0)
  deleteButton.SetHandler("OnClicked", function (this: void): undefined {
    onDeleteClicked()
  })

  const settingsButton = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    `${ROOT_CONTROL_NAME}SettingsOpenDropdown`,
    root,
    "ZO_DropdownButton"
  )
  settingsButton.SetDimensions(GEAR_SIZE, GEAR_SIZE)
  settingsButton.SetNormalTexture("esoui/art/chatwindow/chat_options_up.dds")
  settingsButton.SetPressedTexture("esoui/art/chatwindow/chat_options_down.dds")
  settingsButton.SetMouseOverTexture("esoui/art/chatwindow/chat_options_over.dds")
  settingsButton.SetAnchor(TOPLEFT, addOnsScreen, TOP, GEAR_OFFSET_X, GEAR_OFFSET_Y)
  settingsButton.SetHandler("OnClicked", function (this: void): undefined {
    onSettingsClicked(settingsButton)
  })

  makeRoomForPacks(root, divider)

  controls = {
    root,
    searchBox,
    packNameEditBox,
    saveButton,
    deleteButton,
    comboBox,
    selectedPackLabel,
    settingsButton,
  }
}

function onSaveClicked(): undefined {
  if (controls === undefined) {
    return
  }
  const packName = controls.packNameEditBox.GetText()
  if (packName === "") {
    return
  }
  saveCurrentAsPack(packName)
}

function onDeleteClicked(): undefined {
  deleteSelectedPackViaDropdown()
}

let deleteSelectedPack: (() => void) | undefined

export function setDeleteHandler(handler: () => void): undefined {
  deleteSelectedPack = handler
}

function deleteSelectedPackViaDropdown(): undefined {
  if (deleteSelectedPack !== undefined) {
    deleteSelectedPack()
  }
}

let openSettingsMenu: ((owner: object) => void) | undefined

export function setSettingsHandler(handler: (owner: object) => void): undefined {
  openSettingsMenu = handler
}

function onSettingsClicked(owner: object): undefined {
  if (openSettingsMenu !== undefined) {
    openSettingsMenu(owner)
  }
}
