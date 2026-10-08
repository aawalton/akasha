import { voiceSetupFor } from "akasha/agent/seat/voice/modules/setup/seat-voice-setup.module.code.ts"
import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { capitalize } from "akasha/text/writing/modules/capitalize/capitalize.module.code.ts"
import { z } from "zod"

const MINTED_AT = "https://generativelanguage.googleapis.com/v1beta/auth_tokens"

const KEY = "GEMINI_API_KEY"

const TOKEN_LASTS_MS = 30 * 60_000

const SESSION_OPENS_WITHIN_MS = 60_000

const ASKED = z.object({ seat: z.string().min(1) })

const MINTED = z.object({ name: z.string().min(1) })

const UNKEPT = { "cache-control": "no-store" }

function refused(error: string, status: number): Response {
  return Response.json({ ok: false, error }, { status, headers: UNKEPT })
}

type Speaker = { readonly persona: string; readonly voice: string | null }

async function voiceOf(persona: string): Promise<string | null | { readonly refused: string }> {
  const personas = await askingFor({
    pageTypeSlug: "persona",
    where: { slug: { is: persona } },
    keys: ["liveVoice"],
    limit: 1,
  })
  if ("refused" in personas) return { refused: personas.refused }
  return textIn(personas.rows[0]?.liveVoice)
}

async function speakerOf(id: string): Promise<Speaker | { readonly refused: string }> {
  const seats = await askingFor({
    pageTypeSlug: "seat",
    where: { id: { is: id } },
    keys: ["slug", "persona"],
    limit: 1,
  })
  if ("refused" in seats) return { refused: seats.refused }
  const row = seats.rows[0]
  if (row === undefined) return { refused: `no seat has the id \`${id}\`` }
  const named = textIn(row.persona)
  if (named === null) return { persona: capitalize(textIn(row.slug) ?? "the seat"), voice: null }
  const voice = await voiceOf(slugOf(named))
  if (voice !== null && typeof voice !== "string") return voice
  return { persona: capitalize(slugOf(named)), voice }
}

export async function action({ request }: { request: Request }): Promise<Response> {
  if (request.method !== "POST") return refused("method-not-allowed", 405)
  if ((await signedInAs(request)) === null) return refused("Not authenticated.", 401)
  let held: unknown
  try {
    held = await request.json()
  } catch {
    return refused("Invalid request body.", 400)
  }
  const asked = ASKED.safeParse(held)
  if (!asked.success) return refused("A voice token is asked for a seat by its id.", 400)
  const key = optionalEnv(KEY)
  if (key === undefined) return refused(`nothing holds \`${KEY}\` here`, 503)
  const speaker = await speakerOf(asked.data.seat)
  if ("refused" in speaker) return refused(speaker.refused, 404)
  const { persona, voice } = speaker
  const now = Date.now()
  let answered: Response
  try {
    answered = await fetch(MINTED_AT, {
      method: "POST",
      headers: { "x-goog-api-key": key, "content-type": "application/json" },
      body: JSON.stringify({
        uses: 1,
        expireTime: new Date(now + TOKEN_LASTS_MS).toISOString(),
        newSessionExpireTime: new Date(now + SESSION_OPENS_WITHIN_MS).toISOString(),
        bidiGenerateContentSetup: voiceSetupFor(persona, voice),
      }),
    })
  } catch (cause) {
    return refused(`Google gave no voice token (${String(cause)})`, 502)
  }
  const minted = MINTED.safeParse(await answered.json().catch(() => null))
  if (!answered.ok || !minted.success) {
    return refused(`Google refused a voice token (${answered.status})`, 502)
  }
  return Response.json({ ok: true, token: minted.data.name, persona }, { headers: UNKEPT })
}
