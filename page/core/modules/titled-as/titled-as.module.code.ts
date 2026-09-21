const WORD_BREAK = /[-_]/

export function titledAs(filed: string): string {
  return filed
    .slice(filed.lastIndexOf("/") + 1)
    .split(WORD_BREAK)
    .map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
    .join(" ")
}
