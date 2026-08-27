const NAMESPACE_SUFFIX = "*"

export function targetIsNamespace(target: string): boolean {
  return target.endsWith(NAMESPACE_SUFFIX)
}

export function targetCovers(granted: string, asked: string): boolean {
  if (!targetIsNamespace(granted)) return granted === asked
  return asked.startsWith(granted.slice(0, -NAMESPACE_SUFFIX.length))
}

export function anyTargetCovers(granted: Iterable<string>, asked: string): boolean {
  for (const one of granted) {
    if (targetCovers(one, asked)) return true
  }
  return false
}
