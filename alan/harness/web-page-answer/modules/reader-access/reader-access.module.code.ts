import { asObjectRecord } from "akasha/code/type/narrowing/modules/as-object-record/as-object-record.module.code.ts"
import { namedWithin } from "akasha/page/access/modules/answer/answer.module.code.ts"
import { askedNarrow } from "akasha/page/access/modules/read-gate/read-gate.module.code.ts"
import type { Test } from "akasha/page/service/modules/where-testing/where-testing.module.code.ts"
import {
  asContributor,
  personSlugFor,
} from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import {
  ANONYMOUS_PERSON,
  DEEDS,
  type Deed,
  type Grant,
  pageTypeGrantsFor,
  type Reach,
  reachOf,
} from "akasha/person/modules/page-type-access/page-type-access.module.code.ts"

const HELD_FOR_MS = 5_000

type Held<Answer> = { readonly at: number; readonly answer: Promise<Answer> }

const grantsHeld = new Map<string, Held<readonly Grant[]>>()

const peopleHeld = new Map<string, Held<string | null>>()

function heldIn<Answer>(
  store: Map<string, Held<Answer>>,
  key: string,
  work: () => Promise<Answer>
): Promise<Answer> {
  const now = Date.now()
  const kept = store.get(key)
  if (kept !== undefined && now - kept.at < HELD_FOR_MS) return kept.answer
  const answer = work()
  store.set(key, { at: now, answer })
  return answer
}

const PERSON = "person"

const CONTRIBUTOR = "contributor"

function saidBy(user: object, key: string): string | null {
  const said = asObjectRecord(user)?.[key]
  return typeof said === "string" && said !== "" ? said : null
}

export async function personOf(user: object | null): Promise<string | null> {
  if (user === null) return ANONYMOUS_PERSON
  const named = saidBy(user, PERSON)
  if (named !== null) return named
  const contributor = saidBy(user, CONTRIBUTOR)
  if (contributor === null) return ANONYMOUS_PERSON
  return heldIn(peopleHeld, contributor, async () => {
    const enrolled = await personSlugFor(asContributor(contributor))
    if (enrolled.ok) return enrolled.personSlug
    console.warn(`[reader-access] no person holds the contributor: ${enrolled.why}`)
    return null
  })
}

const READS_NOTHING: Reach = {
  permitted: false,
  why: "no person holds the session this was asked under",
}

async function reachFor(user: object | null, pageTypeSlug: string, deed: Deed): Promise<Reach> {
  const personSlug = await personOf(user)
  if (personSlug === null) return READS_NOTHING
  const grants = await heldIn(grantsHeld, personSlug, async () => {
    const held = await pageTypeGrantsFor(personSlug)
    if (held.ok) return held.grants
    console.warn(`[reader-access] the access pages went unread: ${held.why}`)
    return []
  })
  return reachOf(grants, pageTypeSlug, deed, personSlug)
}

export function mayRead(user: object | null, pageTypeSlug: string): Promise<Reach> {
  return reachFor(user, pageTypeSlug, DEEDS.READ)
}

type Where = Readonly<Record<string, Test>>

const NARROWS_DISAGREE = "the accesses reaching this page type narrow it by different keys"

const ASKED_PAST_NARROW = "the pages asked for lie outside the narrow this reader may read"

type ReadWhere = { readonly where: Where } | { readonly refused: string }

export function whereWithin(reach: Reach, where: Where): ReadWhere {
  if (!reach.permitted) return { refused: reach.why }
  const narrowed = askedNarrow(reach.narrows)
  if (narrowed === null) return { refused: NARROWS_DISAGREE }
  const held = namedWithin(narrowed, where)
  return held === null || held === undefined ? { refused: ASKED_PAST_NARROW } : { where: held }
}

export async function whereReadBy(
  user: object | null,
  pageTypeSlug: string,
  where: Where
): Promise<ReadWhere> {
  return whereWithin(await mayRead(user, pageTypeSlug), where)
}

export function narrowedWrite(reach: Reach): string | null {
  if (!reach.permitted) return null
  if (reach.narrows === null) return null
  return "the access naming this page type for writing carries a narrow, and a write is not held to one"
}

export async function mayWrite(user: object | null, pageTypeSlug: string): Promise<Reach> {
  const reach = await reachFor(user, pageTypeSlug, DEEDS.WRITE)
  const why = narrowedWrite(reach)
  return why === null ? reach : { permitted: false, why }
}
