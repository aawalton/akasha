import {
  answerPageTypes as answerFrom,
  pageTypesDeps,
  type ReadUser,
} from "akasha/page/access/modules/answer/answer.module.code.ts"

export function answerPageTypes(request: Request, readUser: ReadUser): Promise<Response> {
  return answerFrom(request, pageTypesDeps(readUser))
}
