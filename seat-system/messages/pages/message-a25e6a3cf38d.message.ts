import type { Message } from "akasha/seat-system/messages/message.page-type.types.ts"

export const messageA25e6a3cf38d = {
  id: "01a091fa-40b0-7000-83db-a25e6a3cf38d",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-a25e6a3cf38d",
  to: "athena",
  from: "supervisor",
  warrant: "announce",
  body: "▶️ Your previous turn was ended by a failure between you and the model service rather than by you, so nothing you were doing was finished or refused. Resume the work you were doing, continuing from exactly where it was interrupted.\n",
} as const satisfies Message
