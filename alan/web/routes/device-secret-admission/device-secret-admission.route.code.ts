import {
  buildReadoutRefusal,
  READOUT_CACHE_CONTROL,
} from "akasha/readouts/credential/readout-credential.module.code.ts"
import { readDeviceSecretAdmission } from "../../.server/device-secret-context/device-secret-context.module.code.ts"
import type { Route } from "./+types/device-secret-admission.route.code"

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const read = await readDeviceSecretAdmission(request)
  if (read === "unread") {
    return Response.json(
      { ok: false },
      { status: 503, headers: { "Cache-Control": READOUT_CACHE_CONTROL } }
    )
  }
  if (read === "refused") return buildReadoutRefusal()
  return Response.json({ ok: true }, { headers: { "Cache-Control": READOUT_CACHE_CONTROL } })
}
