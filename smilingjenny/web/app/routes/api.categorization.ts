import { answerCategorization } from "@akasha/readout-system/readout-categorization"
import { ringCredential } from "~/lib/ring-credential.server"
import type { Route } from "./+types/api.categorization"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerCategorization(request, ringCredential())
}
