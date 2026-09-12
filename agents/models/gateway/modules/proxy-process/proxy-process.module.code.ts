import {
  type OAuthProxyBootEnv,
  parseBootEnv,
} from "akasha/agents/models/gateway/modules/parse-boot-env/parse-boot-env.module.code.ts"
import type {
  OAuthProxy,
  StartOAuthProxyOptions,
} from "akasha/agents/models/gateway/modules/proxy-start/proxy-start.module.code.ts"
import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const LOG_PREFIX = "[oauth-proxy]"

const BOOT_REFUSED_CODE = 1

const SHUT_DOWN_CODE = 0

const SIGNALS = ["SIGTERM", "SIGINT"] as const

export type ProxyStateToWrite = {
  readonly pid: number
  readonly port: number
  readonly oauthProxyVersion: string
}

export type ProcessDoors = {
  readonly env: NodeJS.ProcessEnv
  readonly root: string
  readonly pid: number
  readonly socketPathFor: (agentId: string) => string
  readonly consoleTo: (logDir: string, agentId: string) => undefined
  readonly started: (opts: StartOAuthProxyOptions) => OAuthProxy
  readonly stateWritten: (agentId: string, state: ProxyStateToWrite) => undefined
  readonly stateCleared: (agentId: string) => undefined
  readonly flushed: () => Promise<undefined>
  readonly printed: (line: string) => undefined
  readonly refused: (line: string) => undefined
  readonly threw: (line: string, thrown: unknown) => undefined
  readonly signalled: (signal: string, taken: () => Promise<undefined>) => undefined
  readonly exited: (code: number) => undefined
}

function guarded(doors: ProcessDoors, line: string, work: () => undefined): undefined {
  try {
    work()
  } catch (thrown) {
    doors.threw(line, saidBy(thrown))
  }
}

function optionsFor(env: OAuthProxyBootEnv, doors: ProcessDoors): StartOAuthProxyOptions {
  return {
    port: env.port,
    root: doors.root,
    logPrefix: LOG_PREFIX,
    getLogDir: () => env.logDir,
    upstreamIdleTimeoutMs: env.upstreamIdleTimeoutMs,
    downstreamKeepaliveMs: env.downstreamKeepaliveMs,
    unixSocketPath: doors.socketPathFor(env.agentId),
  }
}

export function runGatewayProcess(doors: ProcessDoors): undefined {
  let env: OAuthProxyBootEnv
  try {
    env = parseBootEnv(doors.env)
  } catch (thrown) {
    doors.refused(`${saidBy(thrown)}\n`)
    doors.exited(BOOT_REFUSED_CODE)
    return
  }

  doors.consoleTo(env.logDir, env.agentId)

  const proxy = doors.started(optionsFor(env, doors))

  doors.stateWritten(env.agentId, {
    pid: doors.pid,
    port: proxy.port,
    oauthProxyVersion: env.oauthProxyVersion,
  })
  doors.printed(`${proxy.port}\n`)

  let goingDown = false
  const taken = async (signal: string): Promise<undefined> => {
    if (goingDown) return
    goingDown = true
    guarded(doors, `${LOG_PREFIX} the flush threw on ${signal}:`, () => {
      proxy.flushAll(signal)
    })
    guarded(doors, `${LOG_PREFIX} the stop threw on ${signal}:`, () => {
      proxy.stop()
    })
    guarded(doors, `${LOG_PREFIX} clearing the proxy state threw on ${signal}:`, () => {
      doors.stateCleared(env.agentId)
    })
    try {
      await doors.flushed()
    } catch (thrown) {
      doors.threw(`${LOG_PREFIX} the transport wait threw on ${signal}:`, saidBy(thrown))
    }
    doors.exited(SHUT_DOWN_CODE)
  }

  for (const signal of SIGNALS) doors.signalled(signal, () => taken(signal))
}
