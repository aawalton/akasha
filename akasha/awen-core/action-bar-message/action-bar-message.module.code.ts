export const ACTION_BAR_MESSAGE_KINDS = ["action", "feedback"] as const
export type ActionBarMessageKind = (typeof ACTION_BAR_MESSAGE_KINDS)[number]

export function isOutOfCharacterFeedback(raw: string): boolean {
  const trimmed = raw.trim()
  return trimmed.length >= 2 && trimmed.startsWith("[") && trimmed.endsWith("]")
}

export function classifyActionBarMessage(raw: string): ActionBarMessageKind {
  return isOutOfCharacterFeedback(raw) ? "feedback" : "action"
}
