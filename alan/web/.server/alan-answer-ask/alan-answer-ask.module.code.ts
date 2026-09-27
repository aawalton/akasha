import { alanContributor } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import { carriedToStore } from "akasha/page/query/modules/store-carrying/store-carrying.module.code.ts"

async function alanSignedIn(request: Request): Promise<boolean> {
  return (await alanContributor(request)) !== null
}

export async function answerAsk(request: Request): Promise<Response> {
  return carriedToStore(request, "/ask", "an ask carried through alanwalton.com", alanSignedIn)
}

export async function answerShape(request: Request): Promise<Response> {
  return carriedToStore(request, "/shape", "a shape asked through alanwalton.com", alanSignedIn)
}
