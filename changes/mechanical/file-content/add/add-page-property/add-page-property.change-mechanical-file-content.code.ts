import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import { refusing, stating } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Said } from "../../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { keyOf, literalIn } from "../../../../modules/page-literal/page-literal.module.code.ts"
import { withProperty } from "../add-property-value/add-property-value.change-mechanical-file-content.code.ts"

export type AddPagePropertyAsked = {
  readonly at: string
  readonly key: string
  readonly value: string
  readonly after?: string
}

export function addPageProperty(world: World, given: AddPagePropertyAsked): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const source = parsedAs(given.at, text)
  const owner = literalIn(source)
  if (owner === null) return refusing(`\`${given.at}\` exports no object`)
  const held = owner.properties.find(
    (each) => ts.isPropertyAssignment(each) && keyOf(each) === given.key
  )
  if (held !== undefined) {
    return refusing(`\`${given.key}\` is stated already, so \`${given.value}\` is a restatement`)
  }
  const put = `${given.key}: ${JSON.stringify(given.value)}`
  const gained = withProperty(text, source, owner, put, given.after)
  return stating([{ kind: "replace", path: given.at, contentFrom: text, contentTo: gained }])
}

export function runChange(world: World, given: AddPagePropertyAsked): Said {
  return addPageProperty(world, given)
}
