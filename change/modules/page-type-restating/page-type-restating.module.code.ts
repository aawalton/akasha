import {
  type FileChange,
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { importedFrom } from "akasha/page/modules/body/page-body.module.code.ts"
import { typedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const TYPE_KEY = "type"

const PAGE_TYPE = "page-type"

const STATED = /^ {2}(type|pageTypeSlug): "([^"]*)",$/gm

const CODE_ENDING = ".ts"

const TYPES_ENDING = ".types.ts"

function typesBeside(to: string): string | null {
  if (!to.endsWith(CODE_ENDING) || to.endsWith(TYPES_ENDING)) return null
  return `${to.slice(0, -CODE_ENDING.length)}${TYPES_ENDING}`
}

export type Asked = {
  readonly at: string
  readonly to: string
}

function importingFor(name: string): RegExp {
  return new RegExp(`^import type \\{ ${name} \\} from "[^"]*"$`, "m")
}

function passagesFor(
  was: string,
  now: string,
  line: string,
  imported: string,
  keys: readonly string[]
): readonly (readonly [string, string])[] {
  return [
    [line, imported],
    [`satisfies ${typedAs(slugOf(was))}`, `satisfies ${typedAs(slugOf(now))}`],
    ...keys.map(
      (key) => [`${key}: ${JSON.stringify(was)}`, `${key}: ${JSON.stringify(now)}`] as const
    ),
  ]
}

export function pageTypeRestated(world: World, given: Asked): Said {
  const type = partedIn(given.to)
  if (type === null) {
    return refusing(`\`${given.to}\` reads as no page file, so no page type is named`)
  }
  if (world.bodyOf(given.to) === null) {
    return refusing(`\`${given.to}\` holds no body, so no page type is named`)
  }
  const text = world.textOf(given.at)
  if (text === null) {
    return refusing(`\`${given.at}\` holds no body, so no page type is restated`)
  }
  const stated = [...text.matchAll(STATED)]
  const first = stated[0]
  if (first === undefined) {
    return refusing(`\`${given.at}\` states no \`${TYPE_KEY}\`, so no page type is restated`)
  }
  const was = first[2] ?? ""
  const keys = stated.filter((one) => one[2] === was).map((one) => one[1] ?? TYPE_KEY)
  if (slugOf(was) === type.slug) {
    return refusing(`\`${was}\` is the page type the body states already`)
  }
  const name = typedAs(slugOf(was))
  const line = importingFor(name).exec(text)
  if (line === null) {
    return refusing(
      `\`${given.at}\` imports no type named \`${name}\`, so no page type is restated`
    )
  }
  const beside = typesBeside(given.to)
  const declaring = beside !== null && world.bodyOf(beside) !== null ? beside : given.to
  const spelled = importedFrom(declaring)
  const imported = `import type { ${typedAs(type.slug)} } from ${JSON.stringify(spelled)}`
  const carried: FileChange[] = []
  const now = namedAs(PAGE_TYPE, type.slug, null)
  for (const [old, next] of passagesFor(was, now, line[0], imported, keys)) {
    carried.push({ kind: "replace", path: given.at, contentFrom: old, contentTo: next })
  }
  return stating(carried)
}
