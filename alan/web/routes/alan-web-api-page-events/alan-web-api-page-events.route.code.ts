import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { eventsOpened } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const UNREACHED = 503

export async function loader({ request }: { request: Request }): Promise<Response> {
  const signedIn = await signedInAs(request)
  if (signedIn === null) {
    return Response.json({ ok: false, error: "Not authenticated." }, { status: 401 })
  }
  let answered: Response
  try {
    answered = await eventsOpened(request.signal)
  } catch (thrown) {
    const error = `The pages service opened no stream: ${String(thrown)}`
    return Response.json({ ok: false, error }, { status: UNREACHED })
  }
  if (!answered.ok || answered.body === null) {
    const error = `The pages service answered ${answered.status} rather than a stream.`
    return Response.json({ ok: false, error }, { status: UNREACHED })
  }
  return new Response(answered.body, {
    status: 200,
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache, no-transform",
      "x-accel-buffering": "no",
    },
  })
}
