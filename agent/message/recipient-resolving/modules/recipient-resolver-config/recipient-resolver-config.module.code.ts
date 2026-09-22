import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const SEC_MS = 1000

const RECIPIENT_RESOLVER_ENV = {
  tickSec: "RECIPIENT_RESOLVER_TICK_SEC",
  reviveTimeoutSec: "RECIPIENT_RESOLVER_REVIVE_TIMEOUT_SEC",
} as const

const DEFAULT_TICK_SEC = 15

const DEFAULT_REVIVE_TIMEOUT_SEC = 120

const positiveNumber = SHAPE.coerce.number().positive().finite()

function resolvePositiveNumberEnv(name: string, fallback: number): number {
  const parsed = positiveNumber.safeParse(process.env[name])
  return parsed.success ? parsed.data : fallback
}

export interface RecipientResolverConfig {
  readonly tickMs: number
  readonly reviveTimeoutMs: number
}

export function resolveRecipientResolverConfig(): RecipientResolverConfig {
  const tickSec = resolvePositiveNumberEnv(RECIPIENT_RESOLVER_ENV.tickSec, DEFAULT_TICK_SEC)
  const reviveTimeoutSec = resolvePositiveNumberEnv(
    RECIPIENT_RESOLVER_ENV.reviveTimeoutSec,
    DEFAULT_REVIVE_TIMEOUT_SEC
  )
  return {
    tickMs: tickSec * SEC_MS,
    reviveTimeoutMs: reviveTimeoutSec * SEC_MS,
  }
}

export function recipientResolverConfigBanner(config: RecipientResolverConfig): string {
  return `recipient-resolver: tick=${config.tickMs / SEC_MS}s revive-timeout=${config.reviveTimeoutMs / SEC_MS}s`
}
