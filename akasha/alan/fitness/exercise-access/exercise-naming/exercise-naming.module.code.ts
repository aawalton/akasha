export const NO_SIDE = "n-a"

export function slugStem(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function nextSetNumber(taken: readonly number[]): number {
  return taken.length === 0 ? 1 : Math.max(...taken) + 1
}

export function setLogSlug(sessionSlug: string, exerciseSlug: string, setNumber: number): string {
  return `${sessionSlug}-${exerciseSlug}-set-${setNumber}`
}

export function mobilityReadingName(metric: string, date: string, side: string): string {
  return side === NO_SIDE ? `${metric}-${date}` : `${metric}-${date}-${side}`
}

export function mobilityReadingTitle(metric: string, date: string, side: string): string {
  return side === NO_SIDE ? `${metric} ${date}` : `${metric} ${date} (${side})`
}
