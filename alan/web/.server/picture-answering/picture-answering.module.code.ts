import { messageNamed } from "akasha/agents/messaging/modules/message-naming/message-naming.module.code.ts"
import {
  type DeviceSecretContext,
  resolveDeviceSecretContext,
} from "akasha/alan/web/.server/device-secret-context/device-secret-context.module.code.ts"
import {
  capacitorCorsHeaders,
  withCors,
} from "akasha/alan/web/modules/capacitor-cors/capacitor-cors.module.code.ts"
import { pictureObjectKey } from "akasha/infrastructure/storage/object-store/modules/key/object-store-key.module.code.ts"
import { seaweedFSObjectStoreFromEnv } from "akasha/infrastructure/storage/object-store/modules/seaweedfs-store/seaweedfs-store.module.code.ts"
import {
  askingFor,
  type Fetcher,
  type Sleeper,
  writingFor,
} from "akasha/pages/service/modules/page-calling/page-calling.module.code.ts"
import {
  type Enrolment,
  personSlugForAccount,
} from "akasha/persons/modules/enrolment/person-enrolment.module.code.ts"
import { saidBy } from "akasha/utils/narrow/modules/said-by/said-by.module.code.ts"

const CORS_METHODS = "POST, OPTIONS"

const CORS_ALLOW_HEADERS = "Authorization, Content-Type, X-Device-Secret"

const CONTENT_TYPE = "Content-Type"

const JPEG = "image/jpeg"

const BYTES_HELD = 12 * 1024 * 1024

const MESSAGE_PAGE_TYPE_SLUG = "message"

const SEAT_PAGE_TYPE_SLUG = "seat"

const SLUG = "slug"

const WRITER = "alanwalton web <web@alanwalton.com>"

const SAID_FROM = "alanwalton-app"

const ANNOUNCE = "announce"

export type Admitting = (request: Request) => Promise<DeviceSecretContext>

export type Enrolling = (userId: string) => Promise<Enrolment>

export type Keeping = (id: string, bytes: Uint8Array<ArrayBuffer>) => Promise<void>

export type Delivering = (to: string, body: string) => Promise<string | null>

export type PictureEffects = {
  readonly admit: Admitting
  readonly enrol: Enrolling
  readonly keep: Keeping | null
  readonly deliver: Delivering
  readonly now: () => Date
  readonly mint: () => string
}

function corsFor(request: Request): Record<string, string> {
  return capacitorCorsHeaders(request, CORS_METHODS, { allowHeaders: CORS_ALLOW_HEADERS })
}

function mediaTypeOf(request: Request): string {
  const said = request.headers.get(CONTENT_TYPE) ?? ""
  return (said.split(";")[0] ?? "").trim().toLowerCase()
}

export function pictureBody(to: string, id: string, at: string): string {
  return (
    `A picture from the phone of ${to} arrived at ${at}.\n` +
    `Run \`akasha alan picture ${id}\` to bring the picture to this machine, ` +
    "then read the file that command names."
  )
}

export async function deliverToSeat(
  to: string,
  body: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<string | null> {
  const seats = await askingFor({ pageTypeSlug: SEAT_PAGE_TYPE_SLUG, keys: [SLUG] }, fetcher, naps)
  if ("refused" in seats) return seats.refused
  if (!seats.rows.some((row) => row[SLUG] === to)) return `no seat holds the name \`${to}\``
  const id = crypto.randomUUID()
  const named = messageNamed(id)
  const wrote = await writingFor(
    {
      writer: WRITER,
      message: `a picture reaches the ${to} seat`,
      pages: [
        {
          pageTypeSlug: MESSAGE_PAGE_TYPE_SLUG,
          slug: named,
          values: {
            id,
            pageTypeSlug: MESSAGE_PAGE_TYPE_SLUG,
            slug: named,
            to,
            from: SAID_FROM,
            warrant: ANNOUNCE,
            body,
          },
        },
      ],
    },
    fetcher,
    naps
  )
  return "refused" in wrote ? wrote.refused : null
}

function defaultEffects(): PictureEffects {
  const store = seaweedFSObjectStoreFromEnv()
  return {
    admit: (request) => resolveDeviceSecretContext(request),
    enrol: (userId) => personSlugForAccount(userId),
    keep: store === null ? null : (id, bytes) => store.put(pictureObjectKey(id), bytes),
    deliver: (to, body) => deliverToSeat(to, body),
    now: () => new Date(),
    mint: () => crypto.randomUUID(),
  }
}

export function answerPictureAsked(request: Request): Response {
  const cors = corsFor(request)
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors })
  return Response.json(
    { ok: false, error: "A picture is carried in." },
    { status: 405, headers: cors }
  )
}

export async function answerPicture(
  request: Request,
  effects: PictureEffects = defaultEffects()
): Promise<Response> {
  const cors = corsFor(request)
  const answer = (body: unknown, status: number): Response =>
    Response.json(body, { status, headers: withCors(new Headers(), cors) })

  const ctx = await effects.admit(request)
  if (ctx.outcome === "unread") {
    return answer({ ok: false, error: "Device secrets went unread.", retryable: true }, 503)
  }
  if (ctx.outcome === "refused") return answer({ ok: false, error: "Not authenticated." }, 401)

  if (mediaTypeOf(request) !== JPEG) {
    return answer({ ok: false, error: `A picture is sent as ${JPEG}.` }, 415)
  }
  if (effects.keep === null) {
    return answer({ ok: false, error: "No object store is configured.", retryable: true }, 503)
  }
  const bytes = new Uint8Array(await request.arrayBuffer())
  if (bytes.byteLength === 0)
    return answer({ ok: false, error: "The picture holds no bytes." }, 400)
  if (bytes.byteLength > BYTES_HELD) {
    return answer({ ok: false, error: `A picture holds at most ${BYTES_HELD} bytes.` }, 413)
  }

  const enrolled = await effects.enrol(ctx.userId)
  if (!enrolled.ok) {
    return answer(
      { ok: false, error: enrolled.why, retryable: enrolled.unread },
      enrolled.unread ? 503 : 403
    )
  }
  const to = enrolled.personSlug
  const id = effects.mint()
  try {
    await effects.keep(id, bytes)
  } catch (thrown) {
    return answer(
      { ok: false, error: `The picture was not kept: ${saidBy(thrown)}`, retryable: true },
      503
    )
  }
  const refused = await effects.deliver(to, pictureBody(to, id, effects.now().toISOString()))
  if (refused !== null) return answer({ ok: false, error: refused, id, retryable: true }, 503)
  return answer({ ok: true, id, to }, 200)
}
