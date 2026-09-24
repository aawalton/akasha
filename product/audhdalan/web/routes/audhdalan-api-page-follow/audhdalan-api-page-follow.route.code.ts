import { answerFollow } from "akasha/alan/harness/web-page-answer/.server/answer-following/answer-following.module.code.ts"

function readsAnyone(): Promise<{ user: null; headers: Headers }> {
  return Promise.resolve({ user: null, headers: new Headers() })
}

export function action({ request }: { request: Request }): Promise<Response> {
  return answerFollow(request, readsAnyone)
}
