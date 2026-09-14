export function folderOf(absolute: string): string {
  const cut = absolute.lastIndexOf("/")
  return cut === -1 ? "" : absolute.slice(0, cut)
}

export function relativeBetween(fromDir: string, target: string): string {
  const from = fromDir.split("/").filter((s) => s !== "")
  const to = target.split("/").filter((s) => s !== "")
  let shared = 0
  while (shared < from.length && shared < to.length - 1 && from[shared] === to[shared]) shared += 1
  const up = Array.from({ length: from.length - shared }, () => "..")
  return [...up, ...to.slice(shared)].join("/")
}
