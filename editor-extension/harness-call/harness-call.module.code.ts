import * as fs from "node:fs"
import * as os from "node:os"
import * as path from "node:path"
import { answerBytesSaid } from "../../commands/modules/answer-bytes/answer-bytes.module.code.ts"
import {
  askServed,
  type Serving,
  servingFrom,
} from "../command-server-client/command-server-client.module.code.ts"

export function akashaRoot(): string {
  const stated = process.env.AKASHA_ROOT
  return stated === undefined || stated === "" ? path.join(os.homedir(), "repos", "akasha") : stated
}

const SERVER_AT = "editor-extension/command-server/command-server.module.code.ts"

export function serverPath(): string {
  return path.join(akashaRoot(), SERVER_AT)
}

const BUN_DIRECTORIES = [path.join(os.homedir(), ".bun", "bin")]

export class HarnessUnreachableError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "HarnessUnreachableError"
  }
}

function bunDirectory(): string {
  for (const directory of BUN_DIRECTORIES) {
    if (fs.existsSync(path.join(directory, "bun"))) {
      return directory
    }
  }
  throw new HarnessUnreachableError(
    `bun is not installed in any of ${BUN_DIRECTORIES.join(", ")}, and every harness call needs it`
  )
}

export function harnessEnvironment(): NodeJS.ProcessEnv {
  const inherited = process.env.PATH ?? ""
  const bun = bunDirectory()
  return {
    ...process.env,
    PATH: inherited === "" ? bun : `${bun}${path.delimiter}${inherited}`,
  }
}

export interface HarnessCallOptions {
  readonly timeout: number
}

export class HarnessShortAnswerError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "HarnessShortAnswerError"
  }
}

function whole(what: string, stdout: string, stderr: string): string {
  const said = answerBytesSaid(stderr)
  if (said === null) {
    return stdout
  }
  const arrived = Buffer.byteLength(stdout, "utf8")
  if (arrived !== said) {
    throw new HarnessShortAnswerError(
      `${what} said its answer is ${said} bytes and ${arrived} arrived, so this is not the whole answer`
    )
  }
  return stdout
}

const SERVER_START_TIMEOUT_MS = 15_000

let served: Serving | undefined

let noise: ((text: string) => void) | undefined

export function commandServerHeard(say: (text: string) => void): undefined {
  noise = say
  return undefined
}

function servedClient(): Serving {
  if (served === undefined) {
    served = servingFrom({
      bun: path.join(bunDirectory(), "bun"),
      serverFile: serverPath(),
      env: harnessEnvironment(),
      startTimeoutMs: SERVER_START_TIMEOUT_MS,
      onNoise: (text) => noise?.(text),
    })
  }
  return served
}

export function disposeCommandServer(): undefined {
  served?.dispose()
  served = undefined
  return undefined
}

export async function callHarness(
  module: string,
  exported: string,
  args: readonly string[],
  options: HarnessCallOptions
): Promise<string> {
  const what = `${module}#${exported}`
  const answer = await askServed(servedClient(), module, exported, args, options.timeout)
  if (answer.code !== 0) {
    throw new Error(`${what} exited ${answer.code}: ${answer.stderr.trim()}`)
  }
  return whole(what, answer.stdout, answer.stderr)
}
