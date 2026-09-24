import { answerRelayed } from "akasha/alan/harness/readout/modules/relay/readout-relay.module.code.ts"
import type { Route } from "./+types/readout-relay.route.code"

export function action({ request }: Route.ActionArgs): Promise<Response> {
  return answerRelayed(request)
}
