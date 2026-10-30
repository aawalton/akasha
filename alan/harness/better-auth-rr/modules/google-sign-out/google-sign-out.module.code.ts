import { authServer } from "akasha/alan/harness/better-auth-rr/modules/google-auth-server/google-auth-server.module.code.ts"

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
