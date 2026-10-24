import { authServer } from "akasha/alan/harness/better-auth-rr/modules/google-auth-server/google-auth-server.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { objectIn } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

export const SIGN_IN_PATH = "/sign-in"

export type SignedIn = {
  readonly contributor: string
  readonly subjectHash: string
}

const LOOKING_METHODS: ReadonlySet<string> = new Set(["GET", "HEAD", "OPTIONS"])

export const LOOKING_ONLY = "A browser signed in only to look sends nothing."

const FORBIDDEN = 403

async function sessionOf(request: Request): Promise<unknown> {
  try {
    return await authServer().api.getSession({ headers: request.headers })
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    console.error(`a session cookie would not read: ${why}`)
    return null
  }
}

export async function signedInAs(request: Request): Promise<SignedIn | null> {
  const user = objectIn(objectIn(await sessionOf(request))?.user)
  if (user === null) return null
  const contributor = textIn(user.contributor)
  if (contributor === null) return null
  return { contributor, subjectHash: textIn(user.subjectHash) ?? "" }
}

export async function looksOnly(request: Request): Promise<boolean> {
  return objectIn(objectIn(await sessionOf(request))?.session)?.look === true
}

export async function lookingRefused(
  request: Request,
  readByPost: ReadonlySet<string>
): Promise<Response | null> {
  if (LOOKING_METHODS.has(request.method.toUpperCase())) return null
  if (readByPost.has(new URL(request.url).pathname)) return null
  if (!(await looksOnly(request))) return null
  return Response.json({ ok: false, error: LOOKING_ONLY }, { status: FORBIDDEN })
}

export async function signedOutCookies(request: Request): Promise<ReadonlyArray<string>> {
  try {
    const answered = await authServer().api.signOut({
      headers: request.headers,
      asResponse: true,
    })
    return answered.headers.getSetCookie()
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    console.error(`a session would not be ended: ${why}`)
    return []
  }
}
