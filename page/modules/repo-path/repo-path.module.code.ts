import { realpathSync } from "node:fs"

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
