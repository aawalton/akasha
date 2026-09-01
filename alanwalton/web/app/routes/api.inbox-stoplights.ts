import { getEsoDayStr } from "@akasha/day/eso-day"
import { getInboxStoplightTiers } from "@akasha/status-bar-access/stoplight-reading"
import { READOUT_CACHE_CONTROL } from "@akasha/readout-system/readout-credential"
import { guardReadout } from "~/readout-credential/lib/readout-credential.server"
import type { Route } from "./+types/api.inbox-stoplights"

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const refusal = await guardReadout(request)
  if (refusal !== null) return refusal
  const day = getEsoDayStr(new Date())
  const stoplights = await getInboxStoplightTiers({ day })
  return Response.json({ stoplights }, { headers: { "Cache-Control": READOUT_CACHE_CONTROL } })
}
