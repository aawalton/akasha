import {
  buildReadoutRefusal,
  READOUT_CACHE_CONTROL,
} from "@akasha/readout-system/readout-credential"
import { readDeviceSecretAdmission } from "../.server/device-secret-context/device-secret-context.module.code.ts"
import type { Route } from "./+types/api.device-secret.admission"

/**
 * The one route a phone may ask "is what I hold still good?" of.
 *
 * It carries no reading, so it can judge the credential ALONE — no `holdsRouteAccess`, no
 * grant lookup, nothing that fails closed on a store outage. That is the whole point: every
 * other device-secret route answers 401 both when the secret is wrong and when the page store
 * did not answer, and a phone acting on that 401 would rotate its credential every time Alan's
 * workstation restarted, turning a transient outage into permanent breakage.
 *
 * Here the three outcomes get three statuses:
 *   200  the store admits this secret       — keep it
 *   401  the store refuses this secret      — let it go and mint another
 *   503  the store did not answer at all    — decide nothing
 *
 * The bodies name no reason, as every refusal on this site does. The status is the whole of
 * what a caller learns, and 503 is the honest reading of a store that did not answer rather
 * than a refusal dressed up as one.
 */
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
