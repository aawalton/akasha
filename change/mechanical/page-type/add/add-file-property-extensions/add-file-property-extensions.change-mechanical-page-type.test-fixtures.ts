import {
  ledgerAt,
  type Reaching,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { filesOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

export const KIND = "file-property"

export const AT = "thrumming/moots/mask.file-property.ts"

export const APART = "apart/moots/mask.file-property.ts"

export const DEFINED = "the mask a moot wears"

function maskOf(held: string): string {
  return `export const mask = {
  type: "${KIND}",
  slug: "mask",
  definition: "${DEFINED}",
} as const

export type Mask = ${held}
`
}

const BODY = maskOf(`"svg" | "png"`)

export const LOOSE = maskOf("string")

export type Files = Readonly<Record<string, string>>

export const BODIES: Files = { [AT]: BODY }

export const BOTH: Files = { [AT]: BODY, [APART]: BODY }

export function worldFor(
  bodies: Files,
  kinds: readonly string[],
  reaching: Reaching,
  stated: Readonly<Record<string, unknown>> = {}
): World {
  const index = {
    kindsUnder: () => new Set(kinds),
    everyOfType: () => Object.keys(bodies).map((path) => ({ path })),
    pageByPath: () => ({ type: `${pageType.slug}/${KIND}`, slug: "mask", ...stated }),
  } as never
  const ledger = ledgerAt("/nowhere", filesOf(bodies), reaching)
  return Object.defineProperty(ledger, "index", { value: index })
}
