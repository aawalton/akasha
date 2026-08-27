import { readFileSync } from "node:fs"
import { diskFileTree } from "../page/file-tree.ts"
import { parseFrontmatter, textField } from "../page/frontmatter.ts"
import { compiledPageTypeFor } from "../page/property/frontmatter.ts"
import { registryOf } from "../page/property/registry.ts"
import { trackedIn } from "../page/tracked/tracked.ts"
import { akashaRoot, rootsHere } from "../repo/roots/roots.ts"
import { agentPageFor } from "./read-record.ts"
import { writerId } from "./writer.ts"

const PERSONA_SUFFIX = ".persona.md"

const PERSONA_SLUG_KEY = "persona-slug"

const SEAT_TYPE = "seat"

const TITLE_KEY = "title"

const EMAIL_KEY = "email-address"

export const CLAUDE_AUTHOR = "Claude <noreply@anthropic.com>"

function statedOn(page: string, key: string): string | null {
  try {
    return textField(parseFrontmatter(readFileSync(page, "utf8")), key)
  } catch {
    return null
  }
}

function personaOf(writer: string): string | null {
  const page = agentPageFor(writer)
  return page === null ? null : statedOn(page, PERSONA_SLUG_KEY)
}

function personaPage(slug: string): string | null {
  const root = akashaRoot()
  const wanted = `${slug}${PERSONA_SUFFIX}`
  for (const relPath of trackedIn(root)) {
    if (relPath === wanted || relPath.endsWith(`/${wanted}`)) return `${root}/${relPath}`
  }
  return null
}

export function personaAuthor(persona: string): string | null {
  const page = personaPage(persona)
  if (page === null) return null
  const named = statedOn(page, TITLE_KEY)
  const email = statedOn(page, EMAIL_KEY)
  return named === null || email === null ? null : `${named} <${email}>`
}

let statedDefault: string | null | undefined

function defaultPersona(): string | null {
  if (statedDefault !== undefined) return statedDefault
  statedDefault = null
  try {
    const tree = diskFileTree(rootsHere())
    const seat = registryOf(tree).find((one) => one.slug === SEAT_TYPE)
    const held = seat === undefined
      ? undefined
      : (compiledPageTypeFor(seat, tree).properties ?? []).find(
          (one) => one.name === PERSONA_SLUG_KEY
        )
    const value = held?.default
    if (typeof value === "string") statedDefault = value
  } catch {
    statedDefault = null
  }
  return statedDefault
}

let answered: string | null = null

export function commitAuthor(): string {
  if (answered !== null) return answered
  let found = CLAUDE_AUTHOR
  try {
    const writer = writerId()
    const persona = writer === null ? null : personaOf(writer)
    found =
      persona === null || persona === defaultPersona()
        ? CLAUDE_AUTHOR
        : (personaAuthor(persona) ?? CLAUDE_AUTHOR)
  } catch {
    found = CLAUDE_AUTHOR
  }
  answered = found
  return found
}

export function forgetCommitAuthor(): undefined {
  answered = null
}
