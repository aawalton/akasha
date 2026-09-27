import { mayRead } from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import { asObjectRecord } from "akasha/code/type/narrowing/modules/as-object-record/as-object-record.module.code.ts"
import type { MayRead, ReadUser } from "akasha/page/access/modules/answer/answer.module.code.ts"
import { askedNarrow } from "akasha/page/access/modules/read-gate/read-gate.module.code.ts"
import {
  eventsOpened,
  followSent,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const UNREACHED = 503

const WHERE = "where"

const UNASKED = "a follow is asked for by a JSON object naming its `follows`"

type Gated = {
  readonly body: Readonly<Record<string, unknown>>
  readonly withheld: readonly string[]
}

export async function gatedFollows(
  given: unknown,
  user: object | null,
  reach: MayRead
): Promise<Gated | null> {
  const body = asObjectRecord(given)
  if (body === undefined || !Array.isArray(body.follows)) return null
  const follows: unknown[] = []
  const withheld: string[] = []
  for (const one of body.follows) {
    const follow = asObjectRecord(one)
    if (follow === undefined || typeof follow.pageTypeSlug !== "string") {
      follows.push(one)
      continue
    }
    const reading = await reach(user, follow.pageTypeSlug)
    const where = reading.permitted ? askedNarrow(reading.narrows) : null
    if (where === null) {
      withheld.push(String(follow.key))
      continue
    }
    const asked = Object.fromEntries(Object.entries(follow).filter(([key]) => key !== WHERE))
    follows.push(where === undefined ? asked : { ...asked, [WHERE]: where })
  }
  return { body: { ...body, follows }, withheld }
}

export async function answerFollow(request: Request, readUser: ReadUser): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ ok: false, error: "method-not-allowed" }, { status: 405 })
  }
  let given: unknown
  try {
    given = await request.json()
  } catch {
    return Response.json({ ok: false, error: UNASKED }, { status: 400 })
  }
  const { user } = await readUser(request)
  const gated = await gatedFollows(given, user, mayRead)
  if (gated === null) return Response.json({ ok: false, error: UNASKED }, { status: 400 })
  let answered: Response
  try {
    answered = await followSent(gated.body)
  } catch (thrown) {
    const error = `The pages service took no follow: ${String(thrown)}`
    return Response.json({ ok: false, error }, { status: UNREACHED })
  }
  const said = asObjectRecord(await answered.json().catch(() => null)) ?? {}
  return Response.json({ ...said, withheld: gated.withheld }, { status: answered.status })
}

const OPEN = Symbol.for("akasha.answer-following.open")

type Holding = { [OPEN]?: Set<() => undefined> }

function openIn(held: Holding): Set<() => undefined> {
  const found = held[OPEN] ?? new Set<() => undefined>()
  held[OPEN] = found
  return found
}

const open = openIn(globalThis as Holding)

export function eventsEnded(): number {
  const ending = [...open]
  for (const end of ending) end()
  return ending.length
}

export function endable(given: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const reader = given.getReader()
  let end = (): undefined => undefined
  return new ReadableStream<Uint8Array>({
    start(controller) {
      end = () => {
        open.delete(end)
        try {
          controller.close()
        } catch {}
        reader.cancel().catch(() => undefined)
        return undefined
      }
      open.add(end)
    },
    async pull(controller) {
      try {
        const { value, done } = await reader.read()
        if (!done) return controller.enqueue(value)
        open.delete(end)
        controller.close()
      } catch (thrown) {
        if (!open.has(end)) return
        open.delete(end)
        controller.error(thrown)
      }
    },
    cancel(reason) {
      open.delete(end)
      return reader.cancel(reason)
    },
  })
}

export async function answerEvents(request: Request): Promise<Response> {
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
  return new Response(endable(answered.body), {
    status: 200,
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache, no-transform",
      "x-accel-buffering": "no",
    },
  })
}
