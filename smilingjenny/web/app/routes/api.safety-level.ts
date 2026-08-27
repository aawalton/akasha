import { getEsoDayStr } from "../../../../day/day"
import { getSafetyStoplightTiers } from "@shared/status-bar-access/stoplights"
import type { Route } from "./+types/api.safety-level"
import { refuseUncredentialedRingCaller } from "./api.categorization"

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
