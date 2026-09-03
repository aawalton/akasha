import { normalizeAbsolute } from "@akasha/pages-system/repo-path"

const SCHEME = /^[a-z][a-z0-9+.-]*:/i

const SLOT = /^\{[^{}]*\}$/

function pathOf(href: string): string | null {
  const said = href.trim()
  if (said === "" || SLOT.test(said)) return null
  const target = said.split("#")[0]?.split("?")[0] ?? ""
  if (target === "" || SCHEME.test(target)) return null
  return target
}

export function dirOf(absolute: string): string {
  return absolute.slice(0, absolute.lastIndexOf("/"))
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
    : normalizeAbsolute(`${dirOf(hostBefore)}/${target}`)
}
