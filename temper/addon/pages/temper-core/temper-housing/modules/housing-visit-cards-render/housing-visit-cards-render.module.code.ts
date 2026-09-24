import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import type { VisitCard } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-types/housing-types.module.code.ts"
import {
  asControl,
  asVcBackdropControl,
  asVcControls,
  asVcEntryButton,
} from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-visit-cards-view/housing-visit-cards-view.module.code.ts"

const wm = WINDOW_MANAGER

type VcIndex = number
function asVcIndex(value: number | undefined): VcIndex {
  return value as VcIndex
}

function sortVisitCards(this: void): undefined {
  if (houseTravel.savedVars !== undefined && houseTravel.savedVars.vc.receivedCards !== undefined) {
    const cards = houseTravel.savedVars.vc.receivedCards
    let itemCount = cards.length
    let hasChanged = false
    do {
      hasChanged = false
      itemCount = itemCount - 1
      for (let i = 0; i < itemCount; i = i + 1) {
        const current = cards[i]
        const next = cards[i + 1]
        if (current === undefined || next === undefined) {
          continue
        }
        if (current.name > next.name) {
          cards[i] = next
          cards[i + 1] = current
          hasChanged = true
        } else if (current.name === next.name) {
          const currentHouse = houseTravel.HOUSES[current.houseId]
          const nextHouse = houseTravel.HOUSES[next.houseId]
          if (currentHouse !== undefined && nextHouse !== undefined && currentHouse > nextHouse) {
            cards[i] = next
            cards[i + 1] = current
            hasChanged = true
          }
        }
      }
    } while (hasChanged !== false)
    return undefined
  }
  return undefined
}
houseTravel.SortVisitCards = sortVisitCards

function refreshVisitCards(this: void): undefined {
  if (
    houseTravel.controls.vc !== undefined &&
    houseTravel.savedVars !== undefined &&
    houseTravel.savedVars.vc !== undefined &&
    houseTravel.savedVars.vc.receivedCards !== undefined
  ) {
    const vc = asVcControls(houseTravel.controls.vc)
    const receivedCards = houseTravel.savedVars.vc.receivedCards
    if (vc.cardEntry === undefined) {
      vc.cardEntry = []
    }
    const cardEntry = vc.cardEntry
    const color = houseTravel.config.color
    const scrollPanel = asControl(vc.scrollPanel)
    for (let i = 0; i < receivedCards.length; i = i + 1) {
      const cardNumber = i + 1
      if (cardEntry[i] === undefined) {
        const backdrop = asVcBackdropControl(wm.CreateControl(undefined, scrollPanel, CT_BACKDROP))
        const backdropControl = asControl(backdrop)
        cardEntry[i] = {
          backdrop,
          name: asVcEntryButton(wm.CreateControl(undefined, backdropControl, CT_BUTTON)),
          house: asVcEntryButton(wm.CreateControl(undefined, backdropControl, CT_BUTTON)),
        }
      }
      const entry = cardEntry[i]
      const card = receivedCards[i]
      if (entry === undefined || card === undefined) {
        continue
      }
      const houseName = houseTravel.HOUSES[card.houseId] ?? ""
      const backdropControl = asControl(entry.backdrop)

      entry.backdrop.SetDimensions(houseTravel.config.size.width - 30, 25)
      entry.backdrop.SetHidden(false)
      entry.backdrop.ClearAnchors()
      entry.backdrop.SetAnchor(TOPLEFT, scrollPanel, TOPLEFT, 5, 25 * i)
      if (cardNumber !== houseTravel.addonState.selectedVisitCard) {
        entry.backdrop.SetCenterColor(
          color.backDropLine.R,
          color.backDropLine.G,
          color.backDropLine.B,
          0.0
        )
        entry.backdrop.SetEdgeColor(
          color.backDropLine.R,
          color.backDropLine.G,
          color.backDropLine.B,
          0.0,
          0
        )
      } else {
        entry.backdrop.SetCenterColor(
          color.selectedVisitCardColor.R,
          color.selectedVisitCardColor.G,
          color.selectedVisitCardColor.B,
          color.selectedVisitCardColor.A
        )
        entry.backdrop.SetEdgeColor(
          color.selectedVisitCardColor.R,
          color.selectedVisitCardColor.G,
          color.selectedVisitCardColor.B,
          0.0
        )
      }
      entry.backdrop.SetAlpha(1)

      entry.name.SetDimensions(240, 25)
      entry.name.SetHidden(false)
      entry.name.ClearAnchors()
      entry.name.SetAnchor(TOPLEFT, backdropControl, TOPLEFT, 0, 0)
      entry.name.SetText(card.name)
      entry.name.SetFont(houseTravel.config.fonts.header)
      entry.name.SetMouseEnabled(true)
      entry.name.SetHandler("OnMouseEnter", () => {
        houseTravel.VCBdOnMouseEnter(cardNumber)
      })
      entry.name.SetHandler("OnMouseExit", () => {
        houseTravel.VCBdOnMouseExit(cardNumber)
      })
      entry.name.SetHandler("OnClicked", () => {
        houseTravel.VCBdOnClick(cardNumber)
      })
      entry.name.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
      entry.name.SetNormalFontColor(
        color.visitCardFontColor.R,
        color.visitCardFontColor.G,
        color.visitCardFontColor.B,
        color.visitCardFontColor.A
      )
      entry.name.SetPressedFontColor(
        color.visitCardFontColor.R,
        color.visitCardFontColor.G,
        color.visitCardFontColor.B,
        color.visitCardFontColor.A
      )
      entry.name.SetMouseOverFontColor(
        color.visitCardFontColor.R,
        color.visitCardFontColor.G,
        color.visitCardFontColor.B,
        color.visitCardFontColor.A
      )

      entry.house.SetDimensions(500, 25)
      entry.house.SetHidden(false)
      entry.house.ClearAnchors()
      entry.house.SetAnchor(TOPLEFT, backdropControl, TOPLEFT, 215, 0)
      entry.house.SetText(houseName)
      entry.house.SetFont(houseTravel.config.fonts.header)
      entry.house.SetMouseEnabled(true)
      entry.house.SetHandler("OnMouseEnter", () => {
        houseTravel.VCBdOnMouseEnter(cardNumber)
      })
      entry.house.SetHandler("OnMouseExit", () => {
        houseTravel.VCBdOnMouseExit(cardNumber)
      })
      entry.house.SetHandler("OnClicked", () => {
        houseTravel.VCBdOnClick(cardNumber)
      })
      entry.house.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
      entry.house.SetNormalFontColor(
        color.visitCardFontColor.R,
        color.visitCardFontColor.G,
        color.visitCardFontColor.B,
        color.visitCardFontColor.A
      )
      entry.house.SetPressedFontColor(
        color.visitCardFontColor.R,
        color.visitCardFontColor.G,
        color.visitCardFontColor.B,
        color.visitCardFontColor.A
      )
      entry.house.SetMouseOverFontColor(
        color.visitCardFontColor.R,
        color.visitCardFontColor.G,
        color.visitCardFontColor.B,
        color.visitCardFontColor.A
      )
    }
    for (let i = receivedCards.length; i < cardEntry.length; i = i + 1) {
      const entry = cardEntry[i]
      if (entry !== undefined) {
        const backdropControl = asControl(entry.backdrop)
        entry.backdrop.SetHidden(true)
        entry.backdrop.SetDimensions(0, 0)
        entry.backdrop.ClearAnchors()
        entry.backdrop.SetAnchor(TOPLEFT, scrollPanel, TOPLEFT, 0, 0)

        entry.name.SetHidden(true)
        entry.name.SetDimensions(0, 0)
        entry.name.ClearAnchors()
        entry.name.SetAnchor(TOPLEFT, backdropControl, TOPLEFT, 0, 0)

        entry.house.SetHidden(true)
        entry.house.SetDimensions(0, 0)
        entry.house.ClearAnchors()
        entry.house.SetAnchor(TOPLEFT, backdropControl, TOPLEFT, 0, 0)
      }
    }
    vc.scrollPanel.SetDimensions(houseTravel.config.size.width - 10, receivedCards.length * 25)
    houseTravel.VCBdOnMouseEnter(asVcIndex(houseTravel.addonState.highlightedVisitCard))
  } else {
  }
  houseTravel.AdjustVCSliderSize()
}
houseTravel.RefreshVisitCards = refreshVisitCards

function adjustVCSliderSize(this: void): undefined {
  if (houseTravel.savedVars === undefined) {
    return
  }
  const vc = asVcControls(houseTravel.controls.vc)
  const totalSize = 25 * houseTravel.savedVars.vc.receivedCards.length + 40
  const screenSize =
    houseTravel.config.vc.size.height -
    houseTravel.config.vc.size.headerHeightOffset -
    houseTravel.config.vc.size.headerHeight -
    houseTravel.config.vc.size.gap -
    95

  if (totalSize <= screenSize) {
    if (houseTravel.addonState.isVCScrollable === true) {
      vc.slider.SetValue(0)
    }
    vc.slider.SetHidden(true)
    houseTravel.addonState.isVCScrollable = false
  } else {
    vc.slider.SetHidden(false)
    houseTravel.addonState.isVCScrollable = true
  }
}
houseTravel.AdjustVCSliderSize = adjustVCSliderSize

function updateVisitCardList(this: void): undefined {
  if (houseTravel.controls.vc !== undefined) {
    if (houseTravel.addonState.taintedVisitCards === true) {
      let selectedEntry: VisitCard | undefined
      if (
        houseTravel.addonState.selectedVisitCard > 0 &&
        houseTravel.savedVars !== undefined &&
        houseTravel.savedVars.vc !== undefined &&
        houseTravel.savedVars.vc.receivedCards !== undefined
      ) {
        selectedEntry =
          houseTravel.savedVars.vc.receivedCards[houseTravel.addonState.selectedVisitCard - 1]
      }
      houseTravel.SortVisitCards()
      if (selectedEntry !== undefined && houseTravel.savedVars !== undefined) {
        for (let i = 0; i < houseTravel.savedVars.vc.receivedCards.length; i = i + 1) {
          if (houseTravel.savedVars.vc.receivedCards[i] === selectedEntry) {
            houseTravel.addonState.selectedVisitCard = i + 1
            break
          }
        }
      }
      houseTravel.RefreshVisitCards()
      houseTravel.addonState.taintedVisitCards = false
    }
  }
}
houseTravel.UpdateVisitCardList = updateVisitCardList

function vcPanelOnMouseWheel(this: void, _control: Control, delta: number): undefined {
  const vc = asVcControls(houseTravel.controls.vc)
  if (
    vc.slider.IsHidden() === false &&
    houseTravel.savedVars !== undefined &&
    houseTravel.savedVars.vc !== undefined &&
    houseTravel.savedVars.vc.receivedCards !== undefined
  ) {
    let size = 100 / houseTravel.savedVars.vc.receivedCards.length
    if (size < 1) {
      size = 1
    }
    let position = -delta * size * 2 + vc.slider.GetValue()

    if (position < 0) {
      position = 0
    }
    if (position > 100) {
      position = 100
    }
    vc.slider.SetValue(position)
  }
}
houseTravel.VCPanelOnMouseWheel = vcPanelOnMouseWheel

function vcAdjustSlider(this: void): undefined {
  if (houseTravel.savedVars !== undefined && houseTravel.savedVars.vc.receivedCards !== undefined) {
    const vc = asVcControls(houseTravel.controls.vc)
    let size =
      25 * houseTravel.savedVars.vc.receivedCards.length +
      10 -
      (houseTravel.config.size.height -
        houseTravel.config.size.headerHeightOffset -
        houseTravel.config.size.headerHeight -
        houseTravel.config.size.gap -
        95)
    if (size < 0) {
      size = 0
    }

    const slide = (size / 100) * vc.slider.GetValue()

    vc.scrollPanel.SetSimpleAnchor(vc.scrollControl, 0, -slide)
  } else {
  }
}
houseTravel.VCAdjustSlider = vcAdjustSlider
