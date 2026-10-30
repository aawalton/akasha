import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  indexedRepo,
  pageOf,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import {
  type Asked,
  asking,
  type Query,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

export const root = rootOf(import.meta.dir)

export const GAP_AT = "domain/decision-kind/pages/gap.decision-kind.ts"

export function rowsOf(asked: Asked): readonly Record<string, unknown>[] {
  if ("refused" in asked) throw new Error(`refused: ${asked.refused}`)
  return asked.rows
}

export function slugsOf(asked: Asked): readonly unknown[] {
  return rowsOf(asked).map((one) => one.slug)
}

export function over(where: unknown): Asked {
  return asking(root, {
    pageTypeSlug: "decision-kind",
    where: where as Query["where"],
    keys: ["slug"],
  })
}

export function persona(query: Omit<Query, "pageTypeSlug">): Asked {
  return asking(root, { pageTypeSlug: "persona", ...query })
}

export function levels(where: Query["where"]): readonly unknown[] {
  return slugsOf(persona({ where, keys: ["slug"] }))
}

export function kinds(where?: Query["where"]): readonly unknown[] {
  return slugsOf(asking(root, { pageTypeSlug: "decision-kind", where, keys: ["slug"] }))
}

export const COLLECTIONS = rowsOf(
  asking(root, {
    pageTypeSlug: "collection",
    where: { slug: { in: ["a-thousand-li-the-first-step", "ariana-grande-7-rings"] } },
    keys: ["slug", "type", "ownLength", "ownProgress", "ownRemaining"],
  })
)

const LONELY = "lonely"

export function lonely(): Asked {
  const body = pageOf({
    id: "01a04a4a-0007-7000-8000-000000000001",
    type: pageType.slug,
    slug: LONELY,
    extends: [`${pageType.slug}/${page.slug}`],
  })
  const held = indexedRepo({ [`akasha/${LONELY}/${LONELY}.page-type.ts`]: body })
  return asking(held, { pageTypeSlug: LONELY })
}

export function modelTests(query: Omit<Query, "pageTypeSlug">): readonly Record<string, unknown>[] {
  return rowsOf(asking(root, { pageTypeSlug: "model-test", ...query }))
}
