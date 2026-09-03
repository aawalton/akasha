import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import { seat } from "@akasha/seat-system/seat-page-type"
import { displayNameOf, personaAt } from "@tools/lib/akasha-personas"
import { pageTextOf } from "@tools/lib/seat-page-values"
import { writerIn } from "../reading/reading.module.code.ts"

const PERSONA_SLUG_KEY = "persona-slug"

export const CLAUDE_AUTHOR = "Claude <noreply@anthropic.com>"

// THE PERSONA A COMMIT IS AUTHORED AS IS READ FROM AKASHA. This opened the seat's old page and took
// the slug off its frontmatter, which tied who a commit is signed by to a store on its way out.
//
// A subagent states no persona of its own and is answered from the seat it was spawned under, which
// `pageTextOf` already does by splitting the id rather than opening anything.
function personaOf(writer: string): string | null {
  return pageTextOf(writer, PERSONA_SLUG_KEY)
}

export function personaAuthor(persona: string): string | null {
  const found = personaAt(ownRepoRoot(), persona)
  if (found === null) return null
  const email = found.emailAddress
  return email === null ? null : `${displayNameOf(found.slug)} <${email}>`
}

// THE DEFAULT PERSONA IS TAKEN OFF THE SEAT'S PAGE TYPE, WHICH IS IN AKASHA. This read the markdown
// page-type registry for a type slugged `seat` and took the default off its `persona-slug` property.
// The seat page type moved to akasha, so no markdown type is slugged `seat` any more — measured over
// the 370 types that registry holds, none is — and this had been answering null on every commit
// since the move, at the price of building the whole registry to do it.
//
// That price is not a constant. `registryOf` is served from the answer cache only while the shape
// mark is unchanged, and the mark is taken from folders somebody in this checkout is editing most
// of the time. With the mark null the call reads the corpus twice — 120,000 readdir entries and
// 62,000 opens, measured at 308-325ms against 85-88ms cached — synchronously, on the first commit
// each process makes.
//
// The page states its own default, so the fact is read from the page rather than from any index:
// no reading of the corpus, no git, and nothing to be stale, since a page's declaration arrives by
// loading its module. Checked answer for answer against the older reading, over every persona there
// is.
function defaultPersona(): string | null {
  for (const one of seat.properties) {
    if (one.pagePropertySlug !== PERSONA_SLUG_KEY) continue
    const value: unknown = "default" in one ? one.default : undefined
    return typeof value === "string" ? value : null
  }
  return null
}

let answered: string | null = null

export function commitAuthor(): string {
  if (answered !== null) return answered
  let found = CLAUDE_AUTHOR
  try {
    const writer = writerIn(process.env)
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
