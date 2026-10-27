import {
  answerActionBar,
  answerActionDraft,
} from "akasha/alan/web/.server/action-bar-answering/action-bar-answering.module.code.ts"
import type { Route } from "./+types/action-bar.route.code"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerActionDraft(request)
}

export function action({ request }: Route.ActionArgs): Promise<Response> {
  return answerActionBar(request)
}
