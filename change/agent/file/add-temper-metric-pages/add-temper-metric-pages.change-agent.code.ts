import { dirname, join } from "node:path"
import { akasha } from "akasha/akasha.domain.ts"
import {
  type Adding,
  type Answer,
  missing,
  type Replacing,
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
import type { MetricTemplate } from "akasha/temper/player/character/stat/modules/metric-template/metric-template.module.code.ts"
import { metrics } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.code.ts"
import { metricFormula } from "akasha/temper/player/character/stat/temper-metric/properties/metric-formula.code-file-property.ts"
import { temperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"

const HERE = "change/agent/file/add-temper-metric-pages"
const PART = "part"
const PAGES = "pages"
const TREE_TITLES = "tree-titles"
const TS = "ts"
const TYPES = "types"
const FORMULA_TYPE =
  "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"
const METRIC_NODE = "metric"
const TITLE_LINE = /^ {2}title: .*,$/m

type Stated = Readonly<Record<string, unknown>>

function statedOf(metric: MetricTemplate): Stated {
  const held: Record<string, unknown> = { title: metric.name }
  if ("category" in metric && metric.category !== undefined) held.category = metric.category
  held.valueType = metric.valueType
  held.polarity = metric.polarity
  if ("esoStatConstantName" in metric) held.esoStatConstantName = metric.esoStatConstantName
  if ("esoStatValuePart" in metric) held.esoStatValuePart = metric.esoStatValuePart
  if ("divisor" in metric) held.divisor = metric.divisor
  if ("cap" in metric && metric.cap !== undefined) held.cap = metric.cap
  held.fullyImplemented = metric.fullyImplemented
  if (metric.formula !== undefined) held[metricFormula.propertySlug] = TS
  return held
}

function pageBody(metric: MetricTemplate, typesAt: string): string {
  const typed = typedAs(temperMetric.slug)
  const lines = [
    `import type { ${typed} } from "${akasha.slug}/${typesAt}"`,
    "",
    `export const ${exportedAs(metric.id)} = {`,
    `  type: "${namedAs(pageType.slug, temperMetric.slug, null)}",`,
    `  slug: "${metric.id}",`,
    ...Object.entries(statedOf(metric)).map(
      ([key, value]) => `  ${key}: ${JSON.stringify(value)},`
    ),
    `} as const satisfies ${typed}`,
    "",
  ]
  return lines.join("\n")
}

function formulaBody(formula: unknown): string {
  return [
    `import type { FormulaNode } from "${FORMULA_TYPE}"`,
    "",
    `export const ${metricFormula.propertySlug}: FormulaNode = ${JSON.stringify(formula, null, 2)}`,
    "",
  ].join("\n")
}

function pagesWritten(world: World): Answer {
  const listed = world.index.listedAt(pageType.slug, temperMetric.slug)[0]
  if (listed === undefined) return refusing(`\`${temperMetric.slug}\` names no page type, ${HERE}`)
  const typesAt = besideAt(listed.path, TYPES, TS)
  if (typesAt === null) return refusing(`\`${temperMetric.slug}\` has no types beside it, ${HERE}`)
  const edits: Adding[] = []
  for (const metric of metrics.list) {
    const pageAt = join(
      dirname(listed.path),
      PAGES,
      metric.id,
      `${metric.id}.${temperMetric.slug}.${TS}`
    )
    edits.push({ kind: "add", path: pageAt, content: pageBody(metric, typesAt) })
    if (metric.formula === undefined) continue
    const formulaAt = besideAt(pageAt, metricFormula.propertySlug, TS)
    if (formulaAt === null) return refusing(`\`${pageAt}\` has no formula place, ${HERE}`)
    edits.push({ kind: "add", path: formulaAt, content: formulaBody(metric.formula) })
  }
  return { edits, refused: null }
}

function titlesWritten(world: World): Answer {
  const edits: Replacing[] = []
  for (const one of world.index.everyOfType(temperMetricTree.slug)) {
    const value = world.index.pageByPath(one.path)
    if (value === null || value.nodeType !== METRIC_NODE) continue
    const id = String(value.nodeId)
    if (!metrics.has(id)) continue
    const name = metrics.data[id].name
    if (value.title === name) continue
    const was = world.textOf(one.path)
    if (was === null || !TITLE_LINE.test(was)) continue
    const now = was.replace(TITLE_LINE, `  title: ${JSON.stringify(name)},`)
    edits.push({ kind: "replace", path: one.path, contentFrom: was, contentTo: now })
  }
  return { edits, refused: null }
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [PART]

export function runChange(world: World, given: Asked): Promise<Answer> {
  const part = given[PART]
  if (part === undefined) return Promise.resolve(refusing(missing(PART)))
  if (part === PAGES) return Promise.resolve(pagesWritten(world))
  if (part === TREE_TITLES) return Promise.resolve(titlesWritten(world))
  return Promise.resolve(
    refusing(`\`${part}\` is neither \`${PAGES}\` nor \`${TREE_TITLES}\`, ${HERE}`)
  )
}
