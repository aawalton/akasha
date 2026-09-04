import type { Answer } from "@akasha/command-system/calling"
import { createAscJwtSource, fetchLatestBuild, resolveAppId } from "@akasha/mobile-cli/asc-client"
import type { MobileApp } from "@akasha/mobile-cli/mobile-app"
import {
  classifyProcessingState,
  describeProcessingFailure,
  POLL_INTERVAL_MS,
  POLL_TIMEOUT_MS,
  pollBuildUntilTerminal,
  processingFailureFor,
} from "@akasha/mobile-cli/testflight-poll"
import {
  APP_SAID,
  answering,
  appIn,
  flagsAloneIn,
  OPERATIONAL,
  type Reading,
  refusedBy,
  told,
  wordsIn,
} from "../mobile-answering/mobile-answering.module.code.ts"

const WAIT = "--wait"

const VALUED = [APP_SAID]

const SWITCHES = [WAIT]

const A_SECOND = 1_000

const A_MINUTE = 60_000

export type Read = {
  readonly app: MobileApp
  readonly wait: boolean
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, VALUED, SWITCHES)
  if ("refused" in said) return said
  const loose = flagsAloneIn(said)
  if (loose.length > 0) return { refused: loose }
  const app = appIn(said)
  if ("refused" in app) return app
  return { app, wait: said.flags.has(WAIT) }
}

async function waited(read: Read, appId: string, jwt: () => Promise<string>): Promise<Answer> {
  const report = [
    `asking App Store Connect about ${read.app.bundleId} every ${POLL_INTERVAL_MS / A_SECOND}s ` +
      `for up to ${POLL_TIMEOUT_MS / A_MINUTE} minutes`,
  ]
  const outcome = await pollBuildUntilTerminal({
    fetchLatest: async () => await fetchLatestBuild(appId, await jwt()),
    isTarget: () => true,
    sleep: async (ms) => await new Promise((keep) => setTimeout(keep, ms)),
    now: () => Date.now(),
    intervalMs: POLL_INTERVAL_MS,
    timeoutMs: POLL_TIMEOUT_MS,
    onTick: (message) => report.push(message),
  })
  if (outcome.kind === "valid") {
    report.push(`valid\tbuild ${outcome.build.version} is ready to install`)
    return told(report)
  }
  if (outcome.kind === "failed") {
    return { report, refusals: [describeProcessingFailure(outcome.failure)], code: OPERATIONAL }
  }
  return {
    report,
    refusals: [
      `no build reached a terminal state in ${POLL_TIMEOUT_MS / A_MINUTE} minutes ` +
        `(last state: ${outcome.lastState ?? "no build visible"}), so it is still processing`,
    ],
    code: OPERATIONAL,
  }
}

async function stated(read: Read): Promise<Answer> {
  const jwt = createAscJwtSource()
  const appId = await resolveAppId(read.app.bundleId, await jwt())
  if (read.wait) return await waited(read, appId, jwt)

  const build = await fetchLatestBuild(appId, await jwt())
  if (build === null) {
    return told([`none\tno ${read.app.bundleId} build has been uploaded to App Store Connect`])
  }
  const classification = classifyProcessingState(build.processingState)
  if (classification === "failed") {
    return {
      report: [],
      refusals: [describeProcessingFailure(processingFailureFor(build))],
      code: OPERATIONAL,
    }
  }
  if (classification === "valid") {
    return told([`valid\tbuild ${build.version} is ready to install`])
  }
  return told([
    `processing\tbuild ${build.version} is ${build.processingState}, and \`${WAIT}\` holds until it is not`,
  ])
}

export async function mobileTestflightStatus(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => await stated(read))
}
