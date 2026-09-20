import { appHandoverBody } from "akasha/alan/harness/better-auth-rr/modules/app-handover-session/app-handover-session.module.code.ts"
import { authServer } from "akasha/alan/harness/better-auth-rr/modules/google-auth-server/google-auth-server.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { objectIn } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const NOT_ALLOWED = "Method not allowed."

const NO_BODY = "Invalid request body."

const NO_TRADE = "Not authenticated."

const NO_SESSION = "Session not established."

type Traded = {
  readonly headers: Headers
  readonly response: unknown
}

export function loader(): Response {
  return Response.json(
    { ok: false, error: NOT_ALLOWED },
    { status: 405, headers: { allow: "POST" } }
  )
}

export async function action({ request }: { request: Request }): Promise<Response> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: NO_BODY }, { status: 400 })
  }

  const parsed = appHandoverBody.safeParse(body)
  if (!parsed.success) {
    return Response.json({ ok: false, error: NO_BODY }, { status: 400 })
  }

  let traded: Traded
  try {
    traded = await authServer().api.appHandoverExchange({
      body: { code: parsed.data.code, verifier: parsed.data.verifier },
      headers: request.headers,
      returnHeaders: true,
    })
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    console.error(`an app handover would not trade: ${why}`)
    return Response.json({ ok: false, error: NO_SESSION }, { status: 500 })
  }

  const contributor = textIn(objectIn(traded.response)?.contributor)
  if (contributor === null) {
    return Response.json({ ok: false, error: NO_TRADE }, { status: 401 })
  }

  const headers = new Headers()
  for (const cookie of traded.headers.getSetCookie()) headers.append("set-cookie", cookie)
  return Response.json({ ok: true, contributor }, { headers })
}
