import { mkdirSync, readFileSync, type Stats, unwatchFile, watchFile, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { PageOf } from "@akasha/indexes/answering"
import type { Reading } from "@akasha/indexes/shape"
import { secretsIn } from "@akasha/pages-system/page-secret"
import { z } from "zod"
import { credentialOf } from "../../../models/gateway/modules/oauth-effects/oauth-effects.module.code.ts"
import type { OAuthCredential } from "../../../models/gateway/modules/oauth-types/oauth-types.module.code.ts"
import {
  DOORS as PUSH_DOORS,
  type Doors as PushDoors,
  pushedIn,
} from "../credential-push/claude-account-credential-push.module.code.ts"
import {
  type CredentialIdentity,
  decideIdentityPush,
  type IdentityPush,
  identityProbed,
  pinnedIn,
  sayFailedPin,
} from "../identity/claude-account-identity.module.code.ts"
import { REFRESH_BUFFER_MS } from "../oauth/claude-account-oauth.module.code.ts"
import {
  accountUuidsIn,
  credentialIn,
  type SecretsRead,
} from "../reading/claude-account-reading.module.code.ts"

/** The name a signed-in agent reads its credential from, inside the directory it is given. */
export const CREDENTIAL_FILE_NAME = ".credentials.json"

/** The file is readable by its owner and by nobody else. */
const CREDENTIAL_FILE_MODE = 0o600

/** How often the watch asks the file system whether the file moved. */
const WATCH_POLL_MS = 3_000

/** How long a run of writes settles before one push is made of it. */
const PUSH_DEBOUNCE_MS = 2_000

/** The mtime standing for "this watch has pushed nothing yet". */
const NO_MTIME_PUSHED = 0

/** The expiry a file that says nothing is read as. */
const NO_EXPIRY = 0

/** The prefix a caller that names none gets on its lines. */
const DEFAULT_LOG_PREFIX = "[oauth]"

export const CREDENTIAL_FILE_SHAPE = z.looseObject({
  claudeAiOauth: z
    .looseObject({
      accessToken: z.string().min(1),
      refreshToken: z.string().min(1),
      expiresAt: z.number(),
      scopes: z.array(z.string()).optional(),
      subscriptionType: z.string().nullable().optional(),
      rateLimitTier: z.string().nullable().optional(),
    })
    .optional(),
})

export type FileCredential = {
  readonly accessToken: string
  readonly scopes: readonly string[]
  readonly expiresAt: number
}

function sayOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

function credentialPathIn(dir: string): string {
  return join(dir, CREDENTIAL_FILE_NAME)
}

/** The file's text, or null where nothing readable stands at the path. */
function rawFileIn(dir: string): string | null {
  try {
    return readFileSync(credentialPathIn(dir), "utf-8")
  } catch {
    return null
  }
}

/** The expiry the file names, or `NO_EXPIRY` where it is unreadable, malformed or silent. */
function expiryIn(dir: string): number {
  const raw = rawFileIn(dir)
  if (raw === null) return NO_EXPIRY
  try {
    return CREDENTIAL_FILE_SHAPE.parse(JSON.parse(raw)).claudeAiOauth?.expiresAt ?? NO_EXPIRY
  } catch {
    return NO_EXPIRY
  }
}

export function credentialFileIn(dir: string): FileCredential | null {
  const raw = rawFileIn(dir)
  if (raw === null) return null
  try {
    const oauth = CREDENTIAL_FILE_SHAPE.parse(JSON.parse(raw)).claudeAiOauth
    if (oauth == null || oauth.accessToken === "") return null
    return {
      accessToken: oauth.accessToken,
      scopes: oauth.scopes ?? [],
      expiresAt: oauth.expiresAt,
    }
  } catch {
    return null
  }
}

export function credentialFileWritten(dir: string, credential: OAuthCredential): undefined {
  if (credential.accessToken === "" || credential.refreshToken === "") return
  mkdirSync(dir, { recursive: true })
  const path = credentialPathIn(dir)
  let existing: Record<string, unknown>
  try {
    existing = CREDENTIAL_FILE_SHAPE.parse(JSON.parse(readFileSync(path, "utf-8")))
  } catch {
    existing = {}
  }
  writeFileSync(
    path,
    JSON.stringify({
      ...existing,
      claudeAiOauth: {
        accessToken: credential.accessToken,
        refreshToken: credential.refreshToken,
        expiresAt: credential.expiresAt,
        scopes: credential.scopes,
        subscriptionType: credential.subscriptionType,
        rateLimitTier: credential.rateLimitTier,
      },
    }),
    { mode: CREDENTIAL_FILE_MODE }
  )
}

export type Doors = {
  readonly secretsRead: SecretsRead
  readonly push: PushDoors
  readonly identityProbed: (accessToken: string) => Promise<CredentialIdentity>
  readonly now: () => number
  readonly said: (line: string) => undefined
  readonly warned: (line: string) => undefined
}

export const DOORS: Doors = {
  secretsRead: secretsIn,
  push: PUSH_DOORS,
  identityProbed,
  now: () => Date.now(),
  said: (line) => {
    console.log(line)
  },
  warned: (line) => {
    console.error(line)
  },
}

export type FileRefresh = {
  readonly refreshed: boolean
  readonly terminal: boolean
}

export function fileRefreshedFrom(args: {
  readonly root: string
  readonly slug: string
  readonly dir: string
  readonly doors: Doors
  readonly logPrefix?: string
}): FileRefresh {
  const { root, slug, dir, doors } = args
  const logPrefix = args.logPrefix ?? DEFAULT_LOG_PREFIX
  try {
    const fileExpiresAt = expiryIn(dir)

    const held = credentialIn(root, slug, doors.secretsRead)
    if (held.kind === "absent") {
      doors.said(`${logPrefix} Credential refresh skip for ${slug}: ${held.why}`)
      return { refreshed: false, terminal: false }
    }
    const one = held.credential

    if (one.accessTokenExpiresAtMs <= fileExpiresAt) {
      doors.said(`${logPrefix} Credential refresh skip for ${slug} (file already current)`)
      return { refreshed: false, terminal: false }
    }

    const now = doors.now()
    if (one.accessTokenExpiresAtMs <= now) {
      doors.warned(
        `${logPrefix} ${slug} expired at ${new Date(one.accessTokenExpiresAtMs).toISOString()} and nothing ` +
          `here renews one — claude account upkeep has not reached it, so the file is left as it stands`
      )
      return { refreshed: false, terminal: false }
    }
    if (one.accessTokenExpiresAtMs < now + REFRESH_BUFFER_MS) {
      doors.warned(
        `${logPrefix} ${slug} expires at ${new Date(one.accessTokenExpiresAtMs).toISOString()}, inside the ` +
          `reader's buffer — upkeep is behind, and the file takes what its page holds`
      )
    }

    credentialFileWritten(dir, credentialOf(one))
    doors.said(
      `${logPrefix} Credential refresh for ${slug}: pushed updated tokens from its page to the file`
    )
    return { refreshed: true, terminal: false }
  } catch (thrown) {
    doors.warned(`${logPrefix} Credential refresh error for ${slug}: ${sayOf(thrown)}`)
    throw thrown
  }
}

function unhandledDecision(decision: never): never {
  throw new Error(`filePushedTo: unhandled identity decision ${JSON.stringify(decision)}`)
}

export async function filePushedTo(args: {
  readonly root: string
  readonly slug: string
  readonly dir: string
  readonly doors: Doors
  readonly reading: Reading
  readonly pageOf: PageOf
  readonly allowRebind?: boolean
  readonly logPrefix?: string
}): Promise<void> {
  const { root, slug, dir, doors, reading, pageOf } = args
  const logPrefix = args.logPrefix ?? DEFAULT_LOG_PREFIX

  const raw = rawFileIn(dir)
  if (raw === null) {
    doors.said(`${logPrefix} No credentials file at ${credentialPathIn(dir)}, skipping push`)
    return
  }

  const oauth = CREDENTIAL_FILE_SHAPE.parse(JSON.parse(raw)).claudeAiOauth
  if (!oauth) {
    doors.said(`${logPrefix} No claudeAiOauth in credentials file, skipping push`)
    return
  }

  const decision: IdentityPush = decideIdentityPush({
    slug,
    identity: await doors.identityProbed(oauth.accessToken),
    pinnedUuidBySlug: accountUuidsIn(root),
    allowRebind: args.allowRebind === true,
  })

  switch (decision.kind) {
    case "refuse": {
      const message = `${logPrefix} REFUSING credential push for ${slug}: ${decision.reason}`
      doors.warned(message)
      throw new Error(message)
    }
    case "match": {
      const pushed = pushedIn(
        root,
        {
          slug,
          accessToken: oauth.accessToken,
          refreshToken: oauth.refreshToken,
          accessTokenExpiresAtMs: oauth.expiresAt,
        },
        doors.push,
        reading,
        pageOf
      )
      if (pushed.kind === "refused" || pushed.kind === "absent") {
        const message = `${logPrefix} REFUSING credential push for ${slug}: ${pushed.why}`
        doors.warned(message)
        throw new Error(message)
      }
      break
    }
    case "pin":
    case "rebind": {
      const previousUuid = decision.kind === "rebind" ? decision.previousUuid : null
      const pinned = pinnedIn(
        root,
        {
          slug,
          accountUuid: decision.accountUuid,
          accessToken: oauth.accessToken,
          refreshToken: oauth.refreshToken,
          accessTokenExpiresAtMs: oauth.expiresAt,
          previousUuid,
        },
        { push: doors.push },
        reading,
        pageOf
      )
      if (pinned.kind === "refused") {
        const said = sayFailedPin({ slug, previousUuid, at: pinned.at, why: pinned.why })
        const message = `${logPrefix} ${said}`
        doors.warned(message)
        throw new Error(message)
      }
      break
    }
    default:
      return unhandledDecision(decision)
  }
  doors.said(`${logPrefix} Pushed token update for ${slug} (identity: ${decision.kind})`)
}

export type FileChange = {
  readonly pushed: boolean
  readonly observedExpiresAt: number | null
  readonly reauthDetected: boolean
}

export async function fileChanged(args: {
  readonly dir: string
  readonly slug: string
  readonly prevObservedExpiresAt: number | null
  readonly shouldSkip: (slug: string) => boolean
  readonly push: (slug: string, dir: string) => Promise<void>
  readonly onReauthDetected?: (slug: string) => undefined
  readonly said: (line: string) => undefined
}): Promise<FileChange> {
  const { dir, slug, prevObservedExpiresAt, shouldSkip, push, onReauthDetected, said } = args
  const unmoved: FileChange = {
    pushed: false,
    observedExpiresAt: prevObservedExpiresAt,
    reauthDetected: false,
  }

  const raw = rawFileIn(dir)
  if (raw === null) {
    said(`Credential file unreadable or malformed at ${credentialPathIn(dir)}`)
    return unmoved
  }
  let candidate: number | undefined
  try {
    candidate = CREDENTIAL_FILE_SHAPE.parse(JSON.parse(raw)).claudeAiOauth?.expiresAt
  } catch {
    said(`Credential file unreadable or malformed at ${credentialPathIn(dir)}`)
    return unmoved
  }
  if (typeof candidate !== "number") return unmoved
  const fileExpiresAt = candidate

  const reauthDetected = prevObservedExpiresAt !== null && fileExpiresAt > prevObservedExpiresAt

  if (shouldSkip(slug)) {
    if (reauthDetected) {
      onReauthDetected?.(slug)
      await push(slug, dir)
      return { pushed: true, observedExpiresAt: fileExpiresAt, reauthDetected: true }
    }
    return { pushed: false, observedExpiresAt: fileExpiresAt, reauthDetected: false }
  }

  await push(slug, dir)
  return { pushed: true, observedExpiresAt: fileExpiresAt, reauthDetected }
}

export function fileWatched(args: {
  readonly root: string
  readonly dir: string
  readonly slugOf: () => string
  readonly doors: Doors
  readonly reading: Reading
  readonly pageOf: PageOf
  readonly logPrefix?: string
  readonly shouldSkip?: (slug: string) => boolean
  readonly onReauthDetected?: (slug: string) => undefined
  readonly onPushResult?: (result: { ok: true } | { ok: false; error: unknown }) => undefined
}): () => undefined {
  const { root, dir, slugOf, doors, reading, pageOf } = args
  const logPrefix = args.logPrefix ?? DEFAULT_LOG_PREFIX
  const path = credentialPathIn(dir)
  let debounceTimer: ReturnType<typeof setTimeout> | null = null
  let lastPushedMtime = NO_MTIME_PUSHED
  let lastObservedExpiresAt: number | null = null

  const onChange = (curr: Stats, prev: Stats): undefined => {
    if (curr.mtimeMs === prev.mtimeMs || curr.size === 0) return
    if (curr.mtimeMs === lastPushedMtime) return

    if (debounceTimer !== null) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      debounceTimer = null
      const slug = slugOf()
      if (slug === "") return

      const pushing = async (one: string, where: string): Promise<void> => {
        lastPushedMtime = curr.mtimeMs
        try {
          await filePushedTo({ root, slug: one, dir: where, doors, reading, pageOf, logPrefix })
          args.onPushResult?.({ ok: true })
        } catch (thrown) {
          doors.warned(`${logPrefix} Credential watch push failed: ${sayOf(thrown)}`)
          args.onPushResult?.({ ok: false, error: thrown })
        }
      }

      void fileChanged({
        dir,
        slug,
        prevObservedExpiresAt: lastObservedExpiresAt,
        shouldSkip: (one) => args.shouldSkip?.(one) ?? false,
        push: pushing,
        onReauthDetected: args.onReauthDetected,
        said: (line) => doors.said(`${logPrefix} ${line}`),
      }).then((change) => {
        lastObservedExpiresAt = change.observedExpiresAt
        if (!change.pushed && (args.shouldSkip?.(slug) ?? false) && !change.reauthDetected) {
          doors.said(
            `${logPrefix} Credential watch push skipped for ${slug} (terminal error — re-auth required)`
          )
        }
      })
    }, PUSH_DEBOUNCE_MS)
  }

  watchFile(path, { interval: WATCH_POLL_MS }, onChange)

  return () => {
    if (debounceTimer !== null) clearTimeout(debounceTimer)
    unwatchFile(path, onChange)
  }
}
