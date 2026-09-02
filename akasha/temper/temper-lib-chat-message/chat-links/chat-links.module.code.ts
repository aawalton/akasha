import "../chat-message-declarations/chat-message-declarations.module.code.ts"
import { asString } from "../chat-message-casts/chat-message-casts.module.code.ts"
import {
  LINK_GMATCH_PATTERN,
  UNKNOWN_LINK_TYPE,
} from "../chat-message-constants/chat-message-constants.module.code.ts"
import { LIB } from "../chat-message-lib/chat-message-lib.module.code.ts"

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
  const reformatter = LIB.registeredChatLinks[linkType] ?? unknownTypeReformatter
  const linkStyle = tonumber(linkStyleRaw) ?? 0
  return reformatter(linkStyle, linkType, data, displayText)
}

export function customLinkFormatter(this: void, ...args: unknown[]): unknown[] {
  const text = asString(args[2])
  const [newText] = string.gsub(text, LINK_GMATCH_PATTERN, decodeCustomLinks)
  args[2] = newText
  return args
}
