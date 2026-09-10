export function formatTime12h(time: string): string {
  const [hourStr, minuteStr] = time.split(":")
  const hour = Number.parseInt(hourStr ?? "0", 10)
  const minute = minuteStr ?? "00"
  const period = hour >= 12 ? "PM" : "AM"
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  return `${displayHour}:${minute} ${period}`
}
