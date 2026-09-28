import { answerChapterWrite } from "akasha/alan/web/.server/chapter-write-answering/chapter-write-answering.module.code.ts"
import type { Route } from "./+types/chapter-write.route.code"

export function action({ request }: Route.ActionArgs): Promise<Response> {
  return answerChapterWrite(request)
}
