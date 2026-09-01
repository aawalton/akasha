import { diskFileTree } from "../page/file-tree.ts"
import { compiledPageTypeFor } from "../page/property/frontmatter.ts"
import { registryOf } from "../page/property/registry.ts"
import { ownRepoRoot, rootsHere } from "@akasha/pages-system/checkout-roots"
import { displayNameOf, personaAt } from "../tools/lib/akasha-personas.ts"
import { pageTextOf } from "../tools/lib/seat-page-values.ts"
import { writerId } from "./writer.ts"

const PERSONA_SLUG_KEY = "persona-slug"

const SEAT_TYPE = "seat"

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
  const standing = personaAt(ownRepoRoot(), persona)
  if (standing === null) return null
  const email = standing.emailAddress
  return email === null ? null : `${displayNameOf(standing.slug)} <${email}>`
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
