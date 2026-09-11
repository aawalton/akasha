import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { NoticeText } from "akasha/seat-system/notices/properties/notice-text.file-property.ts"
import type { NoticeWarrant } from "akasha/seat-system/notices/properties/notice-warrant.text-property.ts"

export type Notice = Page & {
  text: NoticeText
  warrant: NoticeWarrant
}
