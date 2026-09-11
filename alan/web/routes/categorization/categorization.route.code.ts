import { answerReadoutAdmittedBy } from "akasha/alan/harness/readouts/serving/readout-serving.module.code.ts"
import { guardReadout } from "akasha/alan/web/.server/readout-guarding/readout-guarding.module.code.ts"
import type { Route } from "./+types/categorization.route.code"

const READOUT = "monarch-unreviewed-transactions"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerReadoutAdmittedBy(request, guardReadout, READOUT)
}
