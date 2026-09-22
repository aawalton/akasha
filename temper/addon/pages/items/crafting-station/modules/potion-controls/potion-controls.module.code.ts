import { asBoolean } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-casts/potion-casts.module.code.ts"
import { asFields } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-controls-helpers/potion-controls-helpers.module.code.ts"
import { getSavedFavorites } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-state/potion-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-addon-screen/eso-addon-screen.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-alchemy-station/eso-alchemy-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

type LinkBuilder = (this: void, ...args: unknown[]) => string

function asLinkBuilder(value: unknown): LinkBuilder {
  return value as LinkBuilder
}

function returnItemLink(this: void, itemLink: string): string {
  const [swapped] = string.gsub(itemLink, "|H0", "|H1")
  return swapped
}

function reagentClicked(this: void, sender: Control, button: number): undefined {
  const fields = asFields(sender)
  const reagent = fields.reagent
  if (
    button === MOUSE_BUTTON_INDEX_RIGHT &&
    IsChatSystemAvailableForCurrentPlatform() &&
    reagent !== undefined
  ) {
    ClearMenu()
    AddCustomMenuItem(GetString(SI_ITEM_ACTION_LINK_TO_CHAT), function (this: void): undefined {
      const stored = PotMaker.allReagents[reagent.itemId]
      if (stored !== undefined && stored.itemLink !== undefined) {
        ZO_LinkHandler_InsertLink(
          ZO_LinkHandler_CreateChatLink(asLinkBuilder(returnItemLink), stored.itemLink)
        )
      }
    })
    ShowMenu(sender)
  }
}
PotMaker.ReagentClicked = reagentClicked

function potionClicked(this: void, sender: Control, button: number): undefined {
  const fields = asFields(sender)
  const potion = fields.potion
  if (button === MOUSE_BUTTON_INDEX_LEFT) {
    PotMaker.Potion.show(sender)
  } else if (
    button === MOUSE_BUTTON_INDEX_RIGHT &&
    IsChatSystemAvailableForCurrentPlatform() &&
    potion !== undefined &&
    potion.itemLink !== ""
  ) {
    ClearMenu()
    if (PotMaker.atAlchemyStation) {
      AddCustomMenuItem(GetString(SI_HOUSING_EDITOR_SELECT), function (this: void): undefined {
        PotMaker.Potion.show(sender)
      })
    }
    AddCustomMenuItem(GetString(SI_ITEM_ACTION_LINK_TO_CHAT), function (this: void): undefined {
      ZO_LinkHandler_InsertLink(
        ZO_LinkHandler_CreateChatLink(asLinkBuilder(returnItemLink), potion.itemLink)
      )
    })
    const savedFavorites = getSavedFavorites()
    if (savedFavorites[potion.itemId] !== undefined) {
      AddCustomMenuItem(PotMaker.language.unmark_favorite, function (this: void): undefined {
        delete savedFavorites[potion.itemId]
        PotMaker.initFavorites()
        PotMaker.RenderPage()
      })
    } else {
      AddCustomMenuItem(PotMaker.language.mark_favorite, function (this: void): undefined {
        savedFavorites[potion.itemId] = {
          samePotion: asBoolean(potion.samePotionId),
          sameTraits: asBoolean(potion.sameTraitsId),
        }
        PotMaker.initFavorites()
        PotMaker.RenderPage()
      })
    }
    ShowMenu(sender)
  }
}
PotMaker.PotionClicked = potionClicked

function solventClicked(this: void, sender: Control, button: number): undefined {
  const fields = asFields(sender)
  const solvent = fields.solvent
  if (
    button === MOUSE_BUTTON_INDEX_RIGHT &&
    IsChatSystemAvailableForCurrentPlatform() &&
    solvent !== undefined
  ) {
    ClearMenu()
    AddCustomMenuItem(GetString(SI_ITEM_ACTION_LINK_TO_CHAT), function (this: void): undefined {
      const pack = solvent.pack[0]
      if (pack !== undefined) {
        ZO_LinkHandler_InsertLink(
          ZO_LinkHandler_CreateChatLink(asLinkBuilder(GetItemLink), pack.bagId, pack.slotIndex)
        )
      }
    })
    ShowMenu(sender)
  }
}
PotMaker.SolventClicked = solventClicked
