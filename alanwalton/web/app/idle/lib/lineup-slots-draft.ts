export function applyDrop(
  working: readonly string[],
  slug: string,
  cap: number
): readonly string[] {
  if (working.includes(slug)) return working
  if (working.length >= cap) return working
  return [...working, slug]
}

export function removeFromTeam(working: readonly string[], slug: string): readonly string[] {
  if (!working.includes(slug)) return working
  return working.filter((s) => s !== slug)
}

export function reorderTeam(
  working: readonly string[],
  fromIndex: number,
  toIndex: number
): readonly string[] {
  if (fromIndex === toIndex) return working
  if (fromIndex < 0 || fromIndex >= working.length) return working
  if (toIndex < 0 || toIndex >= working.length) return working
  const next = [...working]
  const [moved] = next.splice(fromIndex, 1)
  if (moved === undefined) return working
  next.splice(toIndex, 0, moved)
  return next
}

export function pickerCandidates<T extends { slug: string }>(
  unlocked: readonly T[],
  activeTeam: readonly string[]
): readonly T[] {
  const seated = new Set(activeTeam)
  return unlocked.filter((t) => !seated.has(t.slug))
}
