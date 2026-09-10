import type { Page } from "../../pages/page.page-type.types.ts"
import type { NoticeText } from "./properties/notice-text.file-property.ts"
import type { NoticeWarrant } from "./properties/notice-warrant.text-property.ts"

export type Notice = Page & {
  text: NoticeText
  warrant: NoticeWarrant
}
