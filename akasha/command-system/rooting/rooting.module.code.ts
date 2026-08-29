const MARK = "/akasha/"

export function rootOf(at: string): string {
  const cut = `${at}/`.lastIndexOf(MARK)
  if (cut === -1) throw new Error(`${at} stands under no akasha folder`)
  return at.slice(0, cut)
}
