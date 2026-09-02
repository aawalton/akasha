import type { TextureFn } from "../notification-types/notification-types.module.code.ts"

export type GlobalTable = Record<string, unknown>

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export function asString(value: unknown): string {
  return value as string
}

export function asTextureFn(value: unknown): TextureFn {
  return value as TextureFn
}

export function asTextureControl(value: unknown): TextureControl {
  return value as TextureControl
}

export function asLabelControl(value: unknown): LabelControl {
  return value as LabelControl
}
