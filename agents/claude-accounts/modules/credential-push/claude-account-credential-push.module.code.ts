import { chmodSync, existsSync } from "node:fs"
import { join } from "node:path"
import { landedMechanically } from "@akasha/command-system/asking"
import type { Answer } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import type { PageOf } from "@akasha/indexes/answering"
import type { Reading } from "@akasha/indexes/shape"
import { secretAt, uncommittedAt } from "@akasha/pages-system/page-file-name"
import { type Composed, cipherFor, secretsIn, unfit } from "@akasha/pages-system/page-secret"
import { mergeUncommitted, uncommittedIn } from "@akasha/pages-system/page-uncommitted"
import type { Value } from "@akasha/pages-system/page-value"
import { instantOf, markedIn, type Routing } from "../marking/claude-account-marking.module.code.ts"
import { accountPathIn } from "../reading/claude-account-reading.module.code.ts"

const CALLED_AS = "claude-account-credential-push"

const ACCESS_KEY = "access-token"

const REFRESH_KEY = "refresh-token"

const EXPIRES_AT = "accessTokenExpiresAt"

const RESCUED = "rescuedCredential"

const SLUG_SHAPE = /^[a-z0-9][a-z0-9-]*$/

const NARROWED = 0o600

const LANDED = 0

export const PUSHED_KEYS: readonly string[] = [ACCESS_KEY, REFRESH_KEY]

export const RESCUED_KEY = RESCUED

export type Credential = {
  readonly slug: string
  readonly accessToken: string
  readonly refreshToken: string
  readonly accessTokenExpiresAtMs: number
}

export type SecretsRead = (root: string, page: string) => ReadonlyMap<string, string> | null

export type CipherMade = (
  root: string,
  page: string,
  values: ReadonlyMap<string, string>
) => Composed

export type Landing = (
  root: string,
  calledAs: string,
  changes: readonly FileEdit[],
  message: string
) => Promise<Answer>

export type Doors = {
  readonly secretsRead: SecretsRead
  readonly cipherMade: CipherMade
  readonly landing: Landing
}

export const DOORS: Doors = {
  secretsRead: secretsIn,
  cipherMade: cipherFor,
  landing: landedMechanically,
}

export type Push =
  | {
      readonly kind: "pushed"
      readonly slug: string
      readonly sidecar: string
      readonly keys: readonly string[]
    }
  | { readonly kind: "unchanged"; readonly slug: string; readonly sidecar: string }
  | { readonly kind: "absent"; readonly slug: string; readonly why: string }
  | { readonly kind: "stale"; readonly slug: string; readonly why: string }
  | { readonly kind: "refused"; readonly slug: string; readonly why: string }

function sayOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

function refusedFor(slug: string, why: string): Push {
  return { kind: "refused", slug, why }
}

export function sayingOf(answer: Answer): string {
  const said = answer.refusals.filter((one) => one.trim() !== "")
  if (said.length > 0) return said.join("; ")
  const report = answer.report.filter((one) => one.trim() !== "")
  if (report.length > 0) return report.join("; ")
  return `the landing answered ${answer.code} and said nothing`
}

export function expiryHeldIn(beside: Value | null): number | null {
  const said = beside === null ? null : beside[EXPIRES_AT]
  if (typeof said !== "string" || said === "") return null
  const at = Date.parse(said)
  return Number.isNaN(at) ? null : at
}

export function narrowedFor(root: string, page: string): string | null {
  const at = uncommittedAt(page)
  if (at === null) return `\`${page}\` names no file to hold a rescued pair beside the page`
  const full = join(root, at)
  try {
    if (!existsSync(full)) mergeUncommitted(root, page, {})
    chmodSync(full, NARROWED)
  } catch (thrown) {
    return sayOf(thrown)
  }
  return null
}

export function rescuedBeside(
  root: string,
  page: string,
  credential: Credential,
  given: Reading,
  pageOf: PageOf,
  routing?: Routing
): string {
  const narrowed = narrowedFor(root, page)
  if (narrowed !== null) {
    return `and the file beside the page was not narrowed, so the rotated pair is gone: ${narrowed}`
  }
  const said = markedIn(
    root,
    credential.slug,
    {
      [RESCUED]: {
        accessToken: credential.accessToken,
        refreshToken: credential.refreshToken,
        expiresAtMs: credential.accessTokenExpiresAtMs,
      },
    },
    given,
    pageOf,
    routing
  )
  if (said.kind !== "held") {
    const why = said.kind === "unchanged" ? said.kind : said.why
    return `and the rotated pair was not held beside the page either, so that pair is gone: ${why}`
  }
  return "and the rotated pair is held beside the page, which no gate judges, so the next read takes that pair"
}

function stampedOn(
  root: string,
  credential: Credential,
  at: string,
  given: Reading,
  pageOf: PageOf,
  routing?: Routing
): string | null {
  const said = markedIn(
    root,
    credential.slug,
    { [EXPIRES_AT]: at, [RESCUED]: null },
    given,
    pageOf,
    routing
  )
  if (said.kind === "held") return null
  return said.kind === "unchanged" ? said.kind : said.why
}

function merged(kept: ReadonlyMap<string, string>, next: Map<string, string>): boolean {
  for (const [key, value] of kept) if (!next.has(key)) next.set(key, value)
  return kept.size === next.size && [...next].every(([key, value]) => kept.get(key) === value)
}

export async function pushedIn(
  root: string,
  credential: Credential,
  doors: Doors,
  given: Reading,
  pageOf: PageOf,
  routing?: Routing
): Promise<Push> {
  const { slug } = credential
  try {
    if (!SLUG_SHAPE.test(slug)) {
      return refusedFor(slug, `\`${slug}\` is no account name a path is written from`)
    }
    const next = new Map<string, string>([
      [ACCESS_KEY, credential.accessToken],
      [REFRESH_KEY, credential.refreshToken],
    ])
    for (const [key, value] of next) {
      const wrong = unfit(key, value)
      if (wrong !== null) return refusedFor(slug, wrong)
    }
    const at = instantOf(credential.accessTokenExpiresAtMs)
    if (at === null) {
      return refusedFor(
        slug,
        "the expiry handed in is no moment a date holds, and a credential the reader cannot judge expired is no credential"
      )
    }
    const page = accountPathIn(given, slug)
    if (page === null) {
      return {
        kind: "absent",
        slug,
        why: `no page is filed for \`${slug}\`, and a secret belongs to a page`,
      }
    }
    const sidecar = secretAt(page)
    if (sidecar === null) return refusedFor(slug, `\`${slug}\` names no sops file beside its page`)

    const held = expiryHeldIn(uncommittedIn(root, page))
    if (held !== null && credential.accessTokenExpiresAtMs <= held) {
      return {
        kind: "stale",
        slug,
        why: `the page holds a credential expiring ${new Date(held).toISOString()} and this one expires ${at}, so the fresher credential wins`,
      }
    }

    let kept: ReadonlyMap<string, string> | null
    try {
      kept = doors.secretsRead(root, page)
    } catch (thrown) {
      return refusedFor(slug, sayOf(thrown))
    }
    if (merged(kept ?? new Map<string, string>(), next)) {
      const wrong = stampedOn(root, credential, at, given, pageOf, routing)
      if (wrong !== null)
        return refusedFor(
          slug,
          `${sidecar} already holds the pair and its expiry was not stamped: ${wrong}`
        )
      return { kind: "unchanged", slug, sidecar }
    }

    const composed = doors.cipherMade(root, page, next)
    if (composed.text === null) return refusedFor(slug, composed.why)
    const landed = await doors.landing(
      root,
      CALLED_AS,
      [{ path: sidecar, body: new TextEncoder().encode(composed.text) }],
      `akasha: credential push ${sidecar}`
    )
    if (landed.code !== LANDED) {
      return refusedFor(
        slug,
        `${sidecar} did not land: ${sayingOf(landed)} — ${rescuedBeside(root, page, credential, given, pageOf, routing)}`
      )
    }

    let read: ReadonlyMap<string, string> | null
    try {
      read = doors.secretsRead(root, page)
    } catch {
      read = null
    }
    if (read === null || [...next].some(([key, value]) => read.get(key) !== value)) {
      return refusedFor(
        slug,
        `${sidecar} landed and does not read back what it was handed — ${rescuedBeside(root, page, credential, given, pageOf, routing)}`
      )
    }

    const wrong = stampedOn(root, credential, at, given, pageOf, routing)
    if (wrong !== null) {
      return refusedFor(
        slug,
        `${sidecar} holds the pair and its expiry was not stamped, so the reader answers absent: ${wrong}`
      )
    }
    return { kind: "pushed", slug, sidecar, keys: [...PUSHED_KEYS] }
  } catch (thrown) {
    return refusedFor(slug, `the push threw, which it is written never to do: ${sayOf(thrown)}`)
  }
}
