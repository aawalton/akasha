import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export type StringRecord = Record<string, unknown>

export function asStringRecord(value: unknown): StringRecord {
  return value as StringRecord
}

export function asNumber(value: unknown): number {
  return value as number
}

export function asString(value: unknown): string {
  return value as string
}

export function asSceneFragment(value: unknown): SceneFragment {
  return value as SceneFragment
}
