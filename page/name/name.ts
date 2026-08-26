export const PAGE_EXTENSION = "md"

const DOT = "."

export type PageName = {
  readonly stem: string
  readonly type: string
}

export function pageNameOf(key: string): PageName | null {
  const base = key.slice(key.lastIndexOf("/") + 1)
  const tail = `${DOT}${PAGE_EXTENSION}`
  if (!base.endsWith(tail)) return null
  const rest = base.slice(0, -tail.length)
  const dot = rest.lastIndexOf(DOT)
  if (dot <= 0 || dot === rest.length - 1) return null
  return { stem: rest.slice(0, dot), type: rest.slice(dot + 1) }
}

export function stemOf(key: string): string {
  const base = key.slice(key.lastIndexOf("/") + 1)
  const dot = base.indexOf(DOT)
  return dot <= 0 ? base : base.slice(0, dot)
}
