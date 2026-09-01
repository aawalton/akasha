import { createHash, randomBytes, timingSafeEqual } from "node:crypto"
import { patchFiles, writeFiles } from "@akasha/pages-query"
import { askComposed } from "@akasha/pages-query/ask"
import type { Fetcher, Sleeper } from "@akasha/pages-query/fetcher"
import { upperUuid } from "@akasha/pages-system/name-format/upper-uuid"
import { textAt } from "@akasha/utils-narrow/text-at"
import {
  DEVICE_SECRET_PREFIX,
  hasDeviceSecretShape,
} from "../device-secret-shape/device-secret-shape.module.code.ts"
import { personSlugForAccount } from "../person-enrolment/person-enrolment.module.code.ts"

export const DEVICE_SECRET_PAGE_TYPE = "device-secret"

export const DEVICE_SECRET_HEADER = "X-Device-Secret"

export const DEVICE_SECRET_RANDOM_BYTES = 32

export const DEVICE_SECRETS_FOLDER = "akasha/person-system/device-secret/device-secrets"

export const DEVICE_SECRET_WRITER = "alanwalton web <web@alanwalton.com>"

export const SECRET_HASH_KEY = "secretHash"

export const USER_ID_KEY = "userId"

export const DEVICE_ID_KEY = "deviceId"

export const REVOKED_AT_KEY = "revokedAt"

const HASH_SHAPE = /^[0-9a-f]{64}$/

const STAMPED = 6

const OVER = 256

const NOT_STANDING = "no device secret stands for the secret presented"

export type Presented =
  | { readonly ok: true; readonly secret: string }
  | { readonly ok: false; readonly reason: "absent" | "malformed" }

export type DeviceSecretPage = {
  readonly id: string
  readonly slug: string
  readonly userId: string
  readonly deviceId: string
  readonly secretHash: string
  readonly revokedAt: string | null
}

export type Found =
  | { readonly outcome: "found"; readonly page: DeviceSecretPage }
  | { readonly outcome: "none" }
  | { readonly outcome: "unread"; readonly why: string }

export type PresentedStanding =
  | { readonly outcome: "stands"; readonly userId: string; readonly slug: string }
  | { readonly outcome: "refused"; readonly why: string }
  | { readonly outcome: "unread"; readonly why: string }

export type Minted =
  | { readonly ok: true; readonly secret: string; readonly slug: string; readonly at: string }
  | { readonly ok: false; readonly why: string }

export type Revoked =
  | { readonly ok: true; readonly slug: string | null; readonly at: string | null }
  | { readonly ok: false; readonly why: string }

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

export function uuidVersion7(at: number = Date.now()): string {
  const bytes = randomBytes(16)
  let left = at
  for (let one = STAMPED - 1; one >= 0; one -= 1) {
    bytes[one] = left % OVER
    left = Math.floor(left / OVER)
  }
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x70
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80
  const said = bytes.toString("hex")
  return [
    said.slice(0, 8),
    said.slice(8, 12),
    said.slice(12, 16),
    said.slice(16, 20),
    said.slice(20),
  ].join("-")
}

export function deviceSecretSlug(personSlug: string, deviceId: string): string {
  return `${personSlug}-${deviceId.toLowerCase()}`
}

export function deviceSecretPath(slug: string): string {
  return `${DEVICE_SECRETS_FOLDER}/${slug}.device-secret.ts`
}

export function exportNameFor(slug: string): string {
  const parts = slug.split("-").filter((one) => one !== "")
  const first = parts[0]
  if (first === undefined) return ""
  const rest = parts.slice(1).map((one) => one.charAt(0).toUpperCase() + one.slice(1))
  return first + rest.join("")
}

export function deviceSecretBody(page: DeviceSecretPage): string {
  const lines = [
    'import type { DeviceSecret } from "../device-secret.page-type.ts"',
    "",
    `export const ${exportNameFor(page.slug)} = {`,
    `  id: ${JSON.stringify(page.id)},`,
    `  pageTypeSlug: ${JSON.stringify(DEVICE_SECRET_PAGE_TYPE)},`,
    `  slug: ${JSON.stringify(page.slug)},`,
    `  userId: ${JSON.stringify(page.userId)},`,
    `  deviceId: ${JSON.stringify(page.deviceId)},`,
    `  secretHash: ${JSON.stringify(page.secretHash)},`,
  ]
  if (page.revokedAt !== null) lines.push(`  revokedAt: ${JSON.stringify(page.revokedAt)},`)
  lines.push("} as const satisfies DeviceSecret", "")
  return lines.join("\n")
}

export function pageIn(values: Readonly<Record<string, unknown>>): DeviceSecretPage | null {
  const id = textAt(values, "id")
  const slug = textAt(values, "slug")
  const userId = textAt(values, USER_ID_KEY)
  const deviceId = textAt(values, DEVICE_ID_KEY)
  const secretHash = textAt(values, SECRET_HASH_KEY)
  if (id === null || slug === null) return null
  if (userId === null || deviceId === null || secretHash === null) return null
  return { id, slug, userId, deviceId, secretHash, revokedAt: textAt(values, REVOKED_AT_KEY) }
}

async function onlyOne(
  where: Readonly<Record<string, unknown>>,
  narrows: (page: DeviceSecretPage) => boolean,
  two: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Found> {
  const asked = await askComposed({ "page-type": DEVICE_SECRET_PAGE_TYPE, where }, fetcher, naps)
  if (!asked.ok) {
    return {
      outcome: "unread",
      why: `the device secret pages went unread, so nothing was matched: ${asked.why}`,
    }
  }
  const held: DeviceSecretPage[] = []
  for (const row of asked.answer.rows) {
    const page = pageIn(row.values)
    if (page === null) {
      return {
        outcome: "unread",
        why: "a device secret page carries no account or no device or no hash",
      }
    }
    if (narrows(page)) held.push(page)
  }
  if (held.length > 1) return { outcome: "unread", why: two }
  const first = held[0]
  return first === undefined ? { outcome: "none" } : { outcome: "found", page: first }
}

export async function deviceSecretCarryingHash(
  secretHash: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Found> {
  return onlyOne(
    { [SECRET_HASH_KEY]: { is: secretHash } },
    (page) => page.secretHash === secretHash,
    "one hash stands on more than one device secret, and neither is read",
    fetcher,
    naps
  )
}

export async function deviceSecretFor(
  userId: string,
  deviceId: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Found> {
  return onlyOne(
    { [USER_ID_KEY]: { is: userId }, [DEVICE_ID_KEY]: { is: deviceId } },
    (page) => page.userId === userId && page.deviceId === deviceId,
    `more than one device secret stands for ${deviceId}, and neither is read`,
    fetcher,
    naps
  )
}

export async function deviceSecretPresented(
  headerValue: string | null,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<PresentedStanding> {
  const presented = readPresentedDeviceSecret(headerValue)
  if (!presented.ok) {
    return { outcome: "refused", why: `the device secret presented is ${presented.reason}` }
  }
  const presentedHash = hashDeviceSecret(presented.secret)
  const found = await deviceSecretCarryingHash(presentedHash, fetcher, naps)
  if (found.outcome === "unread") return found
  if (found.outcome === "none") return { outcome: "refused", why: NOT_STANDING }
  const page = found.page
  if (page.revokedAt !== null) {
    return { outcome: "refused", why: `\`${page.slug}\` was revoked at ${page.revokedAt}` }
  }
  if (!deviceSecretHashesEqual(page.secretHash, presentedHash)) {
    return { outcome: "refused", why: NOT_STANDING }
  }
  return { outcome: "stands", userId: page.userId, slug: page.slug }
}

export async function mintDeviceSecret(
  userId: string,
  deviceId: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Minted> {
  if (!upperUuid(deviceId)) {
    return { ok: false, why: `\`${deviceId}\` is no device identifier, which is an upper uuid` }
  }
  const enrolled = await personSlugForAccount(userId, fetcher, naps)
  if (!enrolled.ok) return { ok: false, why: enrolled.why }
  const found = await deviceSecretFor(userId, deviceId, fetcher, naps)
  if (found.outcome === "unread") return { ok: false, why: found.why }
  const slug = deviceSecretSlug(enrolled.personSlug, deviceId)
  const secret = generateDeviceSecret()
  const page: DeviceSecretPage = {
    id: found.outcome === "found" ? found.page.id : uuidVersion7(),
    slug,
    userId,
    deviceId,
    secretHash: hashDeviceSecret(secret),
    revokedAt: null,
  }
  const put = { path: deviceSecretPath(slug), content: deviceSecretBody(page) }
  const message = `a device secret is minted for ${enrolled.personSlug}`
  const landed =
    found.outcome === "found"
      ? await patchFiles([put.path], () => [put], DEVICE_SECRET_WRITER, message, fetcher, naps)
      : await writeFiles([put], DEVICE_SECRET_WRITER, message, fetcher, naps)
  if (!landed.ok) return { ok: false, why: landed.why }
  return { ok: true, secret, slug, at: landed.at }
}

export async function revokeDeviceSecret(
  userId: string,
  deviceId: string,
  at: string = new Date().toISOString(),
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Revoked> {
  const standing = await deviceSecretFor(userId, deviceId, fetcher, naps)
  if (standing.outcome === "unread") return { ok: false, why: standing.why }
  if (standing.outcome === "none") return { ok: true, slug: null, at: null }
  const page = standing.page
  if (page.revokedAt !== null) return { ok: true, slug: page.slug, at: null }
  const put = {
    path: deviceSecretPath(page.slug),
    content: deviceSecretBody({ ...page, revokedAt: at }),
  }
  const landed = await patchFiles(
    [put.path],
    () => [put],
    DEVICE_SECRET_WRITER,
    `the device secret ${page.slug} is revoked`,
    fetcher,
    naps
  )
  if (!landed.ok) return { ok: false, why: landed.why }
  return { ok: true, slug: page.slug, at: landed.at }
}
