import {
  isNotice,
  type Notice,
  noticeFor,
  noticesWith,
} from "akasha/agent/seat/modules/notice-choosing/seat-notice-choosing.module.code.ts"
import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { whereReadBy } from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import {
  type Refused,
  refused,
  senderOf,
} from "akasha/alan/web/modules/seat-message-asking/seat-message-asking.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  askingFor,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const SEAT = "seat"

const PERSON = "person"

const SEAT_NOTICES = "seatNotices"

const WRITER = "alanwalton web <web@alanwalton.com>"

type Chooser = { readonly person: string; readonly seat: string; readonly held: unknown }

async function noticesOf(person: string): Promise<unknown> {
  const rows = await askingFor({
    pageTypeSlug: PERSON,
    where: { slug: { is: person } },
    keys: [SEAT_NOTICES],
    limit: 1,
  })
  return "refused" in rows ? undefined : rows.rows[0]?.[SEAT_NOTICES]
}

async function answersTo(person: string, seat: string): Promise<true | Refused> {
  const held = await whereReadBy({ person }, SEAT, { id: { is: seat } })
  if ("refused" in held) return { refused: held.refused, status: 403 }
  const seats = await askingFor({
    pageTypeSlug: SEAT,
    where: held.where,
    keys: ["persons"],
    limit: 1,
  })
  if ("refused" in seats) return { refused: seats.refused, status: 503 }
  const persons = seats.rows[0]?.persons
  const named = Array.isArray(persons) ? persons.map((one) => slugOf(String(one))) : []
  if (named.includes(person)) return true
  return { refused: `no seat answering to \`${person}\` has the id \`${seat}\``, status: 404 }
}

async function chooserOf(request: Request, seat: string | null): Promise<Chooser | Response> {
  const signedIn = await signedInAs(request)
  if (signedIn === null) return refused("Not authenticated.", 401)
  if (seat === null || seat === "") return refused("A notice names the seat it is for.", 400)
  const person = await senderOf(signedIn.contributor)
  if (typeof person !== "string") return refused(person.refused, 403)
  const answers = await answersTo(person, seat)
  if (answers !== true) return refused(answers.refused, answers.status)
  return { person, seat, held: await noticesOf(person) }
}

export async function loader({ request }: { request: Request }): Promise<Response> {
  const chooser = await chooserOf(request, new URL(request.url).searchParams.get(SEAT))
  if (chooser instanceof Response) return chooser
  return Response.json({ ok: true, notice: noticeFor(chooser.held, chooser.seat) })
}

async function chosen(chooser: Chooser, notice: Notice): Promise<Response> {
  const wrote = await writingFor({
    writer: WRITER,
    message: `${chooser.person} chooses to be told of the seat ${chooser.seat}'s replies by ${notice}`,
    pages: [
      {
        pageTypeSlug: PERSON,
        slug: chooser.person,
        values: { [SEAT_NOTICES]: noticesWith(chooser.held, chooser.seat, notice) },
        merge: true,
      },
    ],
  })
  if ("refused" in wrote) return refused(wrote.refused, 503)
  return Response.json({ ok: true, notice })
}

export async function action({ request }: { request: Request }): Promise<Response> {
  if (request.method !== "POST") return refused("method-not-allowed", 405)
  let held: unknown
  try {
    held = await request.json()
  } catch {
    return refused("Invalid request body.", 400)
  }
  const asked = typeof held === "object" && held !== null ? (held as Record<string, unknown>) : {}
  if (!isNotice(asked.notice)) return refused("A notice is phone, desktop, both or none.", 400)
  const chooser = await chooserOf(request, typeof asked.seat === "string" ? asked.seat : null)
  if (chooser instanceof Response) return chooser
  return chosen(chooser, asked.notice)
}
