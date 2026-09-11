import { healthAnswer } from "akasha/code/router-apps/health-answer/health-answer.module.code.ts"

export function loader(): Response {
  return healthAnswer()
}
