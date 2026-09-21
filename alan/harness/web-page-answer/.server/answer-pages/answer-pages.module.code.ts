import {
  answerPages as answerFrom,
  pagesDeps,
  type ReadUser,
} from "akasha/page/access/modules/answer/answer.module.code.ts"
import {
  DEEDS,
  pageTypeAccessFor,
} from "akasha/person/modules/page-type-access/page-type-access.module.code.ts"

async function anonymousMayRead(pageTypeSlug: string): Promise<boolean> {
  const decided = await pageTypeAccessFor(null, pageTypeSlug, DEEDS.READ)
  if (!decided.permitted && decided.why !== null) {
    console.warn(`[page-type-access] refusing an anonymous reader: ${decided.why}`)
  }
  return decided.permitted
}

export function answerPages(
  request: Request,
  pageTypeSlug: string,
  readUser: ReadUser
): Promise<Response> {
  return answerFrom(request, pageTypeSlug, pagesDeps(readUser, anonymousMayRead))
}
