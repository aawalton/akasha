import { exportedAs, typedAs } from "../export-name/page-export-name.module.code.ts"
import type { Value } from "../value/page-value.module.code.ts"

export type Rendering = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly importFrom: string
  readonly keys: readonly string[]
  readonly values: Value
}

const BARE = /^[A-Za-z_$][A-Za-z0-9_$]*$/

const UP = ".."

const HERE = "./"

export function importedFrom(pageAt: string, typeAt: string): string {
  const from = pageAt.split("/").slice(0, -1)
  const to = typeAt.split("/")
  let shared = 0
  while (shared < from.length && shared < to.length - 1 && from[shared] === to[shared]) shared += 1
  const up = Array.from({ length: from.length - shared }, () => UP)
  const down = to.slice(shared)
  const said = [...up, ...down].join("/")
  return said.startsWith(UP) ? said : `${HERE}${said}`
}

export function unnamedIn(keys: readonly string[], values: Value): readonly string[] {
  const named = new Set(keys)
  return Object.keys(values).filter((one) => !named.has(one))
}

export function saidAs(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(saidAs).join(",")}]`
  if (value === null || typeof value !== "object") return JSON.stringify(value)
  const held = Object.entries(value as Record<string, unknown>)
  const said = held.map(
    ([key, one]) => `${BARE.test(key) ? key : JSON.stringify(key)}:${saidAs(one)}`
  )
  return `{${said.join(",")}}`
}

export function bodyOf(given: Rendering): string {
  const named = typedAs(given.pageTypeSlug)
  const carried = given.keys.filter((one) => given.values[one] !== undefined)
  return [
    `import type { ${named} } from "${given.importFrom}"`,
    "",
    `export const ${exportedAs(given.slug)} = {`,
    ...carried.map((one) => `  ${one}: ${saidAs(given.values[one])},`),
    `} as const satisfies ${named}`,
    "",
  ].join("\n")
}
