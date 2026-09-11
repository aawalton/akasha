import { healthAnswer } from "akasha/code-system/router-apps/health-answer/health-answer.module.code.ts"

export function loader(): Response {
  return healthAnswer()
}
