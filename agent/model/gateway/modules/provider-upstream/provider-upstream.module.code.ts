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

export type Fallback = {
  readonly account: string
  readonly upstream: Upstream
  readonly model: string | null
}

export function askedOf(bodyBuffer: ArrayBuffer | null, model: string | null): ArrayBuffer | null {
  if (bodyBuffer === null || model === null) return bodyBuffer
  return rewrittenToModel(bodyBuffer, model) ?? bodyBuffer
}

export type FallbackRead = () => Fallback | null

export function anthropicBaseIn(root: string): string | undefined {
  try {
    return apiBaseIn(root, ANTHROPIC) ?? undefined
  } catch {
    return undefined
  }
}

export function fallbackIn(root: string, secretsRead: SecretsRead): Fallback | null {
  try {
    const one = everyAccountOfIn(root, FALLBACK)[0]
    if (one === undefined) return null
    const base = apiBaseIn(root, FALLBACK)
    if (base === null) return null
    const key = apiKeyIn(root, one.slug, secretsRead)
    if (key === null) return null
    return {
      account: one.slug,
      upstream: keyedUpstream(base, key),
      model: providerModelIn(root, FALLBACK),
    }
  } catch {
    return null
  }
}

export function fallbackReadIn(root: string, secretsRead: SecretsRead): FallbackRead {
  let held: Fallback | null = null
  return () => {
    if (held !== null) return held
    held = fallbackIn(root, secretsRead)
    return held
  }
}
