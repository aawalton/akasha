import { answerCategorizationAdmittedBy } from "@akasha/readout-system/readout-categorization"
import { guardReadout } from "~/readout-credential/lib/readout-credential.server"
import type { Route } from "./+types/api.categorization"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerCategorizationAdmittedBy(request, guardReadout)
}
