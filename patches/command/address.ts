import { resolve } from "node:path"
import { outOfBounds } from "../../repo/path/path.ts"
import { locate, rootsHere } from "../../repo/roots/roots.ts"
import { fail, valueOf } from "../patch.ts"

const REPO = "--repo"

export interface Addressed {
  readonly repo: string
  readonly root: string
}

export function rejectUnknownFlags(
  argv: readonly string[],
  valueFlags: readonly string[],
  bareFlags: readonly string[]
): void {
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at] as string
    if (!token.startsWith("--") && token !== "-h") continue
    if (valueFlags.includes(token)) {
      at += 1
      continue
    }
    if (bareFlags.includes(token)) continue
    fail(`${token} is not a flag this command takes — run it with --help`)
  }
}

export function addressOf(argv: readonly string[], paths: readonly string[]): Addressed | null {
  const found = new Map<string, string>()
  const loose: string[] = []
  for (const one of paths) {
    const held = locate(resolve(process.cwd(), one))
    if (held === null) {
      loose.push(one)
      continue
    }
    const root = rootsHere()[held.repo]
    if (root === undefined) fail(`no root is known for the \`${held.repo}\` repository`)
    found.set(held.repo, root)
  }
  if (loose.length === paths.length) return null
  if (loose.length > 0) {
    fail(
      `${loose.join(", ")} ${loose.length === 1 ? "is" : "are"} inside no repo while the rest of ` +
        "this call is in one, and a call lands in one place — hand the loose paths in on their own"
    )
  }
  if (found.size > 1) {
    fail(`this call names paths in ${[...found.keys()].sort().join(" and ")}, and a call lands in one repo`)
  }
  const [entry] = [...found.entries()]
  if (entry === undefined) fail("this call names no path, so it asks for no write at all")
  const named = valueOf(argv, REPO)
  if (named !== null && named !== entry[0]) {
    fail(`${REPO} says ${named} and these paths are in ${entry[0]}`)
  }
  return { repo: entry[0], root: entry[1] }
}

export function relPathIn(at: Addressed, pathish: string): string {
  const absolute = resolve(process.cwd(), pathish)
  const relative = absolute.slice(at.root.length + 1)
  const bad = outOfBounds(relative)
  if (bad !== null) fail(bad)
  return relative
}

export function defaultMessage(repo: string, verb: string, paths: readonly string[]): string {
  const [only] = paths
  if (paths.length === 1 && only !== undefined) return `${repo}: ${verb} ${only}`
  return `${repo}: ${verb} ${paths.length} files\n\n${paths.join("\n")}`
}
