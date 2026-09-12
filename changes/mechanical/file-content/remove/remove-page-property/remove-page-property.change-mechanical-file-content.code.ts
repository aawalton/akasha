import {
  refusing,
  spliced,
  stating,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { requiredIn } from "akasha/changes/modules/key-requiring/key-requiring.module.code.ts"
import { without } from "akasha/changes/modules/literal-splicing/literal-splicing.module.code.ts"
import { keyOf, literalIn } from "akasha/changes/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/modules/source/code-source.module.code.ts"
import ts from "typescript"

export type RemovePagePropertyAsked = {
  readonly at: string
  readonly key: string
}

export function removePageProperty(world: World, given: RemovePagePropertyAsked): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const source = parsedAs(given.at, text)
  const owner = literalIn(source)
  if (owner === null) return refusing(`\`${given.at}\` exports no object`)
  const at = owner.properties.findIndex(
    (each) => ts.isPropertyAssignment(each) && keyOf(each) === given.key
  )
  if (owner.properties[at] === undefined) return stating([])
  const required = requiredIn(world, given)
  if (required === null) {
    return refusing(`whether \`${given.key}\` is required could not be read`)
  }
  if (required) {
    return refusing(`\`${given.key}\` is required, so taking it away is a retype`)
  }
  const left = without(text, source, owner, owner.properties, at)
  return stating(spliced(given.at, text, left))
}

export function runChange(world: World, given: RemovePagePropertyAsked): Said {
  return removePageProperty(world, given)
}
