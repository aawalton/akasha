import { mayWrite } from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import type { ReadUser } from "akasha/page/access/modules/answer/answer.module.code.ts"
import {
  readPageWrite,
  runPageWrite,
  TAKES,
  writesAs,
} from "akasha/page/access/modules/answer-write/answer-write.module.code.ts"

let named: string | null = null

function namedOnce(writer: string): undefined {
  if (named === writer) return
  writesAs(writer)
  named = writer
}

export async function answerPageWrite(
  request: Request,
  writer: string,
  readUser: ReadUser
): Promise<Response> {
  namedOnce(writer)
  const { user, headers } = await readUser(request)
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
  const pageTypeSlug = String(asked.args["pageTypeSlug"])
  const reach = await mayWrite(user, pageTypeSlug)
  if (!reach.permitted) {
    return Response.json({ error: reach.why }, { status: 403, headers })
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
