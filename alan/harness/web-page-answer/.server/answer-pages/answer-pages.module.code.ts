import { mayRead } from "akasha/alan/harness/web-page-answer/.server/reader-access/reader-access.module.code.ts"
import {
  answerPages as answerFrom,
  pagesDeps,
  type ReadUser,
} from "akasha/page/access/modules/answer/answer.module.code.ts"

export function answerPages(
  request: Request,
  pageTypeSlug: string,
  readUser: ReadUser
): Promise<Response> {
  return answerFrom(request, pageTypeSlug, pagesDeps(readUser, mayRead))
}
