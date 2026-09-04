const MARKDOWN = ".md"

const DOT = "."

const SLASH = "/"

export function pageTypeOf(path: string): string | null {
  const name = path.slice(path.lastIndexOf(SLASH) + 1)
  if (!name.endsWith(MARKDOWN)) return null
  const rest = name.slice(0, -MARKDOWN.length)
  const dot = rest.lastIndexOf(DOT)
  if (dot <= 0) return null
  const kind = rest.slice(dot + 1)
  return kind === "" ? null : kind
}
