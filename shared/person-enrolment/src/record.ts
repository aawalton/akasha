import { createPage } from "@shared/pages-access/create"
import { getPages } from "@shared/pages-access/get"
import { patchPageById } from "@shared/pages-access/patch"
import { type Page } from "@shared/pages-core/page-types"
import { type PersonDocument } from "@shared/person-document/person-document"
import type { EnrolledPerson } from "./page-type"
import { PERSON_SLUG } from "./page-type"

export const ACCOUNT_KEY = "accountUserId"

const PERSON_KEYS = ["slug", ACCOUNT_KEY, "identitySlug", "phone", "email"] as const

export class PersonRecordUnreadable extends Error {
  readonly personSlug: string
  readonly missing: string

  constructor(personSlug: string, missing: string) {
    super(
      `the \`${PERSON_SLUG}\` page \`${personSlug}\` states no \`${missing}\`, which that page ` +
        "type declares as required — refusing to stand a person record on a value nothing read"
    )
    this.name = "PersonRecordUnreadable"
    this.personSlug = personSlug
    this.missing = missing
  }
}

function textOf(row: Page, key: string): string | null {
  const value = row[key]
  return typeof value === "string" && value !== "" ? value : null
}

function enrolledPerson(row: Page): EnrolledPerson | null {
  const slug = textOf(row, "slug")
  if (slug === null) throw new PersonRecordUnreadable(String(row.id ?? "(unnamed)"), "slug")
  const personUserId = textOf(row, ACCOUNT_KEY)
  if (personUserId === null) return null
  const persona = textOf(row, "identitySlug")
  if (persona === null) throw new PersonRecordUnreadable(slug, "identity-slug")
  return {
    slug,
    personUserId,
    persona,
    handlerSeat: slug,
    phone: textOf(row, "phone"),
    email: textOf(row, "email"),
  }
}

async function personPages(
  where: { readonly key: string; readonly eq: string } | null
): Promise<readonly Page[]> {
  const { rows } = await getPages({
    pageTypeSlug: PERSON_SLUG,
    ...(where === null ? {} : { where: [where] }),
    select: [...PERSON_KEYS],
  })
  return rows
}

export async function readEnrolment(slug: string): Promise<EnrolledPerson | null> {
  const rows = await personPages({ key: "slug", eq: slug })
  const row = rows[0]
  return row === undefined ? null : enrolledPerson(row)
}

export async function readEnrolmentByAccount(
  accountUserId: string
): Promise<EnrolledPerson | null> {
  const rows = await personPages({ key: ACCOUNT_KEY, eq: accountUserId })
  const row = rows[0]
  return row === undefined ? null : enrolledPerson(row)
}

export async function personSlugForAccount(accountUserId: string): Promise<string | null> {
  const rows = await personPages({ key: ACCOUNT_KEY, eq: accountUserId })
  return rows[0] === undefined ? null : textOf(rows[0], "slug")
}

export async function readEnrolmentByHandlerSeat(
  handlerSeat: string
): Promise<EnrolledPerson | null> {
  const rows = await personPages(null)
  for (const row of rows) {
    const person = enrolledPerson(row)
    if (person !== null && person.handlerSeat === handlerSeat) return person
  }
  return null
}

export async function writeEnrolment(args: {
  readonly person: PersonDocument
  readonly accountUserId: string
}): Promise<string> {
  const { person } = args
  const properties: Record<string, string> = {
    slug: person.slug,
    identitySlug: person.persona,
    [ACCOUNT_KEY]: args.accountUserId,
  }
  if (person.phone !== null) properties.phone = person.phone
  if (person.email !== null) properties.email = person.email

  const { rows } = await getPages({
    pageTypeSlug: PERSON_SLUG,
    where: [{ key: "slug", eq: person.slug }],
    select: ["id"],
    limit: 1,
  })
  const existing = rows[0]
  if (existing !== undefined) {
    await patchPageById({ pageTypeSlug: PERSON_SLUG, id: existing.id, set: properties })
    return existing.id
  }

  const page = await createPage({
    pageTypeSlug: PERSON_SLUG,
    properties: { title: person.slug, ...properties },
    select: ["id"],
  })
  return page.id
}
