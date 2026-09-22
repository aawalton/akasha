import type { NoticeText } from "akasha/agent/message/notice/properties/notice-text.file-property.types.ts"
import type { NoticeWarrant } from "akasha/agent/message/notice/properties/notice-warrant.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type AgentMessageNotice = Page & {
  text: NoticeText
  warrant: NoticeWarrant
}
