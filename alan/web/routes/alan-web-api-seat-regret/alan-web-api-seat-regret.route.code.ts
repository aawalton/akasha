import { regret } from "akasha/agent/seat/supervisor/supervisor-action/pages/regret.supervisor-action.ts"
import { supervisorAction } from "akasha/agent/seat/supervisor/supervisor-action/supervisor-action.page-type.ts"
import { working } from "akasha/agent/seat/turn-state/pages/working/working.seat-turn-state.ts"
import { seatTurnState } from "akasha/agent/seat/turn-state/seat-turn-state.page-type.ts"
import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import {
  refused,
  seatPathOf,
  seatSlugOf,
  senderOf,
} from "akasha/alan/web/modules/seat-message-asking/seat-message-asking.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  askingFor,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { z } from "zod"

const SEAT_PAGE_TYPE_SLUG = "seat"

const WRITER = "alanwalton web <web@alanwalton.com>"

const WORKING = `${seatTurnState.slug}/${working.slug}`

const PERSON = "person"

const WAIT_MS = 45_000

const NAP_MS = 500

const ASKED = z.object({
  seat: z.string().min(1),
  message: z.string().regex(/^message-[0-9a-f]{12}$/),
})

type Said = { readonly kind?: unknown; readonly sender?: unknown; readonly message?: unknown }

type Held = {
  readonly said: readonly Said[]
  readonly working: boolean
  readonly asked: boolean
}

function saidIn(held: unknown): readonly Said[] {
  if (!Array.isArray(held)) return []
  return held.filter((one): one is Said => typeof one === "object" && one !== null)
}

function askedIn(held: unknown): boolean {
  if (typeof held !== "object" || held === null) return false
  return textIn((held as { readonly action?: unknown }).action) !== null
}

async function heldOf(id: string): Promise<Held | { readonly refused: string }> {
  const asked = await askingFor({
    pageTypeSlug: SEAT_PAGE_TYPE_SLUG,
    where: { id: { is: id } },
    keys: ["conversation", "turnState", "request"],
    limit: 1,
  })
  if ("refused" in asked) return asked
  const row = asked.rows[0]
  return {
    said: saidIn(row?.conversation),
    working: textIn(row?.turnState) === WORKING,
    asked: askedIn(row?.request),
  }
}

function lastPersonSaid(said: readonly Said[]): Said | null {
  for (let back = said.length - 1; back >= 0; back -= 1) {
    const one = said[back]
    if (one?.kind === PERSON) return one
  }
  return null
}

function holds(said: readonly Said[], message: string): boolean {
  return said.some((one) => one.message === message)
}

function regrettable(held: Held, from: string, message: string): Response | null {
  const mine = held.said.find((one) => one.message === message)
  if (mine === undefined) return refused("the seat's conversation holds no such message", 404)
  if (mine.sender !== from) return refused("only the person who sent a message takes it back", 403)
  if (!held.working || lastPersonSaid(held.said)?.message !== message) {
    return refused("the reply to that message has finished or moved on, so it stays", 409)
  }
  return null
}

async function answered(id: string, message: string): Promise<Response> {
  const until = Date.now() + WAIT_MS
  while (Date.now() < until) {
    await new Promise((settle) => setTimeout(settle, NAP_MS))
    const held = await heldOf(id)
    if ("refused" in held) continue
    if (!holds(held.said, message)) return Response.json({ ok: true })
    if (!held.asked) {
      return refused("the seat kept that message, since its reply had already moved past it", 409)
    }
  }
  return refused("the seat did not answer in time, so the message may still be taken back", 504)
}

export async function action({ request }: { request: Request }): Promise<Response> {
  if (request.method !== "POST") return refused("method-not-allowed", 405)
  const signedIn = await signedInAs(request)
  if (signedIn === null) return refused("Not authenticated.", 401)
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return refused("Invalid request body.", 400)
  }
  const asked = ASKED.safeParse(body)
  if (!asked.success) return refused("A regret names a seat and a message.", 400)
  const { seat, message } = asked.data
  const from = await senderOf(signedIn.contributor)
  if (typeof from !== "string") return refused(from.refused, 403)
  const slug = await seatSlugOf(from, seat)
  if (typeof slug !== "string") return refused(slug.refused, slug.status)
  const held = await heldOf(seat)
  if ("refused" in held) return refused(held.refused, 503)
  const refusal = regrettable(held, from, message)
  if (refusal !== null) return refusal
  const path = await seatPathOf(slug)
  if (path === null) return refused(`no page is read for the seat \`${slug}\``, 503)
  const wrote = await writingFor({
    writer: WRITER,
    message: `${from} takes a message back from the ${slug} seat`,
    kept: [
      {
        path,
        values: {
          request: {
            action: namedAs(supervisorAction.slug, regret.slug, null),
            message: null,
            armedAt: null,
            regretted: message,
          },
        },
      },
    ],
  })
  if ("refused" in wrote) return refused(wrote.refused, 503)
  return await answered(seat, message)
}
