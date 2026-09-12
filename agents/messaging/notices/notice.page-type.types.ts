import type { NoticeText } from "akasha/agents/messaging/notices/properties/notice-text.file-property.types.ts"
import type { NoticeWarrant } from "akasha/agents/messaging/notices/properties/notice-warrant.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type Notice = Page & {
  text: NoticeText
  warrant: NoticeWarrant
}
