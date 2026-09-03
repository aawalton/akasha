import { randomBytes } from "node:crypto"
import { assertCredentialPathAllowed } from "@akasha/supabase-auth/protected-user"
import { createServiceRoleClient } from "../service-role/service-role.module.code.ts"

export const DEFAULT_THROWAWAY_EMAIL = "browser-test@throwaway.alanwalton.com"

export const IDLE_DEV_THROWAWAY_EMAIL = "idle-dev-throwaway@alanwalton.com"

const CANONICAL_SEEDED_EMAILS: readonly string[] = [
  DEFAULT_THROWAWAY_EMAIL,
  IDLE_DEV_THROWAWAY_EMAIL,
]

function isCanonicalSeededEmail(email: string): boolean {
  return CANONICAL_SEEDED_EMAILS.includes(email)
}

const CANONICAL_ROTATION_ACK_FLAG = "--i-understand-this-breaks-the-fleet"

export function assertCanonicalRotationAllowed(params: {
  readonly email: string
  readonly resetPassword: boolean
  readonly acknowledgeCanonicalRotation: boolean
}): undefined {
  if (!params.resetPassword) return
  if (!isCanonicalSeededEmail(params.email)) return
  if (params.acknowledgeCanonicalRotation) return
  throw new Error(
    `ensure-user: refusing to rotate the password of canonical seeded identity ${params.email}. ` +
      "Its password is pinned in developer-local env files (~/.secrets.env) this command cannot " +
      "update, so rotating it desyncs the stored credential and breaks every new agent spawn at " +
      "the storage-state export. Mint a per-run throwaway user (a unique --email) instead. " +
      "If you " +
      `truly must rotate this shared identity, re-run with ${CANONICAL_ROTATION_ACK_FLAG} and ` +
      "update the env files immediately."
  )
}

export function assertSafeProvisionTarget(userId: string): undefined {
  return assertCredentialPathAllowed({ resolvedUserId: userId })
}

interface EnsureThrowawayUserResult {
  readonly userId: string
  readonly email: string
  readonly created: boolean
  readonly passwordSet: boolean
  readonly password?: string
}

function generatePassword(): string {
  return randomBytes(24).toString("base64url")
}

interface EnsureThrowawayUserOptions {
  readonly email: string
  readonly password?: string
  readonly resetPassword: boolean
  readonly acknowledgeCanonicalRotation?: boolean
}

export async function ensureThrowawayUser(
  options: EnsureThrowawayUserOptions
): Promise<EnsureThrowawayUserResult> {
  const client = createServiceRoleClient()

  const list = await client.auth.admin.listUsers({ perPage: 1000 })
  if (list.error) throw new Error(`ensure-user: listUsers failed: ${list.error.message}`)
  const existing = list.data.users.find((u) => u.email === options.email)

  if (existing) {
    assertSafeProvisionTarget(existing.id)
    if (!options.resetPassword) {
      return { userId: existing.id, email: options.email, created: false, passwordSet: false }
    }
    assertCanonicalRotationAllowed({
      email: options.email,
      resetPassword: options.resetPassword,
      acknowledgeCanonicalRotation: options.acknowledgeCanonicalRotation ?? false,
    })
    const password = options.password ?? generatePassword()
    const upd = await client.auth.admin.updateUserById(existing.id, { password })
    if (upd.error) throw new Error(`ensure-user: updateUserById failed: ${upd.error.message}`)
    return {
      userId: existing.id,
      email: options.email,
      created: false,
      passwordSet: true,
      password,
    }
  }

  const password = options.password ?? generatePassword()
  const created = await client.auth.admin.createUser({
    email: options.email,
    password,
    email_confirm: true,
  })
  if (created.error) throw new Error(`ensure-user: createUser failed: ${created.error.message}`)
  const user = created.data.user
  if (!user) throw new Error("ensure-user: createUser returned no user")
  assertSafeProvisionTarget(user.id)
  return { userId: user.id, email: options.email, created: true, passwordSet: true, password }
}
