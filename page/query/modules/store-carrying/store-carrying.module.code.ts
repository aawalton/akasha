import { postingTo } from "akasha/page/query/modules/store-reaching/store-reaching.module.code.ts"

const SIGNED_IN_ONLY = "this route answers a signed-in reader only"

const TAKES = "the question is carried as a JSON body"

const UNREACHED = 502

const UNSIGNED = 401

const MALFORMED = 400

type Posting = (path: string, what: string, body: unknown) => ReturnType<typeof postingTo>

export async function carriedToStore(
  request: Request,
  path: string,
  what: string,
  signedIn: (asked: Request) => Promise<boolean>,
  post: Posting = (at, said, sent) => postingTo(at, said, sent)
): Promise<Response> {
  if (!(await signedIn(request))) {
    return Response.json({ error: SIGNED_IN_ONLY }, { status: UNSIGNED })
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: TAKES }, { status: MALFORMED })
  }
  const reached = await post(path, what, body)
  if (!reached.ok) {
    return Response.json({ refused: reached.why }, { status: reached.status ?? UNREACHED })
  }
  return Response.json(reached.body)
}
