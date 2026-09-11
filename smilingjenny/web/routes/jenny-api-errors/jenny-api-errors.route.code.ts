import {
  answerErrorPreflight,
  answerErrorReport,
} from "akasha/alan/harness/error-report-answers/answer-error-report/answer-error-report.module.code.ts"

const SHELL_ORIGINS: readonly string[] = ["https://smilingjenny.me", "capacitor://localhost"]

export async function loader({ request }: { request: Request }): Promise<Response> {
  return answerErrorPreflight(request, SHELL_ORIGINS)
}

export async function action({ request }: { request: Request }): Promise<Response> {
  return answerErrorReport(request, SHELL_ORIGINS)
}
