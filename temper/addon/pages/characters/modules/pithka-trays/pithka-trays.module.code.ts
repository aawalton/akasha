import { enumToggleButton } from "akasha/temper/addon/pages/characters/modules/pithka-buttons/pithka-buttons.module.code.ts"
import {
  SMALL_THIN_FONT,
  TEXTURE_BUNDLES,
} from "akasha/temper/addon/pages/characters/modules/pithka-constants/pithka-constants.module.code.ts"
import {
  newTexture,
  tooltipCloseFn,
  tooltipOpenFn,
} from "akasha/temper/addon/pages/characters/modules/pithka-controls/pithka-controls.module.code.ts"
import {
  basicLabel,
  watermarkLabel,
} from "akasha/temper/addon/pages/characters/modules/pithka-labels/pithka-labels.module.code.ts"
import { qrPayload } from "akasha/temper/addon/pages/characters/modules/pithka-qr-payload/pithka-qr-payload.module.code.ts"
import {
  getValue,
  registerCallback,
} from "akasha/temper/addon/pages/characters/modules/pithka-saved-vars/pithka-saved-vars.module.code.ts"
import { drawQRCode } from "akasha/temper/addon/pages/characters/modules/qr-code-draw/qr-code-draw.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/characters/pithka-declarations/pithka-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const QR_TOOLTIP =
  "This encodes the clears on this page into a format that's easily readable by a bot to help tag clears."

const WORLD_LOOKUP: Record<string, string | undefined> = {
  "NA Megaserver": "PC NA",
  "EU Megaserver": "PC EU",
  XB1live: "XBox NA",
  "XB1live-eu": "XBox EU",
  PS4live: "PS NA",
  "PS4live-eu": "PS EU",
  PTS: "PTS",
}

function announceDiscord(this: void): undefined {
  d("|cFF8800[Pithka]|r ESOClearsBot Discord: |cFFFFFF https://discord.gg/72NKKm5964|r")
}

export function initializeQrTray(this: void): undefined {
  const container = TemperCharactersPithka_GUI.GetNamedChild("QRContainer")
  if (container === undefined) return

  const qr = newTexture()
  qr.SetDimensions(300, 300)
  qr.SetDrawTier(DT_LOW)
  qr.SetAnchor(CENTER, container, CENTER, 0, 0)
  qr.SetParent(container)
  qr.SetMouseEnabled(true)
  qr.SetHandler("OnMouseEnter", tooltipOpenFn(QR_TOOLTIP, BOTTOM))
  qr.SetHandler("OnMouseExit", tooltipCloseFn())
  qr.SetHandler("OnMouseUp", announceDiscord)

  const redraw = (): undefined => {
    drawQRCode(qr, qrPayload())
  }
  container.SetHandler("OnEffectivelyShown", redraw)

  const updateVisibility = (key: string, value: unknown): undefined => {
    if (key === "currentTray") container.SetHidden(value !== "Export")
  }
  registerCallback(updateVisibility)
  registerCallback((key) => {
    if (!container.IsHidden() && key === "currentScreen" && getValue("currentTray") === "Export") {
      redraw()
    }
  })
  updateVisibility("currentTray", getValue("currentTray"))

  const info = basicLabel({
    parent: container,
    width: 300,
    height: 100,
    vAlign: TEXT_ALIGN_TOP,
    text: "Used by discord bot ESOClearsBot to auto update clears.  Click for Discord link.",
    font: SMALL_THIN_FONT,
    clickFn: announceDiscord,
  })
  info.SetAnchor(TOP, qr, BOTTOM, 0, 10)
}

export function initializeCommonView(this: void): undefined {
  const exportButton = enumToggleButton({
    size: 50,
    tooltipText: "Toggle Watermark And QR For Export",
    textureBundle: TEXTURE_BUNDLES.COMPOSE,
    savedVarKey: "currentTray",
    enumValue: "Export",
  })
  exportButton.SetAnchor(BOTTOMRIGHT, TemperCharactersPithka_GUI, BOTTOMRIGHT, 0, 0)

  const worldName = GetWorldName()
  const watermarks = [
    watermarkLabel({ text: GetDisplayName(), vOffset: -150, hidden: true }),
    watermarkLabel({ text: os.date("%b %d, %y"), vOffset: 0, hidden: true }),
    watermarkLabel({ text: WORLD_LOOKUP[worldName] ?? worldName, vOffset: 150, hidden: true }),
  ]
  const toggleWatermark = (key: string, value: unknown): undefined => {
    if (key !== "currentTray") return
    for (const watermark of watermarks) watermark.SetHidden(value !== "Export")
  }
  registerCallback(toggleWatermark)
  toggleWatermark("currentTray", getValue("currentTray"))

  const info = basicLabel({
    text: "Click name to queue or teleport, click achievement to link or group, /pgf for group finder.",
    font: SMALL_THIN_FONT,
    width: 700,
    color: [1, 1, 1, 1],
    align: TEXT_ALIGN_CENTER,
  })
  info.SetAnchor(BOTTOM, TemperCharactersPithka_GUI, BOTTOM, 0, 5)
}
