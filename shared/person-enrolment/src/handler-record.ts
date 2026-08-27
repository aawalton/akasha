import { getPages } from "@shared/pages-access/get"
import { patchPageById } from "@shared/pages-access/patch"

export const RELATIONSHIP_SLUG = "relationship"

export interface HandlerRecord {
  readonly relationshipId: string
  readonly handlerSeat: string
  readonly phone: string | null
}

export class NoRelationshipRow extends Error {
  constructor(readonly accountUserId: string) {
    super(
      `no \`${RELATIONSHIP_SLUG}\` row carries accountUserId ${accountUserId}, so there is ` +
        "nowhere for this person's handler to be read from. The routing path matches an " +
        "inbound against that row; enrolling without one records a handler nothing consults."
    )
    this.name = "NoRelationshipRow"
  }
}

export async function findRelationship(accountUserId: string): Promise<string | null> {
  const { rows } = await getPages({
    pageTypeSlug: RELATIONSHIP_SLUG,
    where: [{ key: "accountUserId", eq: accountUserId }],
    select: ["id"],
    limit: 1,
  })
  return rows[0]?.id ?? null
}

export async function writeHandlerRecord(args: {
  readonly accountUserId: string
  readonly handlerSeat: string
  readonly phone: string | null
}): Promise<HandlerRecord> {
  const relationshipId = await findRelationship(args.accountUserId)
  if (relationshipId === null) throw new NoRelationshipRow(args.accountUserId)

  const set: Record<string, string> = { smsHandlerTarget: args.handlerSeat }
  if (args.phone !== null) set.phone = args.phone

  await patchPageById({ pageTypeSlug: RELATIONSHIP_SLUG, id: relationshipId, set })
  return { relationshipId, handlerSeat: args.handlerSeat, phone: args.phone }
}

export async function readHandlerRecord(accountUserId: string): Promise<string | null> {
  const { rows } = await getPages({
    pageTypeSlug: RELATIONSHIP_SLUG,
    where: [{ key: "accountUserId", eq: accountUserId }],
    select: ["smsHandlerTarget"],
    limit: 1,
  })
  const raw = rows[0]?.smsHandlerTarget
  if (typeof raw !== "string") return null
  const target = raw.trim()
  return target.length > 0 ? target : null
}
