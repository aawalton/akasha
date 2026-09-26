import { dirname, join } from "node:path"
import { akasha } from "akasha/akasha.domain.ts"
import {
  type Adding,
  type Answer,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  exportedAs,
  typedAs,
} from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { slugStem } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import type { CompanionMetricTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-template/companion-metric-template.module.code.ts"
import { getCompanionMetricTree } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-tree/companion-metric-tree.module.code.ts"
import { companionMetrics } from "akasha/temper/catalog/companion/companions-core/modules/companion-metrics/companion-metrics.module.code.ts"
import { metricFormula } from "akasha/temper/player/character/stat/temper-metric/properties/metric-formula.code-file-property.ts"
import { temperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"

const HERE = "change/agent/file/add-companion-metric-pages"
const PAGES = "pages"
const TS = "ts"
const TYPES = "types"
const COMPANION = "companion"
const ROOT_SLUG = "companion-stats"
const FORMULA_TYPE =
  "akasha/temper/catalog/companion/companions-core/modules/companion-metric-template/companion-metric-template.module.code.ts"

type Stated = Readonly<Record<string, unknown>>

function bodyOf(slug: string, typeSlug: string, typesAt: string, stated: Stated): string {
  const typed = typedAs(typeSlug)
  return [
    `import type { ${typed} } from "${akasha.slug}/${typesAt}"`,
    "",
    `export const ${exportedAs(slug)} = {`,
    `  type: "${namedAs(pageType.slug, typeSlug, null)}",`,
    `  slug: "${slug}",`,
    ...Object.entries(stated).map(([key, value]) => `  ${key}: ${JSON.stringify(value)},`),
    `} as const satisfies ${typed}`,
    "",
  ].join("\n")
}

function statedOf(metric: CompanionMetricTemplate): Stated {
  const held: Record<string, unknown> = { title: metric.name, subject: COMPANION }
  held.valueType = metric.valueType
  if (metric.effectType !== undefined) held.effectType = metric.effectType
  if (metric.valueSource !== undefined) held.valueSource = metric.valueSource
  if (metric.valueType === "rating") {
    held.divisor = metric.divisor
    held.cap = metric.cap
    if (metric.ratingFloorIncrement !== undefined)
      held.ratingFloorIncrement = metric.ratingFloorIncrement
  }
  if (metric.formula !== undefined) held[metricFormula.propertySlug] = TS
  return held
}

function formulaBody(formula: unknown): string {
  return [
    `import type { CompanionFormulaNode } from "${FORMULA_TYPE}"`,
    "",
    `export const ${metricFormula.fixedExport[0]}: CompanionFormulaNode = ${JSON.stringify(formula, null, 2)}`,
    "",
  ].join("\n")
}

function placed(
  world: World,
  typeSlug: string
): { readonly folder: string; readonly typesAt: string } | null {
  const listed = world.index.listedAt(pageType.slug, typeSlug)[0]
  if (listed === undefined) return null
  const typesAt = besideAt(listed.path, TYPES, TS)
  return typesAt === null ? null : { folder: join(dirname(listed.path), PAGES), typesAt }
}

const kebab = slugStem

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = []

export function runChange(world: World, _given: Asked): Promise<Answer> {
  const stats = placed(world, temperMetric.slug)
  const tree = placed(world, temperMetricTree.slug)
  if (stats === null || tree === null)
    return Promise.resolve(refusing(`the stat page types are not placed, ${HERE}`))
  const edits: Adding[] = []
  for (const metric of companionMetrics.list) {
    const pageAt = join(stats.folder, metric.id, `${metric.id}.${temperMetric.slug}.${TS}`)
    edits.push({
      kind: "add",
      path: pageAt,
      content: bodyOf(metric.id, temperMetric.slug, stats.typesAt, statedOf(metric)),
    })
    if (metric.formula === undefined) continue
    const formulaAt = besideAt(pageAt, metricFormula.propertySlug, TS)
    if (formulaAt === null)
      return Promise.resolve(refusing(`\`${pageAt}\` has no formula place, ${HERE}`))
    edits.push({ kind: "add", path: formulaAt, content: formulaBody(metric.formula) })
  }
  const nodeAt = (slug: string) => join(tree.folder, `${slug}.${temperMetricTree.slug}.${TS}`)
  const node = (slug: string, stated: Stated) =>
    edits.push({
      kind: "add",
      path: nodeAt(slug),
      content: bodyOf(slug, temperMetricTree.slug, tree.typesAt, stated),
    })
  const parentOf = (slug: string) => `${temperMetricTree.slug}/${slug}`
  node(ROOT_SLUG, {
    title: "Companion Stats",
    nodeId: "stats",
    nodeType: COMPANION,
    displayOrder: 0,
  })
  for (const [groupAt, group] of getCompanionMetricTree([]).entries()) {
    const groupSlug = `companion-group-${kebab(group.label)}`
    node(groupSlug, {
      title: group.label,
      nodeId: kebab(group.label),
      nodeType: "companion-group",
      displayOrder: groupAt,
      parent: parentOf(ROOT_SLUG),
    })
    for (const [categoryAt, category] of group.categories.entries()) {
      const header = category.headerMetricId
      const categorySlug = `companion-category-${header}`
      node(categorySlug, {
        title: companionMetrics.data[header].name,
        nodeId: header,
        nodeType: "companion-category",
        displayOrder: categoryAt,
        parent: parentOf(groupSlug),
      })
      for (const [childAt, child] of category.children.entries()) {
        node(`${header}-${child.id}`, {
          title: companionMetrics.data[child.id].name,
          nodeId: child.id,
          nodeType: "metric",
          displayOrder: childAt,
          parent: parentOf(categorySlug),
          ...(child.useAccentColor === true ? { useAccentColor: true } : {}),
        })
      }
    }
  }
  return Promise.resolve({ edits, refused: null })
}
