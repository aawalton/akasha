import { writePage } from "@shared/pages-query"
import { askComposed } from "@shared/pages-query/ask"
import { type AuthorityKind, PERSON_AUTHORITY_SLUG } from "./page-type.ts"

const WRITER = "person-authority"

export interface GrantAuthorityArgs {
  readonly personSlug: string
  readonly authorityKind: AuthorityKind
  readonly target: string
}

export interface GrantAuthorityResult {
  readonly id: string
  readonly created: boolean
}

function grantName(personSlug: string, authorityKind: AuthorityKind, target: string): string {
  return `${personSlug}-${authorityKind}-${target}`
}

async function existingGrantId(
  personSlug: string,
  authorityKind: AuthorityKind,
  target: string
): Promise<string | undefined> {
  const asked = await askComposed({
    "page-type": PERSON_AUTHORITY_SLUG,
    where: {
      "person-slug": { is: personSlug },
      "authority-kind": { is: authorityKind },
      target: { is: target },
    },
    keys: ["id"],
    limit: 1,
  })
  if (!asked.ok) {
    throw new Error(
      `grantAuthority: whether \`${personSlug}\` already holds ${authorityKind} authority over \`${target}\` went unread, so nothing here says a grant is needed and a fresh one could be the second — ${asked.why}`
    )
  }
  const id = asked.answer.rows[0]?.values["id"]
  return typeof id === "string" ? id : undefined
}

export async function grantAuthority(args: GrantAuthorityArgs): Promise<GrantAuthorityResult> {
  const existingId = await existingGrantId(args.personSlug, args.authorityKind, args.target)
  if (existingId !== undefined) return { id: existingId, created: false }

  const id = Bun.randomUUIDv7()
  const written = await writePage(
    PERSON_AUTHORITY_SLUG,
    grantName(args.personSlug, args.authorityKind, args.target),
    {
      id,
      title: `${args.personSlug} → ${args.authorityKind} → ${args.target}`,
      "person-slug": args.personSlug,
      "authority-kind": args.authorityKind,
      target: args.target,
    },
    WRITER
  )
  if (!written.ok) throw new Error(`grantAuthority: ${written.why}`)
  return { id, created: true }
}
