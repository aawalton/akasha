import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { agentId } from "akasha/command/argument/pages/agent-id.argument.ts"
import { gatewayLogDir } from "akasha/command/argument/pages/gateway-log-dir.argument.ts"
import { gatewayPort } from "akasha/command/argument/pages/gateway-port.argument.ts"
import { keep } from "akasha/command/argument/pages/keep.argument.ts"
import { registrationAccount } from "akasha/command/argument/pages/registration-account.argument.ts"
import { seconds } from "akasha/command/argument/pages/seconds.argument.ts"
import { version } from "akasha/command/argument/pages/version.argument.ts"
import {
  answering,
  keeping,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { modelGatewayStart as page } from "akasha/command/pages/model/gateway/start/model-gateway-start.command.ts"
import {
  type Asked,
  agentIdFor,
  NAMED_ACCOUNT,
  NAMED_VERSION,
  PORT_BUDGET_MS,
  RUN_SEAMS,
  type RunSeams,
  saidOf,
  startedOn,
} from "akasha/command/pages/model/gateway/start/modules/gateway-run/gateway-run.module.code.ts"

const MS = 1000

const HIGHEST_PORT = 65535

type Taken = {
  readonly agentId?: string
  readonly gatewayLogDir?: string
  readonly gatewayPort?: number
  readonly registrationAccount?: string
  readonly version?: string
  readonly keep: boolean
  readonly seconds?: number
}

export function wrongIn(taken: Taken): readonly string[] {
  const wrong: string[] = []
  const port = taken.gatewayPort
  if (port !== undefined && port > HIGHEST_PORT) {
    wrong.push(`\`${gatewayPort.said} ${String(port)}\` is over ${String(HIGHEST_PORT)}`)
  }
  if (taken.registrationAccount === "") {
    wrong.push(`\`${registrationAccount.said}\` takes a name and an empty one came`)
  }
  if (taken.version === "") {
    wrong.push(`\`${version.said}\` takes a name and an empty one came`)
  }
  return wrong
}

function askedOf(taken: Taken, at: number, salt: number): Asked {
  return {
    agentId: taken.agentId ?? agentIdFor(at, salt),
    logDir: taken.gatewayLogDir ?? null,
    port: taken.gatewayPort ?? 0,
    account: taken.registrationAccount ?? NAMED_ACCOUNT,
    version: taken.version ?? NAMED_VERSION,
    keep: taken.keep,
    budgetMs: taken.seconds === undefined ? PORT_BUDGET_MS : taken.seconds * MS,
  }
}

export async function modelGatewayStart(
  argv: readonly string[],
  given: Given,
  seams: RunSeams = RUN_SEAMS
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [
    agentId,
    gatewayLogDir,
    gatewayPort,
    registrationAccount,
    version,
    keep,
    seconds,
  ])
  if ("refused" in read) return refusedBy([...read.refused])
  const wrong = wrongIn(read.taken)
  if (wrong.length > 0) return refusedBy(wrong)
  const asked = askedOf(read.taken, Date.now(), Math.floor(Math.random() * 1_000_000))
  return await answering(async (done) => {
    const started = await startedOn(asked, seams, done)
    if (typeof started === "string") {
      return keeping(done, refusedBy([started], OPERATIONAL))
    }
    return told([...saidOf(started)])
  })
}
