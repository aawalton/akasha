const MARK = "/akasha/"

export function rootOf(at: string): string | null {
  const cut = `${at}/`.lastIndexOf(MARK)
  return cut === -1 ? null : at.slice(0, cut)
}

export function rootFor(at: string): string {
  const found = rootOf(at)
  if (found === null) throw new Error(`${at} stands under no akasha folder`)
  return found
}
