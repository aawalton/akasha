export interface PricingRegionSource {
  platform?: string | undefined
  server?: string | undefined
}

export const DEFAULT_PRICING_PLATFORM = "PC"
export const DEFAULT_PRICING_SERVER = "NA"

export interface EffectivePricingRegion {
  platform: string
  server: string
  isDefaulted: boolean
}

export function resolvePricingRegion(profileMetadata: PricingRegionSource): EffectivePricingRegion {
  return {
    platform: profileMetadata.platform ?? DEFAULT_PRICING_PLATFORM,
    server: profileMetadata.server ?? DEFAULT_PRICING_SERVER,
    isDefaulted: profileMetadata.platform == null || profileMetadata.server == null,
  }
}

export type PricingRegionNoteKind = "none" | "defaulted" | "no-data"

export function resolvePricingRegionNote(args: {
  playerSettled: boolean
  isDefaulted: boolean
  pricing: unknown
  isLoading: boolean
  error: unknown
}): PricingRegionNoteKind {
  if (!args.playerSettled || args.isLoading) return "none"
  if (args.error != null) return "none"
  if (args.pricing == null) return "no-data"
  return args.isDefaulted ? "defaulted" : "none"
}
