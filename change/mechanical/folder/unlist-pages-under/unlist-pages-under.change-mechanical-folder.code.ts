import {
  refusing,
  type Said,
  type Splice,
  spliced,
  splicedTo,
  stating,
  telling,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { without } from "akasha/change/modules/literal-splicing/literal-splicing.module.code.ts"
import { literalIn } from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { pageShaped, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import ts from "typescript"

const PARTED = "/"

export type Asked = {
  readonly at: string
}

function inside(at: string, path: string): boolean {
  return path === at || path.startsWith(`${at}${PARTED}`)
}

function listsIn(top: ts.ObjectLiteralExpression): readonly ts.ArrayLiteralExpression[] {
  const found: ts.ArrayLiteralExpression[] = []
  for (const one of top.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isArrayLiteralExpression(one.initializer)) continue
    found.push(one.initializer)
    for (const each of one.initializer.elements) {
      if (!ts.isObjectLiteralExpression(each)) continue
      for (const field of each.properties) {
        if (ts.isPropertyAssignment(field) && ts.isArrayLiteralExpression(field.initializer)) {
          found.push(field.initializer)
        }
      }
    }
  }
  return found
}

function firstNamed(path: string, text: string, names: ReadonlySet<string>): Splice | null {
  const source = parsedAs(path, text)
  const top = literalIn(source)
  if (top === null) return null
  for (const list of listsIn(top)) {
    const at = list.elements.findIndex((each) => ts.isStringLiteral(each) && names.has(each.text))
    if (at >= 0) return without(text, source, list, list.elements, at)
  }
  return null
}

export function unlisted(path: string, text: string, names: ReadonlySet<string>): string {
  let now = text
  let found = firstNamed(path, now, names)
  while (found !== null) {
    now = `${now.slice(0, found.from)}${found.put}${now.slice(found.to)}`
    found = firstNamed(path, now, names)
  }
  return now
}

function nameOf(path: string): string | null {
  const said = partedIn(path)
  return said === null ? null : `${said.pageType}${PARTED}${said.slug}`
}

export function runChange(world: World, given: Asked): Said {
  const pages = world.under(given.at).filter(pageShaped)
  if (pages.length === 0) return refusing(`\`${given.at}\` holds no page, so no name is taken out`)
  const names = new Set<string>()
  const namers = new Set<string>()
  for (const path of pages) {
    const name = nameOf(path)
    if (name !== null) names.add(name)
    for (const one of world.index.namersAt(path)) {
      if (!inside(given.at, one.path)) namers.add(one.path)
    }
  }
  const edits = [...namers].sort().flatMap((path) => {
    const was = world.textOf(path)
    if (was === null) return []
    const now = unlisted(path, was, names)
    return now === was ? [] : spliced(path, was, splicedTo(was, now))
  })
  return telling(stating(edits), [
    `${edits.length} lists outside \`${given.at}\` had a name under it taken out`,
  ])
}
