import { linesOf, readingsIn } from "@akasha/agents-system/claude-account-measuring"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import {
  akashaStandsIn,
  countsIn,
  linesOf as repoLinesOf,
} from "./repo-measuring/repo-measuring.module.code.ts"

const CLAUDE_ACCOUNTS = "claude-accounts"

const REPO = "repo"

const SUBJECTS: readonly string[] = [CLAUDE_ACCOUNTS, REPO]

function saidAsList(subjects: readonly string[]): string {
  return subjects.map((one) => `\`${one}\``).join(" or ")
}

function measureClaudeAccounts(given: Given): Answer {
  const readings = readingsIn(given.root)
  if (readings.length === 0) {
    return {
      report: [],
      refusals: [
        `no claude-account page stands under \`${given.root}\`, and every account holding a page ` +
          `is answered, so a fleet of none is the pages being wrong rather than a fleet`,
      ],
      code: 2,
    }
  }
  return { report: [...linesOf(readings, Date.now())], refusals: [], code: 0 }
}

function measureRepo(given: Given): Answer {
  if (!akashaStandsIn(given.root)) {
    return {
      report: [],
      refusals: [
        `no akasha folder stands under \`${given.root}\`, and the share is what has arrived over ` +
          "everything there is to arrive, so a checkout without one is not a migration measured " +
          "at none",
      ],
      code: 2,
    }
  }
  return { report: [...repoLinesOf(countsIn(given.root))], refusals: [], code: 0 }
}

export function measure(argv: readonly string[], given: Given): Answer {
  const subject = argv[0]
  if (subject === undefined) {
    return {
      report: [],
      refusals: [
        `${given.calledAs} names what to measure, and nothing followed it — it takes ${saidAsList(SUBJECTS)}`,
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
  if (!SUBJECTS.includes(subject)) {
    return {
      report: [],
      refusals: [`\`${subject}\` is nothing this measures — it measures ${saidAsList(SUBJECTS)}`],
      code: 1,
    }
  }
  return subject === CLAUDE_ACCOUNTS ? measureClaudeAccounts(given) : measureRepo(given)
}
