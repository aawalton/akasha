import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"

export type GlobalTable = Record<string, unknown>

export function asTextureControl(value: unknown): TextureControl {
  return value as TextureControl
}
