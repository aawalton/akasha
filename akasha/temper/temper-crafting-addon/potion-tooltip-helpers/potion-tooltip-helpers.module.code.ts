function asAnnounceManager(this: void, value: unknown): CenterScreenAnnounceManager {
  return value as CenterScreenAnnounceManager
}

function asAnnounceMessage(this: void, value: unknown): CenterScreenAnnounceMessage {
  return value as CenterScreenAnnounceMessage
}

export function isThirdAlchemySlotUnlocked(this: void): boolean {
  return ZO_Alchemy_IsThirdAlchemySlotUnlocked()
}

export function addLine(
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

export function isScreenLowerHalf(this: void, sender: Control): boolean {
  const [, y] = GuiRoot.GetCenter()
  return sender.GetTop() > y
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
