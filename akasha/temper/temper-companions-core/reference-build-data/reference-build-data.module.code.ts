import type { BuildHash } from "@akasha/temper-formula-framework/branded-id"
import { buildHash } from "@akasha/temper-formula-framework/branded-id"
import { computeReferenceBaseline } from "../companion-support-baseline/companion-support-baseline.module.code.ts"
import type { ReferenceBaseline } from "../companion-support-types/companion-support-types.module.code.ts"
import type { CompanionState } from "../companion-types/companion-types.module.code.ts"

const REFERENCE_BUILD_CODE = "AjADh2kaRpGkaRpGkJDw8U8AMx1p3WrQgA"

type CompanionDecoder = (hash: BuildHash) => CompanionState | null

let _decoder: CompanionDecoder | undefined

export function registerCompanionDecoder(decoder: CompanionDecoder): undefined {
  _decoder = decoder
}

function once<T>(factory: () => T): () => T {
  let cell: { value: T } | undefined
  return () => {
    if (cell === undefined) {
      cell = { value: factory() }
    }
    return cell.value
  }
}

const getReferenceBuild = once((): CompanionState => {
  if (!_decoder)
    throw new Error(
      "Companion decoder not registered — import @akasha/temper-companion-codec/companion-codec to trigger registerCompanionDecoder()"
    )
  const decoded = _decoder(buildHash(REFERENCE_BUILD_CODE))
  if (!decoded) throw new Error("Failed to decode reference build")
  return decoded
})

export const getReferenceBaseline = once(
  (): ReferenceBaseline => computeReferenceBaseline(getReferenceBuild())
)
