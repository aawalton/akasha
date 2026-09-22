import "akasha/temper/eso/type/eso-extra/eso-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import { asVcControls } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-visit-cards-view/housing-visit-cards-view.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

function vcBdOnMouseEnter(this: void, index: number): undefined {
  const vc = asVcControls(houseTravel.controls.vc)
  const entry = vc.cardEntry !== undefined ? vc.cardEntry[index - 1] : undefined
  if (
    index !== undefined &&
    index > 0 &&
    houseTravel.controls.vc !== undefined &&
    vc.cardEntry !== undefined &&
    entry !== undefined &&
    entry.backdrop !== undefined
  ) {
    const backdrop = entry.backdrop
    const color = houseTravel.config.color
    if (index !== houseTravel.addonState.selectedVisitCard) {
      backdrop.SetCenterColor(
        color.backDropLine.R,
        color.backDropLine.G,
        color.backDropLine.B,
        color.backDropLine.A
      )
      backdrop.SetEdgeColor(color.backDropLine.R, color.backDropLine.G, color.backDropLine.B, 0.0)
    } else {
      backdrop.SetCenterColor(
        color.selectedVisitCardColorOnMouseOver.R,
        color.selectedVisitCardColorOnMouseOver.G,
        color.selectedVisitCardColorOnMouseOver.B,
        color.selectedVisitCardColorOnMouseOver.A
      )
      backdrop.SetEdgeColor(
        color.selectedVisitCardColorOnMouseOver.R,
        color.selectedVisitCardColorOnMouseOver.G,
        color.selectedVisitCardColorOnMouseOver.B,
        0.0
      )
    }
    houseTravel.addonState.highlightedVisitCard = index
  }
}
houseTravel.VCBdOnMouseEnter = vcBdOnMouseEnter

function vcBdOnMouseExit(this: void, index: number): undefined {
  const vc = asVcControls(houseTravel.controls.vc)
  const entry = vc.cardEntry !== undefined ? vc.cardEntry[index - 1] : undefined
  if (
    index !== undefined &&
    index > 0 &&
    houseTravel.controls.vc !== undefined &&
    vc.cardEntry !== undefined &&
    entry !== undefined &&
    entry.backdrop !== undefined
  ) {
    const backdrop = entry.backdrop
    const color = houseTravel.config.color
    if (index !== houseTravel.addonState.selectedVisitCard) {
      backdrop.SetCenterColor(color.backDropLine.R, color.backDropLine.G, color.backDropLine.B, 0.0)
      backdrop.SetEdgeColor(color.backDropLine.R, color.backDropLine.G, color.backDropLine.B, 0.0)
    } else {
      backdrop.SetCenterColor(
        color.selectedVisitCardColor.R,
        color.selectedVisitCardColor.G,
        color.selectedVisitCardColor.B,
        color.selectedVisitCardColor.A
      )
      backdrop.SetEdgeColor(
        color.selectedVisitCardColor.R,
        color.selectedVisitCardColor.G,
        color.selectedVisitCardColor.B,
        0.0
      )
    }
    houseTravel.addonState.highlightedVisitCard = undefined
  }
}
houseTravel.VCBdOnMouseExit = vcBdOnMouseExit

function vcBdOnClick(this: void, index: number): undefined {
  if (index !== undefined && tonumber(index) !== undefined) {
    if (houseTravel.savedVars === undefined) {
      return
    }
    const vc = asVcControls(houseTravel.controls.vc)
    const card = houseTravel.savedVars.vc.receivedCards[index - 1]
    if (card === undefined) {
      return
    }
    vc.nameLabel.SetText((houseTravel.constants.VC_PLAYER ?? "") + card.name)
    vc.houseLabel.SetText((houseTravel.constants.VC_HOUSE ?? "") + houseTravel.HOUSES[card.houseId])
    houseTravel.addonState.selectedVisitCard = index
    if (houseTravel.controls.vc !== undefined && vc.cardEntry !== undefined) {
      for (let i = 1; i <= vc.cardEntry.length; i = i + 1) {
        houseTravel.VCBdOnMouseExit(i)
      }
    }
    houseTravel.VCBdOnMouseEnter(index)
    vc.addFavoriteButton.SetEnabled(true)
    vc.vcButton.SetEnabled(true)
    vc.portButton.SetEnabled(true)
    vc.removeButton.SetEnabled(true)
  }
}
houseTravel.VCBdOnClick = vcBdOnClick

function vcAddFavorite(this: void): undefined {
  if (
    houseTravel.addonState.selectedVisitCard !== undefined &&
    houseTravel.addonState.selectedVisitCard > 0 &&
    houseTravel.savedVars !== undefined &&
    houseTravel.savedVars.vc !== undefined &&
    houseTravel.savedVars.vc.receivedCards !== undefined &&
    houseTravel.addonState.selectedVisitCard <= houseTravel.savedVars.vc.receivedCards.length
  ) {
    const card =
      houseTravel.savedVars.vc.receivedCards[houseTravel.addonState.selectedVisitCard - 1]
    if (card === undefined) {
      return
    }
    const name = card.name
    const houseId = card.houseId
    houseTravel.AddFavorite(name, houseId)
  }
}
houseTravel.VCAddFavorite = vcAddFavorite

function vcSendVC(this: void): undefined {
  if (
    houseTravel.addonState.selectedVisitCard !== undefined &&
    houseTravel.addonState.selectedVisitCard > 0 &&
    houseTravel.savedVars !== undefined &&
    houseTravel.savedVars.vc !== undefined &&
    houseTravel.savedVars.vc.receivedCards !== undefined &&
    houseTravel.addonState.selectedVisitCard <= houseTravel.savedVars.vc.receivedCards.length
  ) {
    const card =
      houseTravel.savedVars.vc.receivedCards[houseTravel.addonState.selectedVisitCard - 1]
    if (card === undefined) {
      return
    }
    const name = card.name
    const houseId = card.houseId
    if (name !== undefined && houseId !== undefined) {
      houseTravel.SendVisitCardOf(name, houseId, houseTravel.constants.sendBasicComment)
    }
  }
}
houseTravel.VCSendVC = vcSendVC

function vcPort(this: void): undefined {
  if (
    houseTravel.addonState.selectedVisitCard !== undefined &&
    houseTravel.addonState.selectedVisitCard > 0 &&
    houseTravel.savedVars !== undefined &&
    houseTravel.savedVars.vc !== undefined &&
    houseTravel.savedVars.vc.receivedCards !== undefined &&
    houseTravel.addonState.selectedVisitCard <= houseTravel.savedVars.vc.receivedCards.length
  ) {
    const card =
      houseTravel.savedVars.vc.receivedCards[houseTravel.addonState.selectedVisitCard - 1]
    if (card === undefined) {
      return
    }
    const name = card.name
    const houseId = card.houseId
    if (name !== undefined && houseId !== undefined) {
      const numericHouseId = tonumber(houseId)
      if (numericHouseId !== undefined) {
        houseTravel.JumpToHouse(zo_strtrim(name), numericHouseId)
      }
      if (houseTravel.savedVars.port_mode === houseTravel.constants.PORT_MODE_ON_CLICK) {
        houseTravel.CloseWindow()
      }
    }
  }
}
houseTravel.VCPort = vcPort

function vcRemoveVC(this: void): undefined {
  if (
    houseTravel.addonState.selectedVisitCard !== undefined &&
    houseTravel.addonState.selectedVisitCard > 0 &&
    houseTravel.savedVars !== undefined &&
    houseTravel.savedVars.vc !== undefined &&
    houseTravel.savedVars.vc.receivedCards !== undefined &&
    houseTravel.addonState.selectedVisitCard <= houseTravel.savedVars.vc.receivedCards.length
  ) {
    const vc = asVcControls(houseTravel.controls.vc)
    houseTravel.savedVars.vc.receivedCards.splice(houseTravel.addonState.selectedVisitCard - 1, 1)
    houseTravel.addonState.taintedVisitCards = true
    houseTravel.addonState.selectedVisitCard = -1
    vc.nameLabel.SetText(houseTravel.constants.VC_PLAYER ?? "")
    vc.houseLabel.SetText(houseTravel.constants.VC_HOUSE ?? "")
    vc.addFavoriteButton.SetEnabled(false)
    vc.vcButton.SetEnabled(false)
    vc.portButton.SetEnabled(false)
    vc.removeButton.SetEnabled(false)
    houseTravel.UpdateVisitCardList()
  }
}
houseTravel.VCRemoveVC = vcRemoveVC
