import { answerReadout } from "akasha/readouts/serving/readout-serving.module.code.ts"
import { ringCredential } from "../../.server/jenny-ring-credential/jenny-ring-credential.module.code.ts"
import type { Route } from "./+types/jenny-categorization.route.code"

const READOUT = "monarch-unreviewed-transactions"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerReadout(request, ringCredential(), READOUT)
}
