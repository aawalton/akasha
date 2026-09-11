import { normalizeAbsolute } from "akasha/pages/repo-path/repo-path.module.code.ts"

const SCHEME = /^[a-z][a-z0-9+.-]*:/i

const SLOT = /^\{[^{}]*\}$/

function pathOf(href: string): string | null {
  const said = href.trim()
  if (said === "" || SLOT.test(said)) return null
  const target = said.split("#")[0]?.split("?")[0] ?? ""
  if (target === "" || SCHEME.test(target)) return null
  return target
}

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

export function resolves(href: string, hostBefore: string): string | null {
  const target = pathOf(href)
  if (target === null) return null
  return target.startsWith("/")
    ? normalizeAbsolute(target)
    : normalizeAbsolute(`${folderOf(hostBefore)}/${target}`)
}
