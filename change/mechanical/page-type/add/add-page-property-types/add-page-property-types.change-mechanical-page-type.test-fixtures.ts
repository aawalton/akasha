import {
  ledgerAt,
  type Reaching,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { filesOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

export const KIND = "boolean-property"

export const AT = "thrumming/moots/mortal.boolean-property.ts"

export const TO = "thrumming/moots/mortal.boolean-property.types.ts"

export const APART = "apart/moots/mortal.boolean-property.ts"

export const APART_TO = "apart/moots/mortal.boolean-property.types.ts"

export const USES = "thrumming/moots/moot.moot.code.ts"

export const HELD = "export type Mortal = boolean"

export const DECLARED = `export const mortal = {
  type: "${KIND}",
  slug: "mortal",
  definition: "whether a moot dies",
} as const
`

const BODY = `${DECLARED}
${HELD}
`

export const USING = `import type { Mortal } from "./mortal.boolean-property.ts"

export type Wraps = {
  readonly mortal: Mortal
}
`

export type Files = Readonly<Record<string, string>>

export const BODIES: Files = { [AT]: BODY }

export const BOTH: Files = { [AT]: BODY, [APART]: BODY }

export type Given = {
  readonly bodies: Files
  readonly paths: readonly string[]
  readonly kinds?: readonly string[]
  readonly stated?: Readonly<Record<string, unknown>>
  readonly importers?: readonly string[]
}

export function worldFor(given: Given, reaching: Reaching): World {
  const index = {
    kindsUnder: () => new Set(given.kinds ?? [KIND]),
    everyOfType: () => given.paths.map((path) => ({ path })),
    pageByPath: () => ({
      type: `${pageType.slug}/${KIND}`,
      slug: "mortal",
      ...(given.stated ?? {}),
    }),
    importersOf: () => given.importers ?? [],
    fileKeysAt: () => new Map(),
    manifestsBeside: () => [],
    entryShapesAt: () => new Set<string>(),
  } as never
  const ledger = ledgerAt("/nowhere", filesOf(given.bodies), reaching)
  return Object.defineProperty(ledger, "index", { value: index })
}
