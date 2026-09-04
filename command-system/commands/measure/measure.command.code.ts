import { linesOf, readingsIn } from "@akasha/agents/claude-account-measuring"
import { notesOf, refreshAll } from "@akasha/agents/claude-account-refreshing"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import {
  linesOf as costLinesOf,
  countedIn,
  sinceOf,
  storeHere,
} from "./claude-account-costing/claude-account-costing.module.code.ts"
import {
  countsIn as pageCountsIn,
  linesOf as pageLinesOf,
} from "./page-measuring/page-measuring.module.code.ts"
import { countsIn, linesOf as repoLinesOf } from "./repo-measuring/repo-measuring.module.code.ts"

const CLAUDE_ACCOUNTS = "claude-accounts"

const REPO = "repo"

const PAGES = "pages"

const COST = "cost"

const DAYS = 30

const SUBJECTS: readonly string[] = [CLAUDE_ACCOUNTS, REPO, PAGES]

const ACTS: readonly string[] = [COST]

function saidAsList(subjects: readonly string[]): string {
  return subjects.map((one) => `\`${one}\``).join(" or ")
}

function refusing(said: string): Answer {
  return { report: [], refusals: [said], code: 1 }
}

async function measureClaudeAccounts(given: Given): Promise<Answer> {
  const notes = notesOf(await refreshAll(given.root, Date.now()))
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
  const said = [...linesOf(readings, Date.now())]
  return {
    report: notes.length === 0 ? said : [...said, "", ...notes],
    refusals: [],
    code: 0,
  }
}

function measureRepo(given: Given): Answer {
  return { report: [...repoLinesOf(countsIn(given.root))], refusals: [], code: 0 }
}

function measurePages(given: Given): Answer {
  return { report: [...pageLinesOf(pageCountsIn(given.root))], refusals: [], code: 0 }
}

function measureCost(): Answer {
  const until = Date.now()
  const counted = countedIn(storeHere(), sinceOf(until, DAYS), until)
  return { report: [...costLinesOf(counted, DAYS)], refusals: [], code: 0 }
}

export function measure(argv: readonly string[], given: Given): Answer | Promise<Answer> {
  const subject = argv[0]
  if (subject === undefined) {
    return refusing(
      `${given.calledAs} names what to measure, and nothing followed it — it takes ${saidAsList(SUBJECTS)}`
    )
  }
  if (!SUBJECTS.includes(subject)) {
    return refusing(`\`${subject}\` is nothing this measures — it measures ${saidAsList(SUBJECTS)}`)
  }
  const act = argv[1]
  if (act === undefined) {
    if (subject === CLAUDE_ACCOUNTS) return measureClaudeAccounts(given)
    return subject === REPO ? measureRepo(given) : measurePages(given)
  }
  if (argv.length > 2) {
    return refusing(
      `one call names one act, and \`${argv.slice(1).join(" ")}\` names more than one`
    )
  }
  if (subject !== CLAUDE_ACCOUNTS) {
    return refusing(`\`${subject}\` carries no act, and \`${act}\` followed it`)
  }
  if (!ACTS.includes(act)) {
    return refusing(`the act is the second word, and \`${act}\` is no act this takes`)
  }
  return measureCost()
}
