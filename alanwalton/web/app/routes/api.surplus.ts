import { getEsoDayStr } from "@akasha/day/eso-day"
import { getSurplusStoplightTiers } from "@akasha/status-bar-access/stoplight-reading"
import { READOUT_CACHE_CONTROL } from "@akasha/readout-system/readout-credential"
import { guardReadout } from "~/readout-credential/lib/readout-credential.server"
import type { Route } from "./+types/api.surplus"

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const refusal = await guardReadout(request)
  if (refusal !== null) return refusal
  const day = getEsoDayStr(new Date())
  const stoplights = await getSurplusStoplightTiers({ day })
  return Response.json({ stoplights }, { headers: { "Cache-Control": READOUT_CACHE_CONTROL } })
}
