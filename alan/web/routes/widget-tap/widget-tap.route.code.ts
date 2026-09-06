import {
  answerWidgetTap,
  answerWidgetTapAsked,
} from "../../.server/widget-tap-answering/widget-tap-answering.module.code.ts"
import type { Route } from "./+types/widget-tap.route.code"

export function loader({ request }: Route.LoaderArgs): Response {
  return answerWidgetTapAsked(request)
}

export function action({ request }: Route.ActionArgs): Promise<Response> {
  return answerWidgetTap(request)
}
