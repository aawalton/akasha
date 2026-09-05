import { execFile } from "node:child_process"
import * as fs from "node:fs"
import * as os from "node:os"
import * as path from "node:path"
import { promisify } from "node:util"
import { answerBytesSaid } from "@akasha/command-system/answer-bytes"
import { isServed } from "@akasha/command-system/commands-served"
import {
  askServed,
  type Serving,
  servingFrom,
} from "../command-server-client/command-server-client.module.code.ts"

const execFileP = promisify(execFile)

export function akashaRoot(): string {
  const stated = process.env.AKASHA_ROOT
  return stated === undefined || stated === "" ? path.join(os.homedir(), "repos", "akasha") : stated
}

export function opsPath(): string {
  return path.join(akashaRoot(), "dotfiles", "bin", "ops")
}

const COMMANDS_AT = "commands"

const SERVER_AT = "command-system/command-server/command-server.module.code.ts"

export function commandPath(command: string): string {
  return path.join(akashaRoot(), COMMANDS_AT, command, `${command}.command.code.ts`)
}

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
  readonly maxBuffer: number
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

async function run(
  what: string,
  file: string,
  args: readonly string[],
  options: HarnessCallOptions
): Promise<string> {
  const { stdout, stderr } = await execFileP(file, [...args], {
    env: harnessEnvironment(),
    timeout: options.timeout,
    maxBuffer: options.maxBuffer,
  })
  return whole(what, stdout, stderr)
}

export async function runOps(
  args: readonly string[],
  options: HarnessCallOptions
): Promise<string> {
  return run("ops", opsPath(), args, options)
}

export function repositoryPath(repo: string): string {
  try {
    return fs.realpathSync(repo)
  } catch {
    return repo
  }
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

const CARRIED = /\.(?:command|module)\.code\.ts$/

export function commandNamed(commandFile: string): string {
  const named = path.basename(commandFile)
  return CARRIED.test(named) ? named.replace(CARRIED, "") : named.replace(/\.ts$/, "")
}

export async function runCommand(
  commandFile: string,
  args: readonly string[],
  options: HarnessCallOptions
): Promise<string> {
  const command = commandNamed(commandFile)
  if (isServed(command) && commandFile === commandPath(command)) {
    const answer = await askServed(servedClient(), command, args, options.timeout)
    if (answer.code !== 0) {
      throw new Error(`${command} exited ${answer.code}: ${answer.stderr.trim()}`)
    }
    return whole(command, answer.stdout, answer.stderr)
  }
  return run(command, path.join(bunDirectory(), "bun"), [commandFile, ...args], options)
}

export function unreachableMessage(error: unknown): string {
  const detail = error instanceof Error ? error.message : String(error)
  return `Cannot reach the harness: ${detail.trim()}`
}
