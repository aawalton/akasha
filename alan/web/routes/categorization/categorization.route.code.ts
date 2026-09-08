import { answerReadoutAdmittedBy } from "@akasha/readout-system/readout-serving"
import { guardReadout } from "../../.server/readout-guarding/readout-guarding.module.code.ts"
import type { Route } from "./+types/categorization.route.code"

const READOUT = "monarch-unreviewed-transactions"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerReadoutAdmittedBy(request, guardReadout, READOUT)
}
