import { readPageWrite, runPageWrite, TAKES, writesAs } from "@shared/pages-access/answer-write"
import { getUser } from "@shared/supabase-rr/auth/server"

/**
 * This stands apart from the route module rather than in it. React Router strips
 * only `loader`, `action`, `middleware` and `headers` from a route, so any other
 * export there holds its imports into the client bundle — and these are
 * server-only. The route is its `action` and nothing else.
 *
 * Why the route exists: a file-backed page's write goes to the page query
 * service, which stands on the workstation behind a cluster DNS name a browser
 * cannot resolve. The browser hands the write here, and here it runs against
 * exactly the same `@shared/pages-access` function the browser called.
 *
 * The client is the reader's own, not the service role, so a write against a
 * page type still held in rows is judged by the same policies it always was.
 */

writesAs("atlas-web")

export async function answerPageWrite(request: Request): Promise<Response> {
  const { user, headers } = await getUser(request)
  if (user === null) {
    return Response.json(
      { error: "this route answers a signed-in writer only" },
      { status: 401, headers }
    )
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: TAKES }, { status: 400, headers })
  }
  const asked = readPageWrite(body)
  if (asked === null) {
    return Response.json({ error: TAKES }, { status: 400, headers })
  }
  try {
    return Response.json({ result: await runPageWrite(asked) }, { headers })
  } catch (err: unknown) {
    // The message is the whole refusal: the write seam explains what it refused
    // and what to do instead, and a browser that only saw "500" would report a
    // transport fault for what is a stated refusal.
    return Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 400, headers }
    )
  }
}
