import { answerStoryChat } from "akasha/alan/web/.server/story-chat-answering/story-chat-answering.module.code.ts"
import type { Route } from "./+types/story-chat.route.code"

export function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return answerStoryChat(request)
}

export function action({ request }: Route.ActionArgs): Promise<Response> {
  return answerStoryChat(request)
}
