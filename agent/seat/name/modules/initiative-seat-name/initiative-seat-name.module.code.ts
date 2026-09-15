export function seatNameFor(slug: string): string {
  const mark = slug.indexOf("-")
  return mark === -1 ? slug : slug.slice(0, mark)
}
