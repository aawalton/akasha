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
  return answerFrom(request, pageTypeSlug, pagesDeps(readUser))
}
