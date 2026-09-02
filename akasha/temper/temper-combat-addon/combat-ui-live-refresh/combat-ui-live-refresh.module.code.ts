import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import type {
  LayoutControl,
  TooltipCarrier,
  TooltipSpec,
} from "@akasha/temper-combat-addon/combat-ui-helpers"
import {
  isLabelControl,
  isNonNullObject,
  namedChild,
} from "@akasha/temper-combat-addon/combat-ui-helpers"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"

interface LiveBlockControl extends LayoutControl {
  blocksize?: number
}

function refreshBG(this: void): undefined {
  const liveReport: LayoutControl = TemperCombat_LiveReport
  const setLR = getDb().liveReport
  const bg = namedChild<LayoutControl>(liveReport, "BG")
  const resizeFrame = namedChild<LayoutControl>(liveReport, "ResizeFrame")

  const [newwidth, newheight] = liveReport.GetDimensions()

  bg.SetDimensions(newwidth, newheight)
  resizeFrame.SetDimensions(newwidth, newheight)
  resizeFrame.SetAnchorFill()

  liveReport.sizes = [newwidth / setLR.scale, newheight / setLR.scale]
  bg.sizes = [newwidth / setLR.scale, newheight / setLR.scale]
  resizeFrame.sizes = [newwidth / setLR.scale, newheight / setLR.scale]

  resizeFrame.SetDimensionConstraints(
    (newwidth / setLR.scale) * 0.5,
    (newheight / setLR.scale) * 0.5,
    (newwidth / setLR.scale) * 3,
    (newheight / setLR.scale) * 3
  )
  return undefined
}

type BlockAnchor = [number, number, number, number, Control | undefined]

export function refreshLiveReport(): undefined {
  const liveReport = TemperCombat_LiveReport
  const db = getDb()
  const setLR = db.liveReport

  let anchors: [BlockAnchor, BlockAnchor, BlockAnchor]
  if (setLR.layout === "Horizontal") {
    anchors = [
      [TOPLEFT, TOPLEFT, 0, 0, liveReport],
      [LEFT, RIGHT, 0, 0, undefined],
      [LEFT, RIGHT, 0, 0, undefined],
    ]
  } else if (setLR.layout === "Vertical") {
    anchors = [
      [TOPLEFT, TOPLEFT, 0, 0, liveReport],
      [TOPLEFT, BOTTOMLEFT, 0, 0, undefined],
      [LEFT, RIGHT, 0, 0, undefined],
    ]
  } else {
    assert(setLR.layout === "Compact")
    anchors = [
      [TOPLEFT, TOPLEFT, 0, 0, liveReport],
      [LEFT, RIGHT, 0, 0, undefined],
      [TOPLEFT, BOTTOMLEFT, 0, 0, undefined],
    ]
  }

  const scale = setLR.scale
  let last: Control = liveReport
  let totalBlocks = 0

  const settingKeyOf = (child: Control): string =>
    zo_strgsub(zo_strgsub(child.GetName(), liveReport.GetName(), ""), "^%u", zo_strlower)

  const shownByKey: Record<string, unknown> = isObjectRecord(setLR) ? setLR : {}

  for (let i = 3; i <= liveReport.GetNumChildren(); i++) {
    const child = liveReport.GetChild<LiveBlockControl>(i)

    if (child != null && shownByKey[settingKeyOf(child)] === true) {
      totalBlocks = totalBlocks + (child.blocksize ?? 0)
    }
  }

  const halfway = setLR.layout === "Compact" ? zo_ceil(totalBlocks / 2) : undefined
  let blocks = 0
  let firstBlock: Control | undefined

  for (let i = 3; i <= liveReport.GetNumChildren(); i++) {
    const child = liveReport.GetChild<LiveBlockControl>(i)
    if (child == null) {
      continue
    }

    const shown = shownByKey[settingKeyOf(child)] === true
    child.SetHidden(!shown)

    if (shown) {
      const addspace = child.blocksize ?? 0
      blocks = blocks + addspace

      let anchorIndex: 1 | 2 | 3

      if (firstBlock == null) {
        firstBlock = child
        anchorIndex = 1
      } else if (halfway != null && blocks > halfway) {
        anchorIndex = 3
        blocks = addspace
      } else {
        anchorIndex = 2
      }

      const anchor = anchorIndex === 1 ? anchors[0] : anchorIndex === 2 ? anchors[1] : anchors[2]
      anchor[4] = anchorIndex === 3 ? firstBlock : last

      const [width, height] = assert(child.sizes)
      child.ClearAnchors()
      child.SetDimensions(width * scale, height * scale)
      child.SetAnchor(anchor[0], anchor[4], anchor[1], anchor[2] * scale, anchor[3] * scale)

      last = child

      const label = namedChild<LabelControl>(child, "Label")
      label.SetHorizontalAlignment(setLR.alignmentleft ? TEXT_ALIGN_LEFT : TEXT_ALIGN_RIGHT)

      const tooltipLines: unknown = namedChild<TooltipCarrier>(child, "Tooltip").tooltip
      if (isNonNullObject<(TooltipSpec | undefined)[]>(tooltipLines)) {
        tooltipLines[1] = db.recordgrp ? SI_TEMPER_COMBAT_LIVEREPORT_GROUP_TOOLTIP : undefined
      }
    }
  }

  zo_callLater(refreshBG, 1)
  return undefined
}

function resizeControl(control: LayoutControl, scale: number | undefined): undefined {
  if (control.GetType() === CT_BACKDROP || (control.sizes == null && control.anchors == null)) {
    return undefined
  }

  const [width, height] = assert(control.sizes)

  const [maxwidth, maxheight] = GuiRoot.GetDimensions()

  const clamped = zo_min(zo_max(scale ?? 1, 0.5), 3, maxwidth / width, maxheight / height)

  getDb().liveReport.scale = clamped

  if (width != null) {
    control.SetWidth(width * clamped)
  }
  if (height != null) {
    control.SetHeight(height * clamped)
  }

  const fontcontrol = control.GetNamedChild<LayoutControl>("Font")

  if (fontcontrol != null) {
    const [font, rawSize, style] = assert(fontcontrol.font)

    let size: string | number = rawSize

    if (size != null) {
      size = (assert(tonumber(size)) * (clamped + 0.1)) / 1.2
    }

    if (isLabelControl(control)) {
      control.SetFont(string.format("%s|%s|%s", font, size, style))
    }
  }

  for (let i = 1; i <= control.GetNumChildren(); i++) {
    const child = control.GetChild<LayoutControl>(i)
    if (child != null) {
      resizeControl(child, clamped)
    }
  }
  return undefined
}

export function resizeLiveReport(scale: number): undefined {
  const liveReport = TemperCombat_LiveReport

  for (let i = 1; i <= liveReport.GetNumChildren(); i++) {
    const child = liveReport.GetChild<LayoutControl>(i)
    if (child != null) {
      resizeControl(child, scale)
    }
  }
  refreshLiveReport()
  return undefined
}
