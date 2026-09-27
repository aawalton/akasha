import {
  type CompanionCatalog,
  companionCatalog,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import {
  type CompanionMetricCatalog,
  companionMetrics,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-metrics/companion-metrics.module.code.ts"
import { computeReferenceBaseline } from "akasha/temper/catalog/companion/companions-core/modules/companion-support-baseline/companion-support-baseline.module.code.ts"
import type { ReferenceBaseline } from "akasha/temper/catalog/companion/companions-core/modules/companion-support-types/companion-support-types.module.code.ts"
import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import type { BuildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"

const REFERENCE_BUILD_CODE = "AjADh2kaRpGkaRpGkJDw8U8AMx1p3WrQgA"

type CompanionDecoder = (hash: BuildHash) => CompanionState | null

let _decoder: CompanionDecoder | undefined

export function registerCompanionDecoder(decoder: CompanionDecoder): undefined {
  _decoder = decoder
}

const BUILDS = new WeakMap<CompanionCatalog, CompanionState>()

function getReferenceBuild(): CompanionState {
  const catalog = companionCatalog()
  const already = BUILDS.get(catalog)
  if (already !== undefined) return already
  if (!_decoder)
    throw new Error(
      "Companion decoder not registered — import @akasha/temper-companion-codec/companion-codec to trigger registerCompanionDecoder()"
    )
  const decoded = _decoder(buildHash(REFERENCE_BUILD_CODE))
  if (!decoded) throw new Error("Failed to decode reference build")
  BUILDS.set(catalog, decoded)
  return decoded
}

const BASELINES = new WeakMap<
  CompanionCatalog,
  WeakMap<CompanionMetricCatalog, ReferenceBaseline>
>()

function baselinesFor(
  catalog: CompanionCatalog
): WeakMap<CompanionMetricCatalog, ReferenceBaseline> {
  const kept = BASELINES.get(catalog)
  if (kept !== undefined) return kept
  const made = new WeakMap<CompanionMetricCatalog, ReferenceBaseline>()
  BASELINES.set(catalog, made)
  return made
}

export function getReferenceBaseline(): ReferenceBaseline {
  const byMetrics = baselinesFor(companionCatalog())
  const metrics = companionMetrics()
  const already = byMetrics.get(metrics)
  if (already !== undefined) return already
  const worked = computeReferenceBaseline(getReferenceBuild())
  byMetrics.set(metrics, worked)
  return worked
}
