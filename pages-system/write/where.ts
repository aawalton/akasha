const IN = ":"

const ANY = "*"

export const folderIn = (glob: string): string | null => {
  const cut = glob.indexOf(IN)
  const inside = cut < 0 ? glob : glob.slice(cut + 1)
  const last = inside.lastIndexOf("/")
  if (last < 0) return ""
  const folder = inside.slice(0, last)
  return folder.includes(ANY) ? null : folder
}

export const folderFor = (pageType: string, globs: readonly string[]): string => {
  for (const glob of globs) {
    const folder = folderIn(glob)
    if (folder !== null && folder !== "") return folder
  }
  return "pages/" + pageType
}

export const pathFor = (pageType: string, globs: readonly string[], slug: string): string =>
  folderFor(pageType, globs) + "/" + slug + "." + pageType + ".md"
