import { mayRead } from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import {
  answerPages as answerFrom,
  pagesDeps,
  type ReadUser,
} from "akasha/page/access/modules/answer/answer.module.code.ts"
import { viewNarrowing } from "akasha/page/access/modules/view-narrowing/view-narrowing.module.code.ts"

export function answerPages(
  request: Request,
  pageTypeSlug: string,
  readUser: ReadUser
): Promise<Response> {
  const deps = viewNarrowing(request, pageTypeSlug, pagesDeps(readUser, mayRead))
  return answerFrom(request, pageTypeSlug, deps)
}
