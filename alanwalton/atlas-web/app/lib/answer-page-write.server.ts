import { readPageWrite, runPageWrite, TAKES, writesAs } from "@shared/pages-access/answer-write"
import { getUser } from "@shared/supabase-rr/auth/server"

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
    return Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 400, headers }
    )
  }
}
