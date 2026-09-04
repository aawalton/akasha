import { answerReadout } from "@akasha/readout-system/readout-serving"
import { ringCredential } from "../.server/jenny-ring-credential/jenny-ring-credential.module.code.ts"
import type { Route } from "./+types/api.categorization"

// The one readout this route serves. Everything else about it — the key the reading travels
// under, the scale it is drawn against, the words for an empty reading — is read off that
// readout's own page rather than spelled here.
const READOUT = "monarch-unreviewed-transactions"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerReadout(request, ringCredential(), READOUT)
}
