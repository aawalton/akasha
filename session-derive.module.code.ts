export function nextSetNumber(existing: readonly number[]): number {
  return existing.length === 0 ? 1 : Math.max(...existing) + 1
}

export function sessionSlugStem(
  dayOfWeek: string,
  focus: string | undefined,
  dayStr: string
): string {
  return focus === undefined || focus === ""
    ? `${dayOfWeek}-${dayStr}`
    : `${dayOfWeek}-${focus}-${dayStr}`
}

export function setLogSlug(sessionSlug: string, exerciseSlug: string, setNumber: number): string {
  return `${sessionSlug}-${exerciseSlug}-set-${setNumber}`
}

export function freeSlug(stem: string, taken: ReadonlySet<string>): string {
  if (!taken.has(stem)) return stem
  let nth = 2
  while (taken.has(`${stem}-${nth}`)) nth += 1
  return `${stem}-${nth}`
}

export function scheduleDaySlug(scheduleSlug: string, dayOfWeek: string): string {
  return `${scheduleSlug}-${dayOfWeek}`
}
