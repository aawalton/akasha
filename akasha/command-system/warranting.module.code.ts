import { readFileSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, readingIn } from "./reading.module.code.ts"

const READ_CALL = "akasha read --file-path"

const REACH = [
  "LET THE OUTPUT REACH YOU. A read piped, redirected into a file, or sent to /dev/null is refused",
  "and records nothing, because what the record says is that the body reached you.",
].join("\n")

const SHORTER =
  "A body that moved since your record holds it comes back as what changed, where that is shorter."

export const ITSELF =
  "A write replaces the body standing there, and what is replaced is read first."

export const NO_AGENT = [
  "`AGENT_ID` names no agent, so there is no record to ask, and this call is refused whole.",
  "This should not be possible: the supervisor sets `AGENT_ID` when it spawns an agent, every read",
  "is recorded under it and every write is charged to it, and nothing is charged to nobody.",
  "Say that `AGENT_ID` is unset and stop here, rather than finding a way around it.",
].join("\n")

export type Warrant = {
  readonly path: string
  readonly oid: string
  readonly owed: string
}

export type Warranting = (root: string, path: string) => readonly Warrant[]

export function notReadOf(warrant: Warrant): string {
  return [
    `${warrant.path} — the record does not show you read this.`,
    warrant.owed,
    "This call reads it:",
    "",
    `  ${READ_CALL} ${warrant.path}`,
    "",
    REACH,
  ].join("\n")
}

export function movedOf(warrant: Warrant, held: string): string {
  return [
    `${warrant.path} — you read this, and it has changed since.`,
    `Your record holds ${held}, and ${warrant.oid} stands there now.`,
    warrant.owed,
    "It is read again here:",
    "",
    `  ${READ_CALL} ${warrant.path}`,
    "",
    SHORTER,
  ].join("\n")
}

function standingOf(root: string, path: string): string | null {
  try {
    return blobIdOf(readFileSync(join(root, path)))
  } catch {
    return null
  }
}

export function itselfIn(root: string, path: string): readonly Warrant[] {
  const standing = standingOf(root, path)
  return standing === null ? [] : [{ path, oid: standing, owed: ITSELF }]
}

export const WARRANTING: readonly Warranting[] = [itselfIn]

export function warrantsIn(root: string, path: string): readonly Warrant[] {
  return WARRANTING.flatMap((one) => one(root, path))
}

export function unreadIn(
  root: string,
  agentId: string | null,
  paths: readonly string[]
): readonly string[] {
  if (agentId === null) return [NO_AGENT]
  const said: string[] = []
  const asked = new Set<string>()
  for (const path of paths) {
    for (const warrant of warrantsIn(root, path)) {
      if (asked.has(warrant.path)) continue
      asked.add(warrant.path)
      const held = readingIn(root, agentId, warrant.path)
      if (held === null) said.push(notReadOf(warrant))
      else if (held.oid !== warrant.oid) said.push(movedOf(warrant, held.oid))
    }
  }
  return said
}
