import { CHAT_MESSAGE_API } from "akasha/temper/addon/pages/hud/temper-chat-message/modules/chat-message-api/chat-message-api.module.code.ts"
import {
  LINK_GMATCH_PATTERN,
  UNKNOWN_LINK_TYPE,
} from "akasha/temper/addon/pages/hud/temper-chat-message/modules/chat-message-constants/chat-message-constants.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-chat-message/chat-message-declarations/chat-message-declarations.type-declaration.d.ts"

function unknownTypeReformatter(
  this: void,
  _linkStyle: number,
  linkType: string,
  _data: string,
  displayText: string
): string {
  return ZO_LinkHandler_CreateLinkWithoutBrackets(
    displayText,
    undefined,
    UNKNOWN_LINK_TYPE,
    linkType
  )
}

function decodeCustomLinks(this: void, ...captures: string[]): string {
  const linkStyleRaw = captures[0] ?? ""
  const linkType = captures[1] ?? ""
  const data = captures[2] ?? ""
  const displayText = captures[3] ?? ""
  const reformatter = CHAT_MESSAGE_API.registeredChatLinks[linkType] ?? unknownTypeReformatter
  const linkStyle = tonumber(linkStyleRaw) ?? 0
  return reformatter(linkStyle, linkType, data, displayText)
}

export function customLinkFormatter(this: void, ...args: unknown[]): unknown[] {
  const text = args[2] as string
  const [newText] = string.gsub(text, LINK_GMATCH_PATTERN, decodeCustomLinks)
  args[2] = newText
  return args
}
