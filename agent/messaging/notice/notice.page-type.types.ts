import type { NoticeText } from "akasha/agent/messaging/notice/properties/notice-text.file-property.types.ts"
import type { NoticeWarrant } from "akasha/agent/messaging/notice/properties/notice-warrant.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type Notice = Page & {
  text: NoticeText
  warrant: NoticeWarrant
}
