function stripTrailingSlash(root: string): string {
  return root.endsWith("/") ? root.slice(0, -1) : root
}

export function toRootRelative(absolutePath: string, root: string): string | null {
  const normRoot = stripTrailingSlash(root)
  if (absolutePath === normRoot) return ""
  const prefix = `${normRoot}/`
  if (!absolutePath.startsWith(prefix)) return null
  return absolutePath.slice(prefix.length)
}

export function resolveUnderRoot(stored: string, root: string): string {
  if (stored.startsWith("/")) return stored
  const base = stripTrailingSlash(root)
  return stored === "" ? base : `${base}/${stored}`
}

export interface NamedRoot {
  readonly tag: string
  readonly root: string
}

export function relativizeToNamedRoot(
  absolutePath: string,
  roots: readonly NamedRoot[]
): { readonly tag: string; readonly relative: string } | null {
  for (const { tag, root } of roots) {
    const relative = toRootRelative(absolutePath, root)
    if (relative !== null) return { tag, relative }
  }
  return null
}

export function resolveByRootTag(
  stored: string,
  tag: string | undefined,
  roots: readonly NamedRoot[]
): string {
  if (stored.startsWith("/")) return stored
  const named = tag === undefined ? undefined : roots.find((r) => r.tag === tag)
  const root = named?.root ?? roots[0]?.root
  if (root === undefined) return stored
  return resolveUnderRoot(stored, root)
}
