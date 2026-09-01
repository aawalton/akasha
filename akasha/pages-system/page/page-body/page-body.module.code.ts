import { exportedAs, typedAs } from "../page-export-name/page-export-name.module.code.ts"
import type { Value } from "../page-value/page-value.module.code.ts"

export type Rendering = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly importFrom: string
  readonly keys: readonly string[]
  readonly values: Value
}

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

export function bodyOf(given: Rendering): string {
  const named = typedAs(given.pageTypeSlug)
  const carried = given.keys.filter((one) => given.values[one] !== undefined)
  return [
    `import type { ${named} } from "${given.importFrom}"`,
    "",
    `export const ${exportedAs(given.slug)} = {`,
    ...carried.map((one) => `  ${one}: ${JSON.stringify(given.values[one])},`),
    `} as const satisfies ${named}`,
    "",
  ].join("\n")
}
