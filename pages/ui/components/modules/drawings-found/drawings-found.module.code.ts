const PARTED_BY = "."

export function drawnFor(at: string, ending: string): string | null {
  const name = at.slice(at.lastIndexOf("/") + 1)
  if (!name.endsWith(ending)) return null
  const stem = name.slice(0, -ending.length)
  const dot = stem.indexOf(PARTED_BY)
  return dot < 1 ? null : stem.slice(0, dot)
}

export function drawingsIn<T>(
  found: Readonly<Record<string, { readonly Drawing: T }>>,
  ending: string
): ReadonlyMap<string, T> {
  return new Map(
    Object.entries(found).flatMap(([at, held]) => {
      const slug = drawnFor(at, ending)
      return slug === null ? [] : [[slug, held.Drawing] as const]
    })
  )
}

export function firstDrawing<T>(
  found: ReadonlyMap<string, T>,
  chain: readonly string[] | undefined
): T | undefined {
  if (chain === undefined) return undefined
  for (const slug of chain) {
    const one = found.get(slug)
    if (one !== undefined) return one
  }
  return undefined
}
