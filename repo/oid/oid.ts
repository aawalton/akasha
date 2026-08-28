import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import { existsSync } from "node:fs"
import { join } from "node:path"

const BUFFER_CEILING = 64 * 1024 * 1024

const AT_ONCE = 500

function git(
  root: string,
  index: string | null,
  args: readonly string[],
  input: Buffer | null = null
): Buffer {
  return execFileSync("git", ["-C", root, ...args], {
    maxBuffer: BUFFER_CEILING,
    ...(input === null ? {} : { input }),
    env: index === null ? process.env : { ...process.env, GIT_INDEX_FILE: index },
  })
}

function zeroed(out: Buffer): readonly string[] {
  return out
    .toString("utf8")
    .split("\0")
    .filter((one) => one !== "")
}

function stagedUnder(root: string, index: string | null): Map<string, string> {
  const found = new Map<string, string>()
  for (const line of zeroed(git(root, index, ["ls-files", "-s", "-z"]))) {
    const tab = line.indexOf("\t")
    if (tab < 0) continue
    const oid = line.slice(0, tab).split(" ")[1]
    if (oid !== undefined) found.set(line.slice(tab + 1), oid)
  }
  return found
}

function hashedUnder(root: string, keys: readonly string[]): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < keys.length; at += AT_ONCE) {
    const out = git(root, null, ["hash-object", "--", ...keys.slice(at, at + AT_ONCE)])
    for (const line of out.toString("utf8").split("\n")) {
      if (line !== "") found.push(line)
    }
  }
  return found
}

export function oidsUnder(root: string, index: string | null): ReadonlyMap<string, string> {
  const found = stagedUnder(root, index)
  if (index !== null) return found
  const differing = zeroed(git(root, null, ["diff-files", "--name-only", "-z"]))
  const present: string[] = []
  for (const key of differing) {
    if (existsSync(join(root, key))) present.push(key)
    else found.delete(key)
  }
  const hashed = hashedUnder(root, present)
  present.forEach((key, at) => {
    const oid = hashed[at]
    if (oid !== undefined) found.set(key, oid)
  })
  return found
}

export function oidOfBody(body: Buffer): string {
  return createHash("sha1").update(`blob ${String(body.length)}\0`).update(body).digest("hex")
}
