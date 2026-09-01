import { realpathSync } from "node:fs"

const GIT_DIR = ".git"

export function normalizeAbsolute(pathish: string): string {
  const stack: string[] = []
  for (const segment of pathish.split("/")) {
    if (segment === "" || segment === ".") continue
    if (segment === "..") {
      stack.pop()
      continue
    }
    stack.push(segment)
  }
  return `/${stack.join("/")}`
}

export function canonicalize(path: string): string {
  const segments = path.split("/").filter((one) => one !== "")
  for (let i = segments.length; i > 0; i -= 1) {
    try {
      const real = realpathSync(`/${segments.slice(0, i).join("/")}`)
      const rest = segments.slice(i)
      return rest.length === 0 ? real : `${real}/${rest.join("/")}`
    } catch {}
  }
  return path
}

export function isInside(root: string, candidate: string): boolean {
  const normalized = canonicalize(normalizeAbsolute(root))
  const resolved = canonicalize(candidate)
  return resolved === normalized || resolved.startsWith(`${normalized}/`)
}

export function outOfBounds(relPath: string): string | null {
  const segments = relPath.split("/")
  if (relPath === "" || segments.some((one) => one === "" || one === "." || one === "..")) {
    return `\`${relPath}\` does not name a path inside a repo root`
  }
  if (segments[0] === GIT_DIR) {
    return `\`${relPath}\` is inside \`${GIT_DIR}/\`, which holds the repo rather than anything it says`
  }
  return null
}
