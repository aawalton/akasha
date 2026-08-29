const MARK = "/akasha/"

export function rootOf(at: string): string | null {
  const cut = `${at}/`.lastIndexOf(MARK)
  return cut === -1 ? null : at.slice(0, cut)
}
