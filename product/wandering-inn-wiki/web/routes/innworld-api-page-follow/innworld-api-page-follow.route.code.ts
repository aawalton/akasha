import { answerFollow } from "akasha/alan/harness/web-page-answer/.server/answer-following/answer-following.module.code.ts"
import { readsInnworld } from "akasha/product/wandering-inn-wiki/web/modules/innworld-reader/innworld-reader.module.code.ts"

export function action({ request }: { request: Request }): Promise<Response> {
  return answerFollow(request, readsInnworld)
}
