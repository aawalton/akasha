import { existsSync } from "node:fs"
import { join } from "node:path"
import type { ProcLivenessEntry } from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import { scanProcEntries } from "akasha/agent/modules/proc-scan/proc-scan.module.code.ts"
import {
  type Judged,
  judgedOver,
  pagesIn,
  STALE,
  seenIn,
} from "akasha/agent/subagent/modules/census/subagent-census.module.code.ts"
import { pathIn } from "akasha/agent/subagent/modules/page-naming/subagent-page-naming.module.code.ts"
import {
  stoppedBeside,
  took,
} from "akasha/agent/subagent/modules/presence/subagent-presence.module.code.ts"
import { stoppedAmong } from "akasha/agent/subagent/modules/stale-taking/subagent-stale-taking.module.code.ts"
import { subagentStopped } from "akasha/agent/subagent/properties/subagent-stopped.boolean-property.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { subagent } from "akasha/command/argument/pages/subagent.argument.ts"
import {
  DATA,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { agentSubagentStop as page } from "akasha/command/pages/agent/subagent-stop/agent-subagent-stop.command.ts"
import {
  type OwnIds,
  type RunningSaid,
  transcriptsSay,
} from "akasha/command/pages/agent/subagent-sweep/agent-subagent-sweep.command.code.ts"
import { mergeUncommitted } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"

const STOPPED = subagentStopped.propertySlug

const REACHES =
  "the stop reaches it at its next model turn, and one inside a tool call finishes that call first"

const NONE: OwnIds = { running: new Set(), ended: new Set(), outlived: new Set() }

async function judgedFor(
  root: string,
  at: string,
  entries: readonly ProcLivenessEntry[],
  baseDir: string | undefined,
  said: RunningSaid
): Promise<Judged | null> {
  const pages = pagesIn(root)
  if (!pages.some((one) => one.path === at)) return null
  let own: OwnIds = NONE
  try {
    own = await said(pages)
  } catch {
    own = NONE
  }
  const stopped = stoppedAmong(root, pages)
  const seen = seenIn(entries, baseDir, own.running, own.ended, own.outlived, stopped)
  return judgedOver(pages, seen).find((one) => one.page.path === at) ?? null
}

async function takenAway(
  root: string,
  name: string,
  judged: Judged,
  landing: Landing
): Promise<Answer> {
  const done: string[] = []
  const went = await took(root, judged.page.seatName, judged.page.own, done, landing)
  if ("why" in went) {
    return told([...done, `\`${name}\` is stopped, and its page stays — ${went.why}`])
  }
  return told([...done, `\`${name}\` is stopped and its page went: ${judged.why}`])
}

export async function agentSubagentStop(
  argv: readonly string[],
  given: Given,
  entries: readonly ProcLivenessEntry[] = scanProcEntries().entries,
  baseDir?: string,
  said: RunningSaid = transcriptsSay,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [subagent])
  if ("refused" in read) return refusedBy(read.refused)
  const name = read.taken.subagent
  const at = pathIn(given.root, name)
  if (!existsSync(join(given.root, at))) {
    return refused(
      `no subagent named \`${name}\` holds a page under \`${given.root}\`, so there is nothing to stop`,
      DATA
    )
  }
  if (stoppedBeside(given.root, at)) {
    return told([`\`${name}\` is stopped already, so nothing was written`])
  }
  const judged = await judgedFor(given.root, at, entries, baseDir, said)
  mergeUncommitted(given.root, at, { [STOPPED]: true })
  if (judged === null || judged.verdict !== STALE) {
    return told([`\`${name}\` is stopped: ${REACHES}`])
  }
  return takenAway(given.root, name, judged, landing)
}
