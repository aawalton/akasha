import { createHash, randomBytes, timingSafeEqual } from "node:crypto"
import { textAt } from "akasha/code/type/narrowing/modules/text-at/text-at.module.code.ts"
import { upperUuid } from "akasha/page/name-format/pages/upper-uuid/upper-uuid.name-format.code.ts"
import type { Test } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  askingFor,
  type Fetcher,
  readingFor,
  type Sleeper,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  DEVICE_SECRET_PREFIX,
  hasDeviceSecretShape,
} from "akasha/person/modules/device-secret-shape/device-secret-shape.module.code.ts"
import {
  asAccount,
  asContributor,
  contributorNamed,
  personSlugFor,
  type Whom,
} from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"

export const DEVICE_SECRET_PAGE_TYPE = "device-secret"

export const DEVICE_SECRET_HEADER = "X-Device-Secret"

const DEVICE_SECRET_RANDOM_BYTES = 32

const DEVICE_SECRET_WRITER = "alanwalton web <web@alanwalton.com>"

const SECRET_HASH_KEY = "secretHash"

const USER_ID_KEY = "userId"

const CONTRIBUTOR_KEY = "contributor"

const DEVICE_ID_KEY = "deviceId"

const REVOKED_AT_KEY = "revokedAt"

const HASH_SHAPE = /^[0-9a-f]{64}$/

const NO_MATCH = "no device secret represents the secret presented"

const NAMES_BOTH =
  "a device secret naming an account and a contributor names neither, so it opens nothing"

const NAMES_NEITHER =
  "a device secret naming no account and no contributor is nobody's, so it opens nothing"

export type Presented =
  | { readonly ok: true; readonly secret: string }
  | { readonly ok: false; readonly reason: "absent" | "malformed" }

export type DeviceSecretValues = {
  readonly userId: string | null
  readonly contributor: string | null
  readonly deviceId: string
  readonly secretHash: string
  readonly revokedAt: string | null
}

export type DeviceSecretPage = DeviceSecretValues & {
  readonly id: string
  readonly slug: string
}

export type Whose = { readonly whom: Whom } | { readonly refused: string }

export type Held = { readonly has: boolean } | { readonly unread: string }

export type Found =
  | { readonly outcome: "found"; readonly page: DeviceSecretPage }
  | { readonly outcome: "none" }
  | { readonly outcome: "unread"; readonly why: string }

export type Admitted =
  | { readonly outcome: "stands"; readonly whom: Whom; readonly slug: string }
  | { readonly outcome: "refused"; readonly why: string }
  | { readonly outcome: "unread"; readonly why: string }

export type Minted =
  | {
      readonly ok: true
      readonly secret: string
      readonly slug: string
      readonly at: string | null
    }
  | { readonly ok: false; readonly why: string }

export type Revoked =
  | { readonly ok: true; readonly slug: string | null; readonly at: string | null }
  | { readonly ok: false; readonly why: string }

type Landed = { readonly ok: true; readonly at: string | null } | Extract<Minted, { ok: false }>

export function readPresentedDeviceSecret(headerValue: string | null): Presented {
  if (headerValue === null || headerValue === "") return { ok: false, reason: "absent" }
  if (!hasDeviceSecretShape(headerValue)) return { ok: false, reason: "malformed" }
  return { ok: true, secret: headerValue }
}

export function generateDeviceSecret(): string {
  const said = randomBytes(DEVICE_SECRET_RANDOM_BYTES).toString("base64url")
  return `${DEVICE_SECRET_PREFIX}${said}`
}

export function hashDeviceSecret(secret: string): string {
  return createHash("sha256").update(secret, "utf8").digest("hex")
}

export function deviceSecretHashesEqual(one: string, two: string): boolean {
  if (!HASH_SHAPE.test(one) || !HASH_SHAPE.test(two)) return false
  return timingSafeEqual(Buffer.from(one, "utf8"), Buffer.from(two, "utf8"))
}

export function deviceSecretSlug(personSlug: string, deviceId: string): string {
  return `${personSlug}-${deviceId.toLowerCase()}`
}

export function deviceSecretValues(kept: DeviceSecretValues): Record<string, unknown> {
  const values: Record<string, unknown> = {
    [DEVICE_ID_KEY]: kept.deviceId,
    [SECRET_HASH_KEY]: kept.secretHash,
  }
  if (kept.userId !== null) values[USER_ID_KEY] = kept.userId
  if (kept.contributor !== null) values[CONTRIBUTOR_KEY] = kept.contributor
  if (kept.revokedAt !== null) values[REVOKED_AT_KEY] = kept.revokedAt
  return values
}

export function whoseIn(kept: Pick<DeviceSecretValues, "userId" | "contributor">): Whose {
  if (kept.userId !== null && kept.contributor !== null) return { refused: NAMES_BOTH }
  if (kept.contributor !== null) return { whom: asContributor(kept.contributor) }
  if (kept.userId !== null) return { whom: asAccount(kept.userId) }
  return { refused: NAMES_NEITHER }
}

export function valuesFor(
  whom: Whom,
  deviceId: string,
  secretHash: string
): DeviceSecretValues | null {
  if (whom.by === "account") {
    const account = whom.account.trim()
    if (account === "") return null
    return { userId: account, contributor: null, deviceId, secretHash, revokedAt: null }
  }
  const contributor = contributorNamed(whom.contributor)
  if (contributor === null) return null
  return { userId: null, contributor, deviceId, secretHash, revokedAt: null }
}

export function pageIn(values: Readonly<Record<string, unknown>>): DeviceSecretPage | null {
  const id = textAt(values, "id")
  const slug = textAt(values, "slug")
  const deviceId = textAt(values, DEVICE_ID_KEY)
  const secretHash = textAt(values, SECRET_HASH_KEY)
  if (id === null || slug === null) return null
  if (deviceId === null || secretHash === null) return null
  return {
    id,
    slug,
    userId: textAt(values, USER_ID_KEY),
    contributor: textAt(values, CONTRIBUTOR_KEY),
    deviceId,
    secretHash,
    revokedAt: textAt(values, REVOKED_AT_KEY),
  }
}

async function onlyOne(
  where: Readonly<Record<string, Test>>,
  narrows: (page: DeviceSecretPage) => boolean,
  two: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Found> {
  const asked = await askingFor({ pageTypeSlug: DEVICE_SECRET_PAGE_TYPE, where }, fetcher, naps)
  if ("refused" in asked) {
    return {
      outcome: "unread",
      why: `the device secret pages went unread, so nothing was matched: ${asked.refused}`,
    }
  }
  const held: DeviceSecretPage[] = []
  for (const row of asked.rows) {
    const page = pageIn(row)
    if (page === null) {
      return {
        outcome: "unread",
        why: "a device secret page carries no device or no hash",
      }
    }
    if (narrows(page)) held.push(page)
  }
  if (held.length > 1) return { outcome: "unread", why: two }
  const first = held[0]
  return first === undefined ? { outcome: "none" } : { outcome: "found", page: first }
}

async function deviceSecretCarryingHash(
  secretHash: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Found> {
  return onlyOne(
    { [SECRET_HASH_KEY]: { is: secretHash } },
    (page) => page.secretHash === secretHash,
    "one hash sits on more than one device secret, and neither is read",
    fetcher,
    naps
  )
}

async function deviceSecretFor(
  whom: Whom,
  deviceId: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Found> {
  const two = `more than one device secret represents ${deviceId}, and neither is read`
  if (whom.by === "account") {
    const account = whom.account.trim()
    if (account === "") return { outcome: "none" }
    return onlyOne(
      { [USER_ID_KEY]: { is: account }, [DEVICE_ID_KEY]: { is: deviceId } },
      (page) => page.userId === account && page.deviceId === deviceId,
      two,
      fetcher,
      naps
    )
  }
  const contributor = contributorNamed(whom.contributor)
  if (contributor === null) return { outcome: "none" }
  return onlyOne(
    { [CONTRIBUTOR_KEY]: { is: contributor }, [DEVICE_ID_KEY]: { is: deviceId } },
    (page) => page.contributor === contributor && page.deviceId === deviceId,
    two,
    fetcher,
    naps
  )
}

async function deviceSecretHeldAt(slug: string, fetcher?: Fetcher, naps?: Sleeper): Promise<Held> {
  const read = await readingFor(
    { pages: [{ pageTypeSlug: DEVICE_SECRET_PAGE_TYPE, slug }] },
    fetcher,
    naps
  )
  if ("refused" in read) {
    return { unread: `\`${slug}\` went unread, so nothing was minted over it: ${read.refused}` }
  }
  return { has: read.bodies.some((one) => one.content !== null) }
}

export async function deviceSecretPresented(
  headerValue: string | null,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Admitted> {
  const presented = readPresentedDeviceSecret(headerValue)
  if (!presented.ok) {
    return { outcome: "refused", why: `the device secret presented is ${presented.reason}` }
  }
  const presentedHash = hashDeviceSecret(presented.secret)
  const found = await deviceSecretCarryingHash(presentedHash, fetcher, naps)
  if (found.outcome === "unread") return found
  if (found.outcome === "none") return { outcome: "refused", why: NO_MATCH }
  const page = found.page
  const whose = whoseIn(page)
  if ("refused" in whose) {
    return { outcome: "refused", why: `\`${page.slug}\`: ${whose.refused}` }
  }
  if (page.revokedAt !== null) {
    return { outcome: "refused", why: `\`${page.slug}\` was revoked at ${page.revokedAt}` }
  }
  if (!deviceSecretHashesEqual(page.secretHash, presentedHash)) {
    return { outcome: "refused", why: NO_MATCH }
  }
  return { outcome: "stands", whom: whose.whom, slug: page.slug }
}

async function landing(
  slug: string,
  kept: DeviceSecretValues,
  over: boolean,
  message: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Landed> {
  const named = { pageTypeSlug: DEVICE_SECRET_PAGE_TYPE, slug }
  let read: string | undefined
  if (over) {
    const held = await readingFor({ pages: [named] }, fetcher, naps)
    if ("refused" in held) return { ok: false, why: held.refused }
    read = held.at
  }
  const wrote = await writingFor(
    {
      writer: DEVICE_SECRET_WRITER,
      message,
      pages: [{ ...named, values: deviceSecretValues(kept) }],
      ...(read === undefined ? {} : { read }),
    },
    fetcher,
    naps
  )
  if ("refused" in wrote) return { ok: false, why: wrote.refused }
  return { ok: true, at: wrote.commit }
}

export async function mintDeviceSecret(
  whom: Whom,
  deviceId: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Minted> {
  if (!upperUuid(deviceId)) {
    return { ok: false, why: `\`${deviceId}\` is no device identifier, which is an upper uuid` }
  }
  const enrolled = await personSlugFor(whom, fetcher, naps)
  if (!enrolled.ok) return { ok: false, why: enrolled.why }
  const secret = generateDeviceSecret()
  const kept = valuesFor(whom, deviceId, hashDeviceSecret(secret))
  if (kept === null) return { ok: false, why: NAMES_NEITHER }
  const slug = deviceSecretSlug(enrolled.personSlug, deviceId)
  const held = await deviceSecretHeldAt(slug, fetcher, naps)
  if ("unread" in held) return { ok: false, why: held.unread }
  const landed = await landing(
    slug,
    kept,
    held.has,
    `a device secret is minted for ${enrolled.personSlug}`,
    fetcher,
    naps
  )
  if (!landed.ok) return landed
  return { ok: true, secret, slug, at: landed.at }
}

export async function revokeDeviceSecret(
  whom: Whom,
  deviceId: string,
  at: string = new Date().toISOString(),
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Revoked> {
  const found = await deviceSecretFor(whom, deviceId, fetcher, naps)
  if (found.outcome === "unread") return { ok: false, why: found.why }
  if (found.outcome === "none") return { ok: true, slug: null, at: null }
  const page = found.page
  if (page.revokedAt !== null) return { ok: true, slug: page.slug, at: null }
  const landed = await landing(
    page.slug,
    { ...page, revokedAt: at },
    true,
    `the device secret ${page.slug} is revoked`,
    fetcher,
    naps
  )
  if (!landed.ok) return landed
  return { ok: true, slug: page.slug, at: landed.at }
}
