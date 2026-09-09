import { dirname } from "node:path"
import { specifierFor } from "@akasha/code/code-specifier"
import { partedIn } from "@akasha/pages/page-file-name"
import { typedAs } from "../../../../../pages/export-name/page-export-name.module.code.ts"
import { gathered, refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const CHANGE_FILE_CONTENT = "change-mechanical-file-content/change-file-content"

const TYPE_KEY = "pageTypeSlug"

const STATED = /^ {2}(type|pageTypeSlug): "([^"]*)",$/m

export type Asked = {
  readonly at: string
  readonly to: string
}

export function importingFor(name: string): RegExp {
  return new RegExp(`^import type \\{ ${name} \\} from "[^"]*"$`, "m")
}

export function passagesFor(
  was: string,
  now: string,
  line: string,
  imported: string,
  key: string
): readonly (readonly [string, string])[] {
  return [
    [line, imported],
    [`satisfies ${typedAs(was)}`, `satisfies ${typedAs(now)}`],
    [`${key}: ${JSON.stringify(was)}`, `${key}: ${JSON.stringify(now)}`],
  ]
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
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
  const stated = STATED.exec(text)
  if (stated === null) {
    return refusing(`\`${given.at}\` states no \`${TYPE_KEY}\`, so no page type is restated`)
  }
  const key = stated[1] ?? TYPE_KEY
  const was = stated[2] ?? ""
  if (was === type.slug) {
    return refusing(`\`${was}\` is the page type the body states already`)
  }
  const name = typedAs(was)
  const line = importingFor(name).exec(text)
  if (line === null) {
    return refusing(
      `\`${given.at}\` imports no type named \`${name}\`, so no page type is restated`
    )
  }
  const spelled = specifierFor(dirname(given.at), given.to)
  const imported = `import type { ${typedAs(type.slug)} } from ${JSON.stringify(spelled)}`
  const carried: Answer[] = []
  let over = world
  for (const [old, next] of passagesFor(was, type.slug, line[0], imported, key)) {
    const answer = await reach(over, CHANGE_FILE_CONTENT, { at: given.at, old, new: next })
    if (answer.said.refused !== null) return answer.said
    carried.push(answer.said)
    over = answer.world
  }
  return gathered(carried)
}
