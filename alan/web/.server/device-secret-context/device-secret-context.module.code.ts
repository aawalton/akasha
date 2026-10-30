import type {
  Fetcher,
  Sleeper,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  DEVICE_SECRET_HEADER,
  deviceSecretPresented,
} from "akasha/person/modules/device-secret-keeping/device-secret-keeping.module.code.ts"
import type { Whom } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"

type DeviceSecretAdmission = "admitted" | "refused" | "unread"

export type DeviceSecretContext =
  | { readonly outcome: "admitted"; readonly whom: Whom }
  | { readonly outcome: "refused" }
  | { readonly outcome: "unread" }

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
