import { shape } from "@akasha/utils-narrow/shape"

const SEC_MS = 1000

export const RECIPIENT_RESOLVER_ENV = {
  tickSec: "RECIPIENT_RESOLVER_TICK_SEC",
  reviveTimeoutSec: "RECIPIENT_RESOLVER_REVIVE_TIMEOUT_SEC",
  dryRun: "RECIPIENT_RESOLVER_DRY_RUN",
} as const

const DEFAULT_TICK_SEC = 15

const DEFAULT_REVIVE_TIMEOUT_SEC = 120

const positiveNumber = shape.coerce.number().positive().finite()
const boolEnvTrue: ReadonlySet<string> = new Set(["1", "true", "yes", "on"])

function resolvePositiveNumberEnv(name: string, fallback: number): number {
  const parsed = positiveNumber.safeParse(process.env[name])
  return parsed.success ? parsed.data : fallback
}

function resolveBoolEnv(name: string): boolean {
  const parsed = shape.string().safeParse(process.env[name])
  return parsed.success && boolEnvTrue.has(parsed.data.trim().toLowerCase())
}

export interface RecipientResolverConfig {
  readonly tickMs: number
  readonly reviveTimeoutMs: number
  readonly dryRun: boolean
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
    dryRun: resolveBoolEnv(RECIPIENT_RESOLVER_ENV.dryRun),
  }
}

export function recipientResolverConfigBanner(config: RecipientResolverConfig): string {
  return `recipient-resolver: tick=${config.tickMs / SEC_MS}s revive-timeout=${config.reviveTimeoutMs / SEC_MS}s dry-run=${config.dryRun}`
}
