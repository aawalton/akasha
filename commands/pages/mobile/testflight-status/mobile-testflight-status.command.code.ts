import {
  createAscJwtSource,
  fetchLatestBuild,
  resolveAppId,
} from "akasha/alan/harness/mobile-cli/asc-client/asc-client.module.code.ts"
import type { MobileApp } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import { appIn } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import {
  classifyProcessingState,
  describeProcessingFailure,
  POLL_INTERVAL_MS,
  POLL_TIMEOUT_MS,
  pollBuildUntilTerminal,
  processingFailureFor,
} from "akasha/alan/harness/mobile-cli/testflight-poll/testflight-poll.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { app } from "akasha/commands/arguments/pages/app.argument.ts"
import { wait } from "akasha/commands/arguments/pages/wait.argument.ts"
import {
  answeredWith,
  answering,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mobileTestflightStatus as page } from "akasha/commands/pages/mobile/testflight-status/mobile-testflight-status.command.ts"

const A_SECOND = 1_000

const A_MINUTE = 60_000

export type Read = {
  readonly app: MobileApp
  readonly wait: boolean
}

async function waited(
  read: Read,
  appId: string,
  jwt: () => Promise<string>,
  done: string[]
): Promise<Answer> {
  done.push(
    `asking App Store Connect about ${read.app.bundleId} every ${POLL_INTERVAL_MS / A_SECOND}s ` +
      `for up to ${POLL_TIMEOUT_MS / A_MINUTE} minutes`
  )
  const outcome = await pollBuildUntilTerminal({
    fetchLatest: async () => await fetchLatestBuild(appId, await jwt()),
    isTarget: () => true,
    sleep: async (ms) => await new Promise((keep) => setTimeout(keep, ms)),
    now: () => Date.now(),
    intervalMs: POLL_INTERVAL_MS,
    timeoutMs: POLL_TIMEOUT_MS,
    onTick: (message) => done.push(message),
  })
  if (outcome.kind === "valid") {
    done.push(`valid\tbuild ${outcome.build.version} is ready to install`)
    return told(done)
  }
  if (outcome.kind === "failed") {
    return answeredWith(done, [describeProcessingFailure(outcome.failure)], OPERATIONAL)
  }
  return answeredWith(
    done,
    [
      `no build reached a terminal state in ${POLL_TIMEOUT_MS / A_MINUTE} minutes ` +
        `(last state: ${outcome.lastState ?? "no build visible"}), so it is still processing`,
    ],
    OPERATIONAL
  )
}

async function stated(read: Read, done: string[]): Promise<Answer> {
  const jwt = createAscJwtSource()
  const appId = await resolveAppId(read.app.bundleId, await jwt())
  if (read.wait) return await waited(read, appId, jwt, done)

  const build = await fetchLatestBuild(appId, await jwt())
  if (build === null) {
    return told([`none\tno ${read.app.bundleId} build has been uploaded to App Store Connect`])
  }
  const classification = classifyProcessingState(build.processingState)
  if (classification === "failed") {
    return refusedBy([describeProcessingFailure(processingFailureFor(build))], OPERATIONAL)
  }
  if (classification === "valid") {
    return told([`valid\tbuild ${build.version} is ready to install`])
  }
  return told([
    `processing\tbuild ${build.version} is ${build.processingState}, ` +
      `and \`${wait.said}\` holds until it is not`,
  ])
}

export async function mobileTestflightStatus(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const said = takenFor(argv, given.calledAs, page, [app, wait])
  if ("refused" in said) return refusedBy(said.refused)
  const held = appIn(said.taken.app)
  if ("refused" in held) return refusedBy(held.refused)
  const read: Read = { app: held, wait: said.taken.wait }
  return await answering(async (done) => await stated(read, done))
}
