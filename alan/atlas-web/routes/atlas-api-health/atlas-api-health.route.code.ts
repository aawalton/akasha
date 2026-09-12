import { healthAnswer } from "akasha/code/router-apps/modules/health-answer/health-answer.module.code.ts"

export function loader(): Response {
  return healthAnswer()
}
