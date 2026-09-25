import { akashaService } from "akasha/infrastructure/service/akasha-service/akasha-service.page-type.ts"
import {
  readingIn,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { uncommittedIn } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"

const SERVICE = "service"

const PAGE_TYPE = "page-type"

const DEFINITION = "definition"

const SLUG = "slug"

const RUNNER = "service-"

const KIND = "kind"

const WELL = "well"

const GREEN = "green"

const RED = "red"

export type ServiceNode = {
  readonly kind: "kind" | "service"
  readonly key: string
  readonly label: string
  readonly at: string | null
  readonly color: string | null
  readonly detail: string | null
  readonly children: readonly ServiceNode[]
}

type Named = {
  readonly at: string
  readonly definition: string | null
}

function byLabel(one: ServiceNode, two: ServiceNode): number {
  return one.label < two.label ? -1 : one.label > two.label ? 1 : 0
}

function labelOf(slug: string): string {
  return slug.startsWith(RUNNER) ? slug.slice(RUNNER.length) : slug
}

function colorOf(values: Value | null): string | null {
  const well = values?.[WELL]
  if (well === true) return GREEN
  return well === false ? RED : null
}

function pageTypesIn(root: string): ReadonlyMap<string, Named> {
  const found = new Map<string, Named>()
  for (const one of valuesOfType(readingIn(root), PAGE_TYPE)) {
    const said = partedIn(one.path)
    if (said === null || said.sections.length > 0) continue
    const slug = textAt(one.value, SLUG)
    if (slug === null) continue
    found.set(slug, { at: one.path, definition: textAt(one.value, DEFINITION) })
  }
  return found
}

function servicesOf(root: string, kind: string): readonly ServiceNode[] {
  const found: ServiceNode[] = []
  for (const one of valuesOfType(readingIn(root), kind)) {
    const said = partedIn(one.path)
    if (said === null || said.sections.length > 0) continue
    found.push({
      kind: SERVICE,
      key: `${kind}/${said.slug}`,
      label: said.slug,
      at: one.path,
      color: colorOf(uncommittedIn(root, one.path)),
      detail: textAt(one.value, DEFINITION),
      children: [],
    })
  }
  return found.sort(byLabel)
}

export function assembleServiceTree(root: string): readonly ServiceNode[] {
  const named = pageTypesIn(root)
  const roots: ServiceNode[] = []
  for (const kind of kindsUnder(akashaService.slug, readingIn(root))) {
    if (kind === akashaService.slug) continue
    const children = servicesOf(root, kind)
    if (children.length === 0) continue
    const held = named.get(kind)
    roots.push({
      kind: KIND,
      key: `${PAGE_TYPE}/${kind}`,
      label: labelOf(kind),
      at: held?.at ?? null,
      color: null,
      detail: held?.definition ?? null,
      children,
    })
  }
  return roots.sort(byLabel)
}
