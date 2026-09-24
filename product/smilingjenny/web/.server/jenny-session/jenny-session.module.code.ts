import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { personSlugForContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { JENNY_SITE } from "akasha/product/smilingjenny/web/modules/jenny-handover-site/jenny-handover-site.module.code.ts"
import { redirect } from "react-router"

const ADMITTED: ReadonlySet<string> = new Set(["jenny", "alan"])

export type SignedIn = { contributor: string; headers: Headers }

export type SessionReader = (request: Request) => Promise<string | null>

const jennyReader: SessionReader = (request) => signedInAs(JENNY_SITE, request)

export type Reading =
  | { readonly admitted: true; readonly signedIn: SignedIn }
  | { readonly admitted: false; readonly aStranger: boolean }

const NOT_HERS = "This site is Jenny's, and you are signed in as somebody else."

async function reading(request: Request, read: SessionReader): Promise<Reading> {
  const contributor = await read(request)
  if (contributor === null) return { admitted: false, aStranger: true }
  const reached = await personSlugForContributor(contributor)
  if (!reached.ok || !ADMITTED.has(reached.personSlug)) {
    return { admitted: false, aStranger: false }
  }
  return { admitted: true, signedIn: { contributor, headers: new Headers() } }
}

export async function requireJenny(
  request: Request,
  read: SessionReader = jennyReader
): Promise<SignedIn> {
  const held = await reading(request, read)
  if (held.admitted) return held.signedIn
  if (held.aStranger) throw redirect(JENNY_SITE.signInPath)
  throw new Response(NOT_HERS, { status: 403 })
}

export async function requireApiJenny(
  request: Request,
  read: SessionReader = jennyReader
): Promise<SignedIn> {
  const held = await reading(request, read)
  if (held.admitted) return held.signedIn
  throw Response.json({ ok: false, error: "Not signed in." }, { status: 401 })
}
