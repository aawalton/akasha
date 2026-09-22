import { alanContributor } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import { postingTo } from "akasha/page/query/modules/store-reaching/store-reaching.module.code.ts"

const SIGNED_IN_ONLY = "this route answers a signed-in reader only"

const TAKES = "an ask carries the question as a JSON body"

const CARRIED = "an ask carried through the web"

const UNREACHED = 502

const UNSIGNED = 401

const MALFORMED = 400

export async function answerAsk(request: Request): Promise<Response> {
  const contributor = await alanContributor(request)
  if (contributor === null) {
    return Response.json({ error: SIGNED_IN_ONLY }, { status: UNSIGNED })
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: TAKES }, { status: MALFORMED })
  }
  const reached = await postingTo("/ask", CARRIED, body)
  if (!reached.ok) {
    return Response.json({ refused: reached.why }, { status: reached.status ?? UNREACHED })
  }
  return Response.json(reached.body)
}
