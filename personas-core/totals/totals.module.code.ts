export function decideTotalPointsWrite(
  stored: number | undefined,
  computed: number,
  force = false
): number | null {
  if (force) return computed
  if (stored === undefined) return computed
  return computed > stored ? computed : null
}
