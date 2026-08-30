import { getEsoDayStr } from "../../../../day/day"
import { getDailyStoplightFaces } from "@shared/status-bar-access/stoplights"
import { READOUT_CACHE_CONTROL } from "../../../../akasha/readout-system/readout-credential/readout-credential.module.code.ts"
import { guardReadout } from "~/readout-credential/lib/readout-credential.server"
import type { Route } from "./+types/api.values-stoplights"

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const refusal = await guardReadout(request)
  if (refusal !== null) return refusal
  const day = getEsoDayStr(new Date())
  const stoplights = await getDailyStoplightFaces({ day })
  return Response.json({ stoplights }, { headers: { "Cache-Control": READOUT_CACHE_CONTROL } })
}
