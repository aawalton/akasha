import type { Reaching, World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { worldOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

export const KIND = "computed-property"

const SLUG = "moots-left"

export const AT = `thrumming/moots/${SLUG}.${KIND}.ts`

export const CODE = `thrumming/moots/${SLUG}.${KIND}.code.ts`

export const APART = `apart/moots/${SLUG}.${KIND}.ts`

export const APART_CODE = `apart/moots/${SLUG}.${KIND}.code.ts`

export const TYPES_IMPORT = `import type { MootsLeft } from "akasha/thrumming/moots/${SLUG}.${KIND}.types.ts"`

const REPO = rootOf(import.meta.dir)

const KIND_AT = `akasha/${listedAt(REPO, "page-type", KIND)[0]?.path ?? ""}`

export const WORK_AT = `import type { Work } from "${KIND_AT}"`

export const REACHING_AT = `import type { Reach, Work } from "${KIND_AT}"`

export const BODY = `${WORK_AT}

export const work: Work<Collection, number> = () => 1
`

export const NAMED = `${WORK_AT}

export const work: Work<Collection, MootsLeft> = () => 1
`

export const LOOSE = `${WORK_AT}

export const held = 1
`

export const REACHING = `${REACHING_AT}

export const work: Work<Collection, number> = () => 1
`

type Files = Readonly<Record<string, string>>

export const BODIES: Files = { [CODE]: BODY }

export const BOTH: Files = { [CODE]: BODY, [APART_CODE]: BODY }

export type Given = {
  readonly bodies: Files
  readonly paths?: readonly string[]
  readonly kinds?: readonly string[]
  readonly slug?: string
  readonly stated?: Readonly<Record<string, unknown>>
}

export function worldFor(given: Given, reaching: Reaching): World {
  return {
    ...worldOf(given.bodies),
    index: {
      kindsUnder: () => new Set(given.kinds ?? [KIND]),
      everyOfType: () => (given.paths ?? [AT]).map((path) => ({ path })),
      pageByPath: () => ({
        type: `${pageType.slug}/${KIND}`,
        slug: given.slug ?? SLUG,
        code: "ts",
        types: "ts",
        ...(given.stated ?? {}),
      }),
    } as never,
    reaching,
  }
}
