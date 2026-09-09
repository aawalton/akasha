import { ownRepoRoot } from "@akasha/pages/checkout-roots"
import { slugOf } from "@akasha/pages/page-value"
import { displayNameOf, personaAt } from "@akasha/personas/persona-reading"
import { seat } from "@akasha/seat-system/seat-page-type"
import { pageTextOf } from "@akasha/seat-system/seat-page-values"
import { writerIn } from "../../../command-system/reading/reading.module.code.ts"

const PERSONA_SLUG_KEY = "persona-slug"

const PERSONA_SLUG_PROPERTY = "seat-persona"

export const CLAUDE_AUTHOR = "Claude <noreply@anthropic.com>"

function personaOf(writer: string): string | null {
  return pageTextOf(writer, PERSONA_SLUG_KEY)
}

export function personaAuthor(persona: string): string | null {
  const found = personaAt(ownRepoRoot(), persona)
  if (found === null) return null
  const email = found.email
  return email === null ? null : `${displayNameOf(found.slug)} <${email}>`
}

function defaultPersona(): string | null {
  for (const one of seat.properties) {
    if (slugOf(one.pageProperty) !== PERSONA_SLUG_PROPERTY) continue
    const value: unknown = "default" in one ? one.default : undefined
    return typeof value === "string" ? value : null
  }
  return null
}

let answered: string | null = null

export function commitAuthor(
  env: Readonly<Record<string, string | undefined>> = process.env
): string {
  if (answered !== null) return answered
  let found = CLAUDE_AUTHOR
  try {
    const writer = writerIn(env)
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
