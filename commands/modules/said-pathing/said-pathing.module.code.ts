import { existsSync, statSync } from "node:fs"
import { isAbsolute, join, relative, resolve, sep } from "node:path"

export const GIT_DIR = ".git"

const PARTED_BY = "/"

const UP = ".."

export function outsideRoot(root: string, path: string): boolean {
  const at = relative(root, join(root, path))
  return at === UP || at.startsWith(`${UP}${sep}`) || isAbsolute(at)
}

export function writesOutside(path: string): string {
  return `${path} lands outside the repository, and nothing is written outside the repository`
}

export function pathAt(root: string, said: string): string | null {
  const full = isAbsolute(said) ? resolve(said) : resolve(root, said)
  const rel = relative(resolve(root), full)
  if (rel === "" || isAbsolute(rel) || rel.startsWith("..")) return null
  return rel
}

export function offRepo(said: string): string {
  return (
    `\`${said}\` is no path inside the repository — a path is read against the repository root, ` +
    "and this takes nothing from outside the repository"
  )
}

export function barredIn(root: string, path: string): string | null {
  if (path === GIT_DIR || path.startsWith(`${GIT_DIR}${PARTED_BY}`)) {
    return (
      `${path} is inside \`${GIT_DIR}/\`, which holds the repository itself rather than ` +
      "anything the repository says"
    )
  }
  if (path.includes(PARTED_BY)) return null
  const at = join(root, path)
  if (!existsSync(at) || !statSync(at).isDirectory()) return null
  return (
    `${path} is a folder at the top of the repository — name what is inside it, so no one call ` +
    "takes a whole tree away by a slip of the keyboard"
  )
}
