import { contentServedBy } from "akasha/alan/harness/alanwalton-ios-notification/modules/stoplights-activity-pushing/stoplights-activity-pushing.module.code.ts"
import { READOUT_CACHE_CONTROL } from "akasha/alan/harness/readout/modules/credential/readout-credential.module.code.ts"
import { noReading } from "akasha/alan/harness/readout/modules/serving/readout-serving.module.code.ts"
import { stoplightsCounted } from "akasha/alan/harness/stoplight/modules/stoplights-activity-content/stoplights-activity-content.module.code.ts"
import { guardReadout } from "akasha/alan/web/.server/readout-guarding/readout-guarding.module.code.ts"
import { stoplightsActivity } from "akasha/alan/web/routes/stoplights-activity/stoplights-activity.route.ts"
import { route } from "akasha/code/route/route.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

const SERVED_BY = namedAs(route.slug, stoplightsActivity.slug, null)

export async function loader({ request }: { request: Request }): Promise<Response> {
  const refusal = await guardReadout(request)
  if (refusal !== null) return refusal
  const content = await contentServedBy(SERVED_BY, new Date().toISOString())
  if (stoplightsCounted(content) === 0) return noReading()
  return Response.json(content, { headers: { "Cache-Control": READOUT_CACHE_CONTROL } })
}
