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

/**
 * The git blob oid of a body.
 *
 * WORKED OUT HERE RATHER THAN BY A GIT PROCESS. A landing asks this once for every page file it
 * carries, and spawning git costs about four milliseconds each against the two seconds the whole
 * landing has. A blob oid is a sha1 over `blob <length>\0` and the bytes, which is the whole of
 * what `hash-object --stdin` did with a body it was handed no path for. Checked against `git
 * hash-object` over 5,000 page files: every one the same, and the same again after the utf8 round
 * trip a body read as text has already been through.
 *
 * A CLEAN FILTER WOULD MAKE THIS DISAGREE WITH `oidsUnder`, AND THAT DISAGREEMENT REFUSES RATHER
 * THAN MISLEADS. That walk hashes by path and so passes a body through whatever `.gitattributes`
 * names, where this cannot. There is none here; if one arrived, the marks worked out from these
 * oids would stop matching and the index would read as stale rather than as fresh.
 */
export function oidOfBody(body: Buffer): string {
  return createHash("sha1").update(`blob ${String(body.length)}\0`).update(body).digest("hex")
}
