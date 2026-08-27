import { EXIT_TOOL_ERROR } from "../../../../tools/lib/check-workflow/violation-reporter"

export type CheckRunVerdict = "clean" | "violations" | "tool-error"

export interface CheckRunInput {
  readonly exitCode: number | null
  readonly stderr: string
}

const MODULE_RESOLUTION = /^error: Cannot find module /m

export function classifyCheckRun(input: CheckRunInput): CheckRunVerdict {
  const { exitCode } = input
  if (exitCode === 0) return "clean"
  if (exitCode === null || exitCode === EXIT_TOOL_ERROR) return "tool-error"
  return MODULE_RESOLUTION.test(input.stderr) ? "tool-error" : "violations"
}

export function decideCheckExit(input: CheckRunInput): number {
  const { exitCode } = input
  if (exitCode === null) return EXIT_TOOL_ERROR
  return classifyCheckRun(input) === "tool-error" ? EXIT_TOOL_ERROR : exitCode
}
