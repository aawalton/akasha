import {
  type Sending,
  type Warrant,
  type Written,
  writeMessage,
} from "akasha/agent/message/modules/sending/agent-message-sending.module.code.ts"
import {
  type SignedIn,
  signedInAs,
} from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import {
  capacitorCorsHeaders,
  withCors,
} from "akasha/alan/web/modules/capacitor-cors/capacitor-cors.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  askingFor,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  asContributor,
  type Enrolment,
  personSlugFor,
} from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import {
  ACTION_BAR_SENDER,
  type ActionBarMessageKind,
  classifyActionBarMessage,
} from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"

const CORS_METHODS = "GET, POST, OPTIONS"

const GAME_PAGE_TYPE_SLUG = "game"

const SEAT_PAGE_TYPE_SLUG = "seat"

const MESSAGE_PAGE_TYPE_SLUG = "agent-message"

const EXTERNAL_ID = "externalId"

const COORDINATOR_AGENT = "coordinatorAgent"

const SLUG = "slug"

const PERSON = "person"

const TO = "to"

const FROM = "from"

const BODY = "body"

const CLAIMED_AT = "claimedAt"

const GAME_PARAM = "game"

const ANNOUNCE: Warrant = "announce"

const NEWLINE = "\n"

const NOT_SIGNED_IN = "Not authenticated."

const NO_ACTION = "Please enter an action."

const NO_GAME_NAMED = "No game."

const NO_SUCH_GAME = "Game not found."

const NO_GAME_MASTER = "No game master is listening for this game right now."

const NOT_THE_PLAYER = "Only the person this game is played for sends actions to it."

const NOT_LISTENING = "The game is not listening right now. Try again."

type Row = Readonly<Record<string, unknown>>

type PendingAction = {
  readonly id: string
  readonly text: string
  readonly kind: ActionBarMessageKind
}

type GameSeat =
  | { readonly kind: "seated"; readonly seat: string; readonly person: string | null }
  | { readonly kind: "no-game" }
  | { readonly kind: "no-seat" }
  | { readonly kind: "unread"; readonly why: string }

export type Stated = {
  readonly to: string
  readonly from: string
  readonly warrant: Warrant
  readonly body: string
}

export type ActionBarEffects = {
  readonly signedIn: (request: Request) => Promise<SignedIn | null>
  readonly enrol: (contributor: string) => Promise<Enrolment>
  readonly seatOf: (gameExternalId: string) => Promise<GameSeat>
  readonly write: (stated: Stated) => Promise<Written>
  readonly pendingRows: () => Promise<readonly Row[] | { readonly refused: string }>
}

export function pendingFor(rows: readonly Row[], seat: string): readonly PendingAction[] {
  const held: PendingAction[] = []
  for (const row of rows) {
    const id = textIn(row[SLUG])
    const to = textIn(row[TO])
    const body = textIn(row[BODY])
    if (id === null || to === null || body === null) continue
    if (row[FROM] !== ACTION_BAR_SENDER || slugOf(to) !== seat) continue
    if (textIn(row[CLAIMED_AT]) !== null) continue
    const text = body.endsWith(NEWLINE) ? body.slice(0, -NEWLINE.length) : body
    held.push({ id, text, kind: classifyActionBarMessage(text) })
  }
  return held.sort((one, two) => (one.id < two.id ? -1 : one.id > two.id ? 1 : 0))
}

async function seatOfGame(gameExternalId: string): Promise<GameSeat> {
  const games = await askingFor({
    pageTypeSlug: GAME_PAGE_TYPE_SLUG,
    where: { [EXTERNAL_ID]: { is: gameExternalId } },
    keys: [EXTERNAL_ID, COORDINATOR_AGENT],
  })
  if ("refused" in games) return { kind: "unread", why: games.refused }
  const game = games.rows[0]
  if (game === undefined) return { kind: "no-game" }
  const seat = textIn(game[COORDINATOR_AGENT])
  if (seat === null) return { kind: "no-seat" }
  const seats = await askingFor({
    pageTypeSlug: SEAT_PAGE_TYPE_SLUG,
    where: { [SLUG]: { is: seat } },
    keys: [SLUG, PERSON],
  })
  if ("refused" in seats) return { kind: "unread", why: seats.refused }
  const held = seats.rows[0]
  if (held === undefined) return { kind: "no-seat" }
  const person = textIn(held[PERSON])
  return { kind: "seated", seat, person: person === null ? null : slugOf(person) }
}

async function pendingRowsAsked(): Promise<readonly Row[] | { readonly refused: string }> {
  const asked = await askingFor({
    pageTypeSlug: MESSAGE_PAGE_TYPE_SLUG,
    where: { [FROM]: { is: ACTION_BAR_SENDER } },
    keys: [SLUG, TO, FROM, BODY, CLAIMED_AT],
  })
  return "refused" in asked ? asked : asked.rows
}

const throughTheForwarder: Sending = (asked) => writingFor(asked)

function defaultEffects(): ActionBarEffects {
  return {
    signedIn: (request) => signedInAs(request),
    enrol: (contributor) => personSlugFor(asContributor(contributor)),
    seatOf: (gameExternalId) => seatOfGame(gameExternalId),
    write: (stated) => writeMessage(stated, throughTheForwarder),
    pendingRows: () => pendingRowsAsked(),
  }
}

type Answer = (body: unknown, status: number) => Response

function answerFor(request: Request): Answer {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  return (body, status) => Response.json(body, { status, headers: withCors(new Headers(), cors) })
}

type Gate =
  | { readonly ok: true; readonly seat: string }
  | { readonly ok: false; readonly answered: Response }

async function gateFor(
  effects: ActionBarEffects,
  request: Request,
  gameExternalId: string,
  answer: Answer
): Promise<Gate> {
  const refuse = (error: string, status: number): Gate => ({
    ok: false,
    answered: answer({ ok: false, error }, status),
  })
  const signed = await effects.signedIn(request)
  if (signed === null) return refuse(NOT_SIGNED_IN, 401)
  const seated = await effects.seatOf(gameExternalId)
  if (seated.kind === "unread") return refuse(NOT_LISTENING, 503)
  if (seated.kind === "no-game") return refuse(NO_SUCH_GAME, 404)
  if (seated.kind === "no-seat") return refuse(NO_GAME_MASTER, 409)
  const enrolled = await effects.enrol(signed.contributor)
  if (!enrolled.ok)
    return refuse(enrolled.unread ? NOT_LISTENING : NOT_THE_PLAYER, enrolled.unread ? 503 : 403)
  if (seated.person !== enrolled.personSlug) return refuse(NOT_THE_PLAYER, 403)
  return { ok: true, seat: seated.seat }
}

function actionIn(body: unknown): { readonly game: string; readonly text: string } | null {
  if (typeof body !== "object" || body === null) return null
  const said = body as { readonly gameExternalId?: unknown; readonly text?: unknown }
  const game = textIn(said.gameExternalId)
  const text = textIn(said.text)
  if (game === null || text === null || text.trim() === "") return null
  return { game, text }
}

export async function answerActionBar(
  request: Request,
  effects: ActionBarEffects = defaultEffects()
): Promise<Response> {
  const answer = answerFor(request)
  const asked = actionIn(await request.json().catch(() => null))
  if (asked === null) return answer({ ok: false, error: NO_ACTION }, 400)
  const gate = await gateFor(effects, request, asked.game, answer)
  if (!gate.ok) return gate.answered
  let written: Written
  try {
    written = await effects.write({
      to: gate.seat,
      from: ACTION_BAR_SENDER,
      warrant: ANNOUNCE,
      body: asked.text,
    })
  } catch (thrown) {
    written = { kind: "refused", detail: saidBy(thrown) }
  }
  if (written.kind === "refused") {
    console.error(`an action for ${gate.seat} was not written: ${written.detail}`)
    return answer({ ok: false, error: NOT_LISTENING }, 503)
  }
  return answer({ ok: true, id: written.id }, 200)
}

export async function answerPendingActions(
  request: Request,
  effects: ActionBarEffects = defaultEffects()
): Promise<Response> {
  const answer = answerFor(request)
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: capacitorCorsHeaders(request, CORS_METHODS),
    })
  }
  const game = textIn(new URL(request.url).searchParams.get(GAME_PARAM))
  if (game === null) return answer({ ok: false, error: NO_GAME_NAMED }, 400)
  const gate = await gateFor(effects, request, game, answer)
  if (!gate.ok) return gate.answered
  const rows = await effects.pendingRows()
  if ("refused" in rows) return answer({ ok: false, error: NOT_LISTENING }, 503)
  return answer({ ok: true, pending: pendingFor(rows, gate.seat) }, 200)
}
