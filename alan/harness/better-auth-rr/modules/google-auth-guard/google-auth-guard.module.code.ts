import { authServer } from "akasha/alan/harness/better-auth-rr/modules/google-auth-server/google-auth-server.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { objectIn } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { safeInternalPath } from "akasha/page/url/modules/safe-target/safe-target.module.code.ts"
import { redirect } from "react-router"

export const SIGN_IN_PATH = "/sign-in"

export type SignedIn = {
  readonly contributor: string
  readonly subjectHash: string
}

export async function signedInAs(request: Request): Promise<SignedIn | null> {
  let session: unknown
  try {
    session = await authServer().api.getSession({ headers: request.headers })
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    console.error(`a session cookie would not read: ${why}`)
    return null
  }
  const user = objectIn(objectIn(session)?.user)
  if (user === null) return null
  const contributor = textIn(user.contributor)
  if (contributor === null) return null
  return { contributor, subjectHash: textIn(user.subjectHash) ?? "" }
}

export function signInAt(request: Request): string {
  const url = new URL(request.url)
  const asked = safeInternalPath(`${url.pathname}${url.search}`)
  if (asked === null || asked === "/") return SIGN_IN_PATH
  return `${SIGN_IN_PATH}?next=${encodeURIComponent(asked)}`
}

export async function contributorFor(request: Request): Promise<SignedIn> {
  const held = await signedInAs(request)
  if (held === null) throw redirect(signInAt(request))
  return held
}
