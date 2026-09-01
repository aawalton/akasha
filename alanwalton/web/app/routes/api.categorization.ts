import { answerReadoutAdmittedBy } from "@akasha/readout-system/readout-categorization"
import { guardReadout } from "~/readout-credential/lib/readout-credential.server"
import type { Route } from "./+types/api.categorization"

// The one readout this route serves. Everything else about it — the key the reading travels
// under, the scale it is drawn against, the words for an empty reading — is read off that
// readout's own page rather than spelled here.
const READOUT = "monarch-unreviewed-transactions"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerReadoutAdmittedBy(request, guardReadout, READOUT)
}
