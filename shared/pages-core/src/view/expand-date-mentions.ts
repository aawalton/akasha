import { formatSmartDate } from "./format-smart-date"

const DATE_MENTION_RE = /@date:(\d{4}-\d{2}-\d{2})/g

export function expandDateMentions(text: string, now?: Date): string {
  return text.replace(DATE_MENTION_RE, (whole, dateStr: string) => {
    const label = formatSmartDate(dateStr, now)
    return label === dateStr ? whole : label
  })
}
