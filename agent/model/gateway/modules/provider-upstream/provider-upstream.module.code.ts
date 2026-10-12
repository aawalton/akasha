import {
  ANTHROPIC,
  apiKeyIn,
  everyAccountOfIn,
  type SecretsRead,
} from "akasha/agent/model/account/modules/reading/model-account-reading.module.code.ts"
import {
  keyedUpstream,
  type Upstream,
} from "akasha/agent/model/gateway/modules/forward/forward.module.code.ts"
import { rewrittenToModel } from "akasha/agent/model/gateway/modules/model-body/model-body.module.code.ts"
import { modelProvider } from "akasha/agent/model/provider/model-provider.page-type.ts"
import {
  apiBaseIn,
  providerModelIn,
} from "akasha/agent/model/provider/modules/reading/model-provider-reading.module.code.ts"
import { deepseek } from "akasha/agent/model/provider/pages/deepseek/deepseek.model-provider.ts"

const FALLBACK = `${modelProvider.slug}/${deepseek.slug}` as const

type ProviderUpstream = {
  readonly provider: string
  readonly account: string
  readonly upstream: Upstream
  readonly model: string | null
}

export function askedOf(bodyBuffer: ArrayBuffer | null, model: string | null): ArrayBuffer | null {
  if (bodyBuffer === null || model === null) return bodyBuffer
  return rewrittenToModel(bodyBuffer, model) ?? bodyBuffer
}

export type FallbackRead = () => ProviderUpstream | null

type ProviderRead = (provider: string) => ProviderUpstream | null

export function anthropicBaseIn(root: string): string | undefined {
  try {
    return apiBaseIn(root, ANTHROPIC) ?? undefined
  } catch {
    return undefined
  }
}

function upstreamIn(
  root: string,
  provider: string,
  secretsRead: SecretsRead
): ProviderUpstream | null {
  try {
    const one = everyAccountOfIn(root, provider)[0]
    if (one === undefined) return null
    const base = apiBaseIn(root, provider)
    if (base === null) return null
    const key = apiKeyIn(root, one.slug, secretsRead)
    if (key === null) return null
    return {
      provider: provider.slice(provider.lastIndexOf("/") + 1),
      account: one.slug,
      upstream: keyedUpstream(base, key),
      model: providerModelIn(root, provider),
    }
  } catch {
    return null
  }
}

function providerReadIn(root: string, secretsRead: SecretsRead): ProviderRead {
  const held = new Map<string, ProviderUpstream>()
  return (provider) => {
    const kept = held.get(provider)
    if (kept !== undefined) return kept
    const read = upstreamIn(root, provider, secretsRead)
    if (read !== null) held.set(provider, read)
    return read
  }
}

export function fallbackReadIn(root: string, secretsRead: SecretsRead): FallbackRead {
  const read = providerReadIn(root, secretsRead)
  return () => read(FALLBACK)
}
