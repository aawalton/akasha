import { answerErrorReport } from "akasha/alan/harness/error-report-answers/answer-error-report/answer-error-report.module.code.ts"

const SHELL_ORIGINS: readonly string[] = []

export async function action({ request }: { request: Request }): Promise<Response> {
  return answerErrorReport(request, SHELL_ORIGINS)
}
