import { runChange } from "akasha/change/agent/file-content/add-property-values/add-property-values.change-agent.code.ts"
import { addPropertyValue } from "akasha/change/mechanical/file-content/add/add-property-value/add-property-value.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  NOTHING_OVER,
  type World,
  worldAt,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { knownOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Shaped } from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import {
  indexedRepo,
  pageOf,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

export const ADD = `${changeMechanicalFileContent.slug}/${addPropertyValue.slug}` as const

export const PARTS = "partSlugs"

export const CARRIER = "akasha/one/carrier.module.ts"

export const ONE = "akasha/one/one.module.ts"

const TWO = "akasha/one/two.module.ts"

export const OF_ONE = "module/one"

export const OF_TWO = "module/two"

export const OF_HELD = "module/held"

export const GONE = "akasha/one/gone.module.ts"

const BESIDE: Readonly<Record<string, string>> = {
  [CARRIER]: pageOf({
    id: "01a08000-0000-7000-8000-000000000001",
    type: `${pageType.slug}/module`,
    slug: "carrier",
    definition: "a page an indexed repository carries a list of parts on",
    code: "ts",
    partSlugs: [OF_HELD],
  }),
  "akasha/one/carrier.module.code.ts": "export const carrier = 1\n",
  [ONE]: pageOf({
    id: "01a08000-0000-7000-8000-000000000002",
    type: `${pageType.slug}/module`,
    slug: "one",
    definition: "a page an indexed repository carries to be named",
    code: "ts",
  }),
  "akasha/one/one.module.code.ts": "export const one = 1\n",
  [TWO]: pageOf({
    id: "01a08000-0000-7000-8000-000000000003",
    type: `${pageType.slug}/module`,
    slug: "two",
    definition: "a second page an indexed repository carries to be named",
    code: "ts",
  }),
  "akasha/one/two.module.code.ts": "export const two = 1\n",
}

export function repo(): string {
  return indexedRepo(BESIDE)
}

export function worldIn(root: string): World {
  return worldAt(root, textIn(root), running)
}

type Carries = {
  readonly key: string
  readonly many: boolean
  readonly pageTypeSlug?: string
}

const STATED: Value = {
  id: "01a08000-0000-7000-8000-000000000004",
  type: `${pageType.slug}/module`,
  slug: "stated",
}

export function worldSaying(carried: readonly Carries[]): World {
  return {
    root: "/nowhere",
    index: {
      knownIn: () => knownOf({ admitting: (one: string) => [one] }),
      pageByPath: () => STATED,
      propertiesIfNamed: () => carried,
      kindsUnder: (slug: string) => new Set<string>([slug]),
      valuesByPath: () => new Map<string, Value>(),
    } as never,
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
  }
}

export const HELD_AT = "held/held.domain.ts"

const HELD_ID = "01a072c8-f35d-7ffc-afc3-75b72460b059"

const HELD = { id: HELD_ID, type: `${pageType.slug}/domain`, slug: "held" } as Value

export const FOUND = [{ path: "two.command.ts", id: HELD_ID }]

export const ASKED = { at: HELD_AT, key: PARTS, value: "command/two" }

export const ASKED_LINE = `${HELD_AT} ${PARTS} command/two\n`

type Told = {
  readonly slug: string | null
  readonly target: string | null
  readonly found: readonly { readonly path: string; readonly id: string }[]
  readonly carried?: readonly Carries[] | null
}

export function worldTold(told: Told): World {
  const known: Shaped = knownOf({
    targetOf: () => told.target,
    admitting: (one: string) => [one],
    filed: () => told.found,
    slugOfKeyIn: () => told.slug,
  })
  return {
    root: "/nowhere",
    index: {
      knownIn: () => known,
      pageByPath: () => HELD,
      propertiesIfNamed: () => told.carried ?? null,
      kindsUnder: (slug: string) => new Set<string>([slug]),
      valuesByPath: () => new Map<string, Value>(),
    } as never,
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
  }
}

export const RECORD = { where: "name", is: "One", field: "aids" }

export const IN_RECORD = { at: HELD_AT, key: "directives", ...RECORD }

export const AIDS = {
  key: "aids",
  many: true,
  pagePropertySlug: "aids",
  pageTypeSlug: "text-property",
}

export function recordWorld(told: Told, fields: readonly object[]): World {
  const world = worldTold({ ...told, carried: [{ key: "directives", many: true }] })
  return {
    ...world,
    index: { ...world.index, pageAt: () => HELD, carriedIn: () => fields } as never,
  }
}

type Handing = { readonly said: Answer; readonly handed: unknown[]; readonly reached: string[] }

export async function handing(
  world: World,
  given: Readonly<Record<string, string>>
): Promise<Handing> {
  const handed: unknown[] = []
  const reached: string[] = []
  const said = await runChange(
    {
      ...world,
      reaching: (_world, at, one) => {
        reached.push(at)
        handed.push(one)
        return Promise.resolve(NOTHING_OVER)
      },
    },
    given
  )
  return { said, handed, reached }
}
