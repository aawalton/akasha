import { getEsoDayStr } from "@akasha/day/eso-day"
import { getSafetyStoplightTiers } from "@akasha/status-bar-access/stoplight-reading"
import { refuseUncredentialedRingCaller } from "~/lib/ring-credential.server"
import type { Route } from "./+types/api.safety-level"

const JENNYS_CAPTION = "Alan's Safety"

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const refusal = refuseUncredentialedRingCaller(request)
  if (refusal !== null) return refusal
  const drawn = await getSafetyStoplightTiers({ day: getEsoDayStr(new Date()) })
  return Response.json(
    { stoplights: drawn.map((circle) => ({ ...circle, label: JENNYS_CAPTION })) },
    { headers: { "Cache-Control": "private, no-store" } }
  )
}
