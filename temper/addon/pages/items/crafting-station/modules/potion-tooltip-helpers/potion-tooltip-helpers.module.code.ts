import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-alchemy-station/eso-alchemy-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"

function asAnnounceManager(this: void, value: unknown): CenterScreenAnnounceManager {
  return value as CenterScreenAnnounceManager
}

function asAnnounceMessage(this: void, value: unknown): CenterScreenAnnounceMessage {
  return value as CenterScreenAnnounceMessage
}

export function isThirdAlchemySlotUnlocked(this: void): boolean {
  return ZO_Alchemy_IsThirdAlchemySlotUnlocked()
}

function addLine(
  this: void,
  tooltip: TooltipControl,
  text: string,
  color: ZoColorDef,
  alignment: number
): undefined {
  const [r, g, b] = color.UnpackRGB()
  tooltip.AddLine(
    text,
    "",
    r,
    g,
    b,
    CENTER,
    MODIFY_TEXT_TYPE_NONE,
    alignment,
    alignment !== TEXT_ALIGN_LEFT
  )
}

export function addLineCenter(
  this: void,
  tooltip: TooltipControl,
  text: string,
  color?: ZoColorDef
): undefined {
  addLine(tooltip, text, color ?? ZO_TOOLTIP_DEFAULT_COLOR, TEXT_ALIGN_CENTER)
}

export function addLineTitle(
  this: void,
  tooltip: TooltipControl,
  text: string,
  color?: ZoColorDef
): undefined {
  const resolved = color ?? ZO_SELECTED_TEXT
  const [r, g, b] = resolved.UnpackRGB()
  tooltip.AddLine(
    text,
    "ZoFontHeader3",
    r,
    g,
    b,
    CENTER,
    MODIFY_TEXT_TYPE_UPPERCASE,
    TEXT_ALIGN_CENTER,
    true
  )
}

export function addLineSubTitle(
  this: void,
  tooltip: TooltipControl,
  text: string,
  color?: ZoColorDef
): undefined {
  const resolved = color ?? ZO_SELECTED_TEXT
  const [r, g, b] = resolved.UnpackRGB()
  tooltip.AddLine(
    text,
    "ZoFontWinH5",
    r,
    g,
    b,
    CENTER,
    MODIFY_TEXT_TYPE_UPPERCASE,
    TEXT_ALIGN_CENTER,
    true
  )
}

export function isScreenRightHalf(this: void, sender: Control): boolean {
  const [x] = GuiRoot.GetCenter()
  return sender.GetLeft() > x
}

export function showAnnoucement(this: void, text: string): undefined {
  const message = CENTER_SCREEN_ANNOUNCE.CreateMessageParams(
    CSA_CATEGORY_SMALL_TEXT,
    SOUNDS.QUEST_OBJECTIVE_INCREMENT
  ) as CenterScreenAnnounceMessageParams
  message.SetSound(SOUNDS.QUEST_OBJECTIVE_INCREMENT)
  message.SetText(text)
  message.MarkSuppressIconFrame()
  message.MarkShowImmediately()
  asAnnounceManager(CENTER_SCREEN_ANNOUNCE).QueueMessage(asAnnounceMessage(message))
}

export function clearTooltips(this: void): undefined {
  ClearTooltip(InformationTooltip)
  ClearTooltip(ItemTooltip)
  ClearTooltip(TemperPotionsTooltip)
}
