import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-interface-extra-2"
import "@akasha/temper-eso-types/eso-objects-01"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"
import type { Favorite } from "../housing-types/housing-types.module.code.ts"

interface HousePanel {
  scrollPanel: Control
}
function asHousePanel(value: unknown): HousePanel {
  return value as HousePanel
}

interface FavoriteRow {
  backDrop?: BackdropControl
  name?: LabelControl
  house?: LabelControl
  VCButton?: ButtonControl
  portButton?: ButtonControl
  removeButton?: ButtonControl
}
function asFavoriteRow(value: unknown): FavoriteRow {
  return value as FavoriteRow
}

interface VirtualButtonFactory {
  CreateControlFromVirtual: (
    this: VirtualButtonFactory,
    name: string | undefined,
    parent: Control | undefined,
    virtualName: string
  ) => ButtonControl
}
function asVirtualButtonFactory(value: unknown): VirtualButtonFactory {
  return value as VirtualButtonFactory
}

interface SavedFavorites {
  favorites: Favorite[] | undefined
}
function asSavedFavorites(value: unknown): SavedFavorites {
  return value as SavedFavorites
}

function asString(value: unknown): string {
  return value as string
}

interface FiveArgEdge {
  SetEdgeColor: (
    this: FiveArgEdge,
    r: number,
    g: number,
    b: number,
    a: number,
    inner: number
  ) => void
}
function asFiveArgEdge(value: unknown): FiveArgEdge {
  return value as FiveArgEdge
}

function createFavorites(this: void): undefined {
  const savedVars = asSavedFavorites(portToFriend.savedVars)
  if (savedVars.favorites !== undefined) {
    portToFriend.SortFriends()
    const favorites = savedVars.favorites
    const house = asHousePanel(portToFriend.controls.house)
    const color = portToFriend.config.color
    const headerFont = portToFriend.config.fonts.header

    for (let i = 0; i < favorites.length; i++) {
      const favorite = favorites[i]
      if (favorite === undefined) {
        continue
      }
      if (portToFriend.controls.favorites[i] === undefined) {
        portToFriend.controls.favorites[i] = {}
      }
      const row = asFavoriteRow(portToFriend.controls.favorites[i])

      if (row.backDrop === undefined) {
        row.backDrop = WINDOW_MANAGER.CreateControl(undefined, house.scrollPanel, CT_BACKDROP)
      }
      const backDrop = row.backDrop
      backDrop.SetDimensions(portToFriend.config.size.width - 30, 25)
      backDrop.SetHidden(false)
      backDrop.ClearAnchors()
      backDrop.SetAnchor(TOPLEFT, house.scrollPanel, TOPLEFT, 5, 25 * i + 15)
      backDrop.SetCenterColor(color.backDropLine.R, color.backDropLine.G, color.backDropLine.B, 0.0)
      asFiveArgEdge(backDrop).SetEdgeColor(
        color.backDropLine.R,
        color.backDropLine.G,
        color.backDropLine.B,
        0.0,
        0
      )
      backDrop.SetAlpha(1)

      if (row.name === undefined) {
        row.name = WINDOW_MANAGER.CreateControl(undefined, backDrop, CT_LABEL)
      }
      const nameLabel = row.name
      nameLabel.SetDimensions(220, 25)
      nameLabel.SetHidden(false)
      nameLabel.ClearAnchors()
      nameLabel.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 0, 0)
      nameLabel.SetText(favorite.name)
      nameLabel.SetFont(headerFont)
      nameLabel.SetColor(color.default.R, color.default.G, color.default.B)
      nameLabel.SetMouseEnabled(true)
      nameLabel.SetHandler("OnMouseEnter", () => {
        portToFriend.BdOnMouseEnter(i)
      })
      nameLabel.SetHandler("OnMouseExit", () => {
        portToFriend.BdOnMouseExit(i)
      })

      if (row.house === undefined) {
        row.house = WINDOW_MANAGER.CreateControl(undefined, backDrop, CT_LABEL)
      }
      const houseLabel = row.house
      houseLabel.SetDimensions(265, 25)
      houseLabel.SetHidden(false)
      houseLabel.ClearAnchors()
      houseLabel.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 215, 0)
      houseLabel.SetText(asString(portToFriend.HOUSES[favorite.houseId]))
      houseLabel.SetFont(headerFont)
      houseLabel.SetColor(color.default.R, color.default.G, color.default.B)
      houseLabel.SetMouseEnabled(true)
      houseLabel.SetHandler("OnMouseEnter", () => {
        portToFriend.BdOnMouseEnter(i)
      })
      houseLabel.SetHandler("OnMouseExit", () => {
        portToFriend.BdOnMouseExit(i)
      })

      portToFriend.CreateFavoriteCombobox(i, 60, 25, 480, 0, backDrop, favorite.id)

      if (row.VCButton === undefined) {
        row.VCButton = asVirtualButtonFactory(WINDOW_MANAGER).CreateControlFromVirtual(
          undefined,
          backDrop,
          "ZO_DefaultButton"
        )
      }
      const vcButton = row.VCButton
      vcButton.SetHidden(false)
      vcButton.ClearAnchors()
      vcButton.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 540, 0)
      vcButton.SetDimensions(50, 25)
      vcButton.SetText(asString(portToFriend.constants.BUTTON_VC))
      vcButton.SetClickSound("Click")
      vcButton.SetHandler("OnClicked", () => {
        portToFriend.FavoriteToVC(i)
      })
      vcButton.SetHandler("OnMouseEnter", () => {
        portToFriend.BdOnMouseEnter(i)
      })
      vcButton.SetHandler("OnMouseExit", () => {
        portToFriend.BdOnMouseExit(i)
      })

      if (row.portButton === undefined) {
        row.portButton = asVirtualButtonFactory(WINDOW_MANAGER).CreateControlFromVirtual(
          undefined,
          backDrop,
          "ZO_DefaultButton"
        )
      }
      const portButton = row.portButton
      portButton.SetHidden(false)
      portButton.ClearAnchors()
      portButton.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 580, 0)
      portButton.SetDimensions(90, 25)
      portButton.SetText(asString(portToFriend.constants.BUTTON_PORT))
      portButton.SetClickSound("Click")
      portButton.SetHandler("OnClicked", () => {
        portToFriend.PortToFavorite(i)
      })
      portButton.SetHandler("OnMouseEnter", () => {
        portToFriend.BdOnMouseEnter(i)
      })
      portButton.SetHandler("OnMouseExit", () => {
        portToFriend.BdOnMouseExit(i)
      })

      if (row.removeButton === undefined) {
        row.removeButton = asVirtualButtonFactory(WINDOW_MANAGER).CreateControlFromVirtual(
          undefined,
          backDrop,
          "ZO_DefaultButton"
        )
      }
      const removeButton = row.removeButton
      removeButton.SetHidden(false)
      removeButton.ClearAnchors()
      removeButton.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 670, 0)
      removeButton.SetDimensions(90, 25)
      removeButton.SetText(asString(portToFriend.constants.BUTTON_REMOVE))
      removeButton.SetClickSound("Click")
      removeButton.SetHandler("OnClicked", () => {
        portToFriend.RemoveFavorite(i)
      })
      removeButton.SetHandler("OnMouseEnter", () => {
        portToFriend.BdOnMouseEnter(i)
      })
      removeButton.SetHandler("OnMouseExit", () => {
        portToFriend.BdOnMouseExit(i)
      })
    }
    house.scrollPanel.SetDimensions(portToFriend.config.size.width - 10, favorites.length * 25 + 15)
    portToFriend.ClearFavoriteControls(favorites.length)
  } else {
    portToFriend.ClearFavoriteControls(0)
  }
  portToFriend.AdjustSliderSize()
}
portToFriend.CreateFavorites = createFavorites
