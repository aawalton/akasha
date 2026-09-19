import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import type {
  Fetcher,
  Sleeper,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  DEVICE_SECRET_HEADER,
  deviceSecretPresented,
  mintDeviceSecret as mintOverTheStore,
  revokeDeviceSecret as revokeOverTheStore,
} from "akasha/person/modules/device-secret-keeping/device-secret-keeping.module.code.ts"
import {
  asAccount,
  asContributor,
  type Whom,
} from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"

export type DeviceSecretAdmission = "admitted" | "refused" | "unread"

export type DeviceSecretContext =
  | { readonly outcome: "admitted"; readonly whom: Whom }
  | { readonly outcome: "refused" }
  | { readonly outcome: "unread" }

export type MintedDeviceSecret =
  | { readonly ok: true; readonly deviceSecret: string }
  | { readonly ok: false; readonly why: string }

export type Asked = {
  readonly deviceId: string
  readonly userId?: string
  readonly request?: Request
}

const NOBODY =
  "the call names neither a signed-in contributor nor an account, so it reaches no person"

async function whomOf(
  request: Request | undefined,
  accountUserId: string | undefined
): Promise<Whom | null> {
  if (request !== undefined) {
    const signed = await signedInAs(request)
    if (signed !== null) return asContributor(signed.contributor)
  }
  const account = (accountUserId ?? "").trim()
  return account === "" ? null : asAccount(account)
}

export async function mintDeviceSecret(args: Asked): Promise<MintedDeviceSecret> {
  const whom = await whomOf(args.request, args.userId)
  if (whom === null) return { ok: false, why: NOBODY }
  const minted = await mintOverTheStore(whom, args.deviceId)
  if (!minted.ok) return { ok: false, why: minted.why }
  return { ok: true, deviceSecret: minted.secret }
}

export async function revokeDeviceSecret(args: Asked): Promise<void> {
  const whom = await whomOf(args.request, args.userId)
  if (whom === null) throw new Error(`device-secrets revoke failed: ${NOBODY}`)
  const revoked = await revokeOverTheStore(whom, args.deviceId)
  if (!revoked.ok) throw new Error(`device-secrets revoke failed: ${revoked.why}`)
}

export async function resolveDeviceSecretContext(
  request: Request,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<DeviceSecretContext> {
  const read = await deviceSecretPresented(request.headers.get(DEVICE_SECRET_HEADER), fetcher, naps)
  if (read.outcome === "unread") {
    process.stderr.write(`[device-secret] unread: ${read.why}\n`)
    return { outcome: "unread" }
  }
  if (read.outcome === "refused") {
    process.stderr.write(`[device-secret] refusing: ${read.why}\n`)
    return { outcome: "refused" }
  }
  return { outcome: "admitted", whom: read.whom }
}

export async function readDeviceSecretAdmission(
  request: Request,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<DeviceSecretAdmission> {
  const resolved = await resolveDeviceSecretContext(request, fetcher, naps)
  return resolved.outcome
}
