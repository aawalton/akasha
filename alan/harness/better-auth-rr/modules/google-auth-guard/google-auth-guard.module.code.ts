import { authServer } from "akasha/alan/harness/better-auth-rr/modules/google-auth-server/google-auth-server.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { objectIn } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

export const SIGN_IN_PATH = "/sign-in"

export type SignedIn = {
  readonly contributor: string
  readonly subjectHash: string
}

export async function sessionOf(request: Request): Promise<unknown> {
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
