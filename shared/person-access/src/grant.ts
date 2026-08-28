import { writePage } from "@shared/pages-query"
import { askComposed } from "@shared/pages-query/ask"
import { type AccessKind, PERSON_ACCESS_SLUG } from "./page-type"

const WRITER = "person-access"

export interface GrantArgs {
  readonly personSlug: string
  readonly accessKind: AccessKind
  readonly target: string
  readonly serves?: string
}

export interface GrantResult {
  readonly id: string
  readonly created: boolean
}

function grantName(personSlug: string, accessKind: AccessKind, target: string): string {
  return `${personSlug}-${accessKind}-${target}`
}

async function existingGrantId(
  personSlug: string,
  accessKind: AccessKind,
  target: string
): Promise<string | undefined> {
  const asked = await askComposed({
    "page-type": PERSON_ACCESS_SLUG,
    where: {
      "person-slug": { is: personSlug },
      "access-kind": { is: accessKind },
      target: { is: target },
    },
    keys: ["id"],
    limit: 1,
  })
  // A QUERY NOTHING ANSWERED IS NOT A GRANT THAT DOES NOT STAND. Handing `undefined` back here
  // sent the caller on to mint a uuid and write a fresh page, which is a second grant for one that
  // may already stand, carrying an id nothing else holds.
  if (!asked.ok) {
    throw new Error(
      `grantAccess: whether \`${personSlug}\` already holds ${accessKind} access to \`${target}\` went unread, so nothing here says a grant is needed and a fresh one could be the second — ${asked.why}`
    )
  }
  const id = asked.answer.rows[0]?.values["id"]
  return typeof id === "string" ? id : undefined
}

export async function grantAccess(args: GrantArgs): Promise<GrantResult> {
  const existingId = await existingGrantId(args.personSlug, args.accessKind, args.target)
  if (existingId !== undefined) return { id: existingId, created: false }

  const id = Bun.randomUUIDv7()
  const written = await writePage(
    PERSON_ACCESS_SLUG,
    grantName(args.personSlug, args.accessKind, args.target),
    {
      id,
      title: `${args.personSlug} → ${args.target}`,
      "person-slug": args.personSlug,
      "access-kind": args.accessKind,
      target: args.target,
      ...(args.serves === undefined ? {} : { serves: args.serves }),
    },
    WRITER
  )
  if (!written.ok) throw new Error(`grantAccess: ${written.why}`)
  return { id, created: true }
}
