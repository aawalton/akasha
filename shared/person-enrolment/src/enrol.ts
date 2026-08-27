import { grantAccess } from "@shared/person-access/grant"
import { type AccessKind } from "@shared/person-access/page-type"
import { grantAuthority } from "@shared/person-authority/grant"
import { type AuthorityKind } from "@shared/person-authority/page-type"
import { handlerSeatName, type PersonDocument } from "@shared/person-document/person-document"
import { readHandlerRecord, writeHandlerRecord } from "./handler-record"
import { readEnrolment, writeEnrolment } from "./record"

export interface AccessGrant {
  readonly accessKind: AccessKind
  readonly target: string
  readonly serves?: string
}

export interface AuthorityGrant {
  readonly authorityKind: AuthorityKind
  readonly target: string
}

export interface EnrolArgs {
  readonly person: PersonDocument
  readonly accountUserId: string
  readonly access: readonly AccessGrant[]
  readonly authority: readonly AuthorityGrant[]
}

export interface EnrolResult {
  readonly slug: string
  readonly accountUserId: string
  readonly handlerSeat: string
  readonly accessGranted: number
  readonly authorityGranted: number
  readonly created: boolean
}

export class EnrolmentUnverified extends Error {
  constructor(
    readonly slug: string,
    readonly what: string
  ) {
    super(
      `enrolling ${slug}: ${what} was written but did not read back, so this person is NOT ` +
        "marked enrolled. Nothing is rolled back — the act is idempotent, so re-running it " +
        "is the repair once the cause is understood."
    )
    this.name = "EnrolmentUnverified"
  }
}

export async function enrolPerson(args: EnrolArgs): Promise<EnrolResult> {
  const { person, accountUserId } = args
  const handlerSeat = handlerSeatName(person.persona, person.slug)

  await writeHandlerRecord({ accountUserId, handlerSeat, phone: person.phone })

  let accessGranted = 0
  for (const grant of args.access) {
    const result = await grantAccess({
      personSlug: person.slug,
      accessKind: grant.accessKind,
      target: grant.target,
      ...(grant.serves === undefined ? {} : { serves: grant.serves }),
    })
    if (result.created) accessGranted += 1
  }

  let authorityGranted = 0
  for (const grant of args.authority) {
    const result = await grantAuthority({
      personSlug: person.slug,
      authorityKind: grant.authorityKind,
      target: grant.target,
    })
    if (result.created) authorityGranted += 1
  }

  const recorded = await readHandlerRecord(accountUserId)
  if (recorded !== handlerSeat) throw new EnrolmentUnverified(person.slug, "the handler record")

  const already = await readEnrolment(person.slug)
  await writeEnrolment({ person, accountUserId })

  return {
    slug: person.slug,
    accountUserId,
    handlerSeat,
    accessGranted,
    authorityGranted,
    created: already === null,
  }
}
