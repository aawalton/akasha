import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { followSent } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const UNREACHED = 503

export async function action({ request }: { request: Request }): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ ok: false, error: "method-not-allowed" }, { status: 405 })
  }
  const signedIn = await signedInAs(request)
  if (signedIn === null) {
    return Response.json({ ok: false, error: "Not authenticated." }, { status: 401 })
  }
  let held: unknown
  try {
    held = await request.json()
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 })
  }
  try {
    const answered = await followSent(held)
    return new Response(answered.body, {
      status: answered.status,
      headers: { "content-type": "application/json" },
    })
  } catch (thrown) {
    const error = `The pages service took no follow: ${String(thrown)}`
    return Response.json({ ok: false, error }, { status: UNREACHED })
  }
}
