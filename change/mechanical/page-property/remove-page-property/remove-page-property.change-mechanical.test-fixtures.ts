import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { worldOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

export const TYPE_AT = "akasha/quoin.page-type.ts"

export type Declaring = {
  readonly slug: string
  readonly kind: string
  readonly id: string
  readonly path: string
}

type Namer = { readonly path: string; readonly propertySlug: string }

const NAMERS: readonly Namer[] = [{ path: TYPE_AT, propertySlug: "parts" }]

const NO_FILES: ReadonlyMap<string, ReadonlyMap<string, string | null>> = new Map()

export type Paged = Readonly<Record<string, readonly (readonly [string, Value])[]>>

export type Under = Readonly<Record<string, readonly Declaring[]>>

type Making = {
  readonly bodies: Readonly<Record<string, string>>
  readonly values: Readonly<Record<string, Value>>
  readonly under: Under
  readonly paged: Paged
  readonly namers?: readonly Namer[]
  readonly files?: ReadonlyMap<string, ReadonlyMap<string, string | null>>
  readonly seen?: string[]
  readonly reads?: Map<string, number>
}

export function worldIn(made: Making): World {
  const held = worldOf(made.bodies)
  const reads = made.reads ?? new Map<string, number>()
  return {
    ...held,
    textOf: (path) => {
      reads.set(path, (reads.get(path) ?? 0) + 1)
      return held.textOf(path)
    },
    index: {
      pageByPath: (at: string) => made.values[at] ?? null,
      listedAt: (pageTypeSlug: string, slug: string) => {
        const found = Object.entries(made.values).find(
          ([, value]) =>
            value["type"] === `${pageType.slug}/${pageTypeSlug}` && value["slug"] === slug
        )
        return found === undefined ? [] : [{ path: found[0], id: found[1]["id"] }]
      },
      namersOf: () => made.namers ?? NAMERS,
      declaringOf: (id: string) => made.under[id] ?? [],
      kindsUnder: (slug: string) => new Set([slug]),
      valuesByPath: (slug: string) => new Map(made.paged[slug] ?? []),
      filePropertiesAt: () => made.files ?? NO_FILES,
      folderPropertiesAt: () => new Map(),
      extensionPropertiesAt: () => new Map(),
      sidecarsAt: () => new Map(),
      uncommittedFiledAt: () => new Map(),
      everyPath: () => Object.keys(made.bodies),
    } as never,
    reaching: listing(made.seen ?? []),
  }
}
