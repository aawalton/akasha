import {
  Internal,
  Public,
} from "akasha/temper/addon/pages/world/collections/modules/journal-state/journal-state.module.code.ts"
import "akasha/temper/addon/pages/world/collections/journal-string-ids/journal-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-deconstruction/eso-deconstruction.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"

const Controls = Internal.controls

const JOURNAL_EVENT_NAMESPACE = Internal.name + "Journal"

ZO_CreateStringId("SI_KEYBINDINGS_CATEGORY_EXTENDED_JOURNAL", GetString(SI_TEMPER_JOURNAL_NAME))

EVENT_MANAGER.RegisterForEvent(
  JOURNAL_EVENT_NAMESPACE,
  EVENT_ADD_ON_LOADED,
  (_eventCode: number, addonName: string) => {
    if (addonName !== Internal.name) {
      return
    }

    EVENT_MANAGER.UnregisterForEvent(JOURNAL_EVENT_NAMESPACE, EVENT_ADD_ON_LOADED)

    Internal.LoadTooltipColors()

    if (!Public.Used) {
      return
    }

    SI_BINDING_NAME_EXTENDED_JOURNAL = SI_TEMPER_JOURNAL_NAME

    if (
      MAIN_MENU_KEYBOARD.categoryBar !== undefined &&
      MAIN_MENU_KEYBOARD.categoryBarFragment !== undefined
    ) {
      const categoryBar = MAIN_MENU_KEYBOARD.categoryBar
      Controls.mainMenu = categoryBar
      Internal.mainMenuFragment = MAIN_MENU_KEYBOARD.categoryBarFragment
      Internal.FixMainMenuCategory = (): undefined => {
        MAIN_MENU_KEYBOARD.lastCategory = MENU_CATEGORY_CHARACTER
      }

      const iconPrefix = "/esoui/art/treeicons/achievements_indexicon_prologue_"

      ZO_MenuBar_AddButton(categoryBar, {
        descriptor: Internal.name,
        categoryName: SI_TEMPER_JOURNAL_NAME,
        binding: "EXTENDED_JOURNAL",
        normal: iconPrefix + "up.dds",
        pressed: iconPrefix + "down.dds",
        highlight: iconPrefix + "over.dds",
        callback: () => {
          Public.Show()
        },
      })
    } else {
      Internal.FixMainMenuCategory = () => {}
    }
  }
)
