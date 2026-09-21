import { asObjectRecord } from "akasha/code/type/narrowing/modules/as-object-record/as-object-record.module.code.ts"
import {
  asContributor,
  personSlugFor,
} from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import {
  ANONYMOUS_PERSON,
  DEEDS,
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

function contributorOf(user: object): string | null {
  const said = asObjectRecord(user)?.["contributor"]
  return typeof said === "string" && said !== "" ? said : null
}

export async function personOf(user: object | null): Promise<string | null> {
  if (user === null) return ANONYMOUS_PERSON
  const contributor = contributorOf(user)
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

export async function mayRead(user: object | null, pageTypeSlug: string): Promise<Reach> {
  const personSlug = await personOf(user)
  if (personSlug === null) return READS_NOTHING
  const grants = await heldIn(grantsHeld, personSlug, async () => {
    const held = await pageTypeGrantsFor(personSlug)
    if (held.ok) return held.grants
    console.warn(`[reader-access] the access pages went unread: ${held.why}`)
    return []
  })
  return reachOf(grants, pageTypeSlug, DEEDS.READ, personSlug)
}
