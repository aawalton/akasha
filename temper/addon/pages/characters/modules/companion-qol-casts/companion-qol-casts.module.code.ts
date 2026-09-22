import type { FcoSettings } from "akasha/temper/addon/pages/characters/modules/companion-qol-types/companion-qol-types.module.code.ts"

export function asNumber(value: unknown): number {
  return value as number
}

export function asRecord(value: unknown): Record<string, unknown> {
  return value as Record<string, unknown>
}

export function asFcoSettings(value: unknown): FcoSettings {
  return value as FcoSettings
}
