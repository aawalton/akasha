import {
  linesOf,
  readingsIn,
} from "../../../agents-system/claude-account/claude-account-measuring/claude-account-measuring.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"

const CLAUDE_ACCOUNTS = "claude-accounts"

export function measure(argv: readonly string[], given: Given): Answer {
  const subject = argv[0]
  if (subject === undefined) {
    return {
      report: [],
      refusals: [
        `${given.calledAs} names what to measure, and nothing followed it — it takes \`${CLAUDE_ACCOUNTS}\``,
      ],
      code: 1,
    }
  }
  if (argv.length > 1) {
    return {
      report: [],
      refusals: [`one call measures one subject, and \`${argv.join(" ")}\` names more than one`],
      code: 1,
    }
  }
  if (subject !== CLAUDE_ACCOUNTS) {
    return {
      report: [],
      refusals: [`\`${subject}\` is nothing this measures — it measures \`${CLAUDE_ACCOUNTS}\``],
      code: 1,
    }
  }
  const readings = readingsIn(given.root)
  if (readings.length === 0) {
    return {
      report: [],
      refusals: [
        `no claude-account page stands under \`${given.root}\`, and every account holding a page ` +
          `is answered, so a fleet of none is the corpus being wrong rather than a fleet`,
      ],
      code: 2,
    }
  }
  return { report: [...linesOf(readings, Date.now())], refusals: [], code: 0 }
}
