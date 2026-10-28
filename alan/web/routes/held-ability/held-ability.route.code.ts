import { answerHeldAbility } from "akasha/alan/web/.server/held-ability-answering/held-ability-answering.module.code.ts"

export async function action({ request }: { request: Request }): Promise<Response> {
  return answerHeldAbility(request)
}
