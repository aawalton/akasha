import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { personSlugForContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { JENNY_SITE } from "akasha/product/smilingjenny/web/modules/jenny-handover-site/jenny-handover-site.module.code.ts"
import { redirect } from "react-router"

const JENNY = "jenny"

export type SignedIn = { contributor: string; headers: Headers }

export type SessionReader = (request: Request) => Promise<string | null>

const jennyReader: SessionReader = (request) => signedInAs(JENNY_SITE, request)

async function jennySignedIn(request: Request, read: SessionReader): Promise<SignedIn | null> {
  const contributor = await read(request)
  if (contributor === null) return null
  const reached = await personSlugForContributor(contributor)
  if (!reached.ok || reached.personSlug !== JENNY) return null
  return { contributor, headers: new Headers() }
}

export async function requireJenny(
  request: Request,
  read: SessionReader = jennyReader
): Promise<SignedIn> {
  const held = await jennySignedIn(request, read)
  if (held === null) throw redirect(JENNY_SITE.signInPath)
  return held
}

export async function requireApiJenny(
  request: Request,
  read: SessionReader = jennyReader
): Promise<SignedIn> {
  const held = await jennySignedIn(request, read)
  if (held === null) {
    throw Response.json({ ok: false, error: "Not signed in." }, { status: 401 })
  }
  return held
}
