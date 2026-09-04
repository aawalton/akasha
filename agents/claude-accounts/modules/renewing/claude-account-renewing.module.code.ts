import type { PageOf } from "@akasha/indexes/answering"
import type { Reading } from "@akasha/indexes/shape"
import { secretsIn } from "@akasha/pages-system/page-secret"
import { credentialOf } from "../../../models/gateway/modules/oauth-effects/oauth-effects.module.code.ts"
import {
  DOORS as PUSH_DOORS,
  type Doors as PushDoors,
  pushedIn,
} from "../credential-push/claude-account-credential-push.module.code.ts"
import {
  classifyOAuthError,
  OAUTH_CLIENT_ID,
  OAUTH_TOKEN_RESPONSE_SCHEMA,
  OAUTH_TOKEN_URL,
  REFRESH_BUFFER_MS,
  type RefreshOutcome,
} from "../oauth/claude-account-oauth.module.code.ts"
import { credentialIn, type SecretsRead } from "../reading/claude-account-reading.module.code.ts"

const DEFAULT_LOG_PREFIX = "[oauth]"

const MS_A_SECOND = 1000

const FORM_ENCODED = "application/x-www-form-urlencoded"

const REFRESH_GRANT = "refresh_token"

const TERMINAL_NOTE = " [TERMINAL — human re-auth required]"

const MALFORMED = "malformed_response"

const ONLY_COPY =
  "refreshed but its credential did not reach its page, so the pair returned here is the only " +
  "copy and the next refresh will find the spent one"

export type Doors = {
  readonly secretsRead: SecretsRead
  readonly push: PushDoors
  readonly now: () => number
  readonly warned: (line: string) => undefined
}

export const DOORS: Doors = {
  secretsRead: secretsIn,
  push: PUSH_DOORS,
  now: () => Date.now(),
  warned: (line) => {
    console.error(line)
  },
}

function sayOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

export async function renewedIn(args: {
  readonly root: string
  readonly slug: string
  readonly doors: Doors
  readonly reading: Reading
  readonly pageOf: PageOf
  readonly logPrefix?: string
  readonly marginMs?: number
}): Promise<RefreshOutcome> {
  const { root, slug, doors, reading, pageOf } = args
  const logPrefix = args.logPrefix ?? DEFAULT_LOG_PREFIX
  const marginMs = args.marginMs ?? REFRESH_BUFFER_MS
  try {
    const read = credentialIn(root, slug, doors.secretsRead)
    if (read.kind === "absent") return { ok: false, terminal: false, reason: "no-credential" }
    const standing = read.credential

    // A credential with life left past the margin is answered as it stands, so the endpoint is
    // reached only where the pair the page holds is about to be spent.
    if (standing.accessTokenExpiresAtMs >= doors.now() + marginMs) {
      return { ok: true, credential: credentialOf(standing) }
    }

    const res = await fetch(OAUTH_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": FORM_ENCODED },
      body: new URLSearchParams({
        grant_type: REFRESH_GRANT,
        client_id: OAUTH_CLIENT_ID,
        refresh_token: standing.refreshToken,
      }),
    })
    if (!res.ok) {
      const text = await res.text()
      const classified = classifyOAuthError(res.status, text)
      doors.warned(
        `${logPrefix} OAuth refresh failed for ${slug}: ${res.status} ${text}` +
          (classified.terminal ? TERMINAL_NOTE : "")
      )
      return {
        ok: false,
        terminal: classified.terminal,
        reason: "http-error",
        status: res.status,
        code: classified.code,
        description: classified.description,
      }
    }

    const raw: unknown = await res.json()
    const parsed = OAUTH_TOKEN_RESPONSE_SCHEMA.safeParse(raw)
    if (!parsed.success) {
      doors.warned(
        `${logPrefix} OAuth refresh response failed schema validation for ${slug}: ${parsed.error.message}`
      )
      return {
        ok: false,
        terminal: false,
        reason: "http-error",
        status: res.status,
        code: MALFORMED,
        description: parsed.error.message,
      }
    }
    const said = parsed.data
    const expiresAtMs = doors.now() + said.expires_in * MS_A_SECOND

    const push = pushedIn(
      root,
      {
        slug,
        accessToken: said.access_token,
        refreshToken: said.refresh_token,
        accessTokenExpiresAtMs: expiresAtMs,
      },
      doors.push,
      reading,
      pageOf
    )
    // A push that landed the pair, that found the pair already there, or that found a fresher pair
    // already there all leave the page holding a credential, so the page is read again for it.
    let held = true
    if (push.kind === "absent" || push.kind === "refused") {
      held = false
      doors.warned(`${logPrefix} ${slug} ${ONLY_COPY}: ${push.why}`)
    }

    if (held) {
      const back = credentialIn(root, slug, doors.secretsRead)
      if (back.kind === "read") return { ok: true, credential: credentialOf(back.credential) }
    }

    // What the endpoint said, wearing the scopes, the plan and the band the page states, because
    // the token response names none of those three.
    return {
      ok: true,
      credential: {
        ...credentialOf(standing),
        accessToken: said.access_token,
        refreshToken: said.refresh_token,
        expiresAt: expiresAtMs,
      },
    }
  } catch (thrown) {
    doors.warned(`${logPrefix} OAuth refresh error for ${slug}: ${sayOf(thrown)}`)
    return { ok: false, terminal: false, reason: "exception", error: thrown }
  }
}
