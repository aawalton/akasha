import { answerStoplightsAdmittedBy } from "@akasha/readout-system/readout-group-serving"
import { guardReadout } from "../.server/readout-guarding/readout-guarding.module.code.ts"

export const GROUP = "attributes"

export const WIRE_KEY_NAME = "attribute"

export function loader({ request }: { request: Request }): Promise<Response> {
  return answerStoplightsAdmittedBy(request, guardReadout, GROUP, WIRE_KEY_NAME)
}
