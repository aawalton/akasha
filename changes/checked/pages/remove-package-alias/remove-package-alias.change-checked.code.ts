import { placedIn } from "@akasha/code/code-specifier"
import { typed } from "@akasha/code/code-typing"
import { calledIn, objectIn } from "@akasha/code/package-manifest"
import { manifestsIn } from "@akasha/indexes/package-reaching"
import ts from "typescript"
import {
  objectAt,
  withoutEntriesIn,
} from "../../../mechanical/file-content/remove/remove-manifest-ways/remove-manifest-ways.change-mechanical-manifest.code.ts"
import {
  answered,
  missing,
  refusing,
  writing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer, Edit } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { aliasIn, nameFor } from "../rename-package/rename-package.change-checked.code.ts"

const AT = "at"

const WAS = "was"

const NAME = "name"

const UNDROPPED = "so no alias is dropped"

const HOLDING = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]

export type RemovePackageAliasAsked = {
  readonly at: string
  readonly was: string
}

export function aliasedTo(held: ts.ObjectLiteralExpression, was: string, to: string): boolean {
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    if (one.name.text !== was) continue
    const value = one.initializer
    if (!ts.isStringLiteral(value)) return false
    const alias = aliasIn(value.text)
    return alias !== null && alias.named === to
  }
  return false
}

export function withoutAliasIn(at: string, text: string, was: string, to: string): string {
  let body = text
  for (const holding of HOLDING) {
    const held = objectAt(ts.parseJsonText(at, body), holding)
    if (held === null || !aliasedTo(held, was, to)) continue
    body = withoutEntriesIn(at, body, holding, new Set([was]))
  }
  return body
}

function reachingOld(world: World, was: string): string | null {
  for (const path of world.index.everyPath()) {
    if (!typed(path)) continue
    const body = world.textOf(path)
    if (body === null || !body.includes(was)) continue
    for (const one of placedIn(path, body)) {
      if (nameFor(one.text, was, was) !== null) return path
    }
  }
  return null
}

export function removePackageAlias(world: World, given: RemovePackageAliasAsked): Answer {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const held = objectIn(text)
  if (held === null || Array.isArray(held)) {
    return refusing(`\`${given.at}\` reads as no JSON object, ${UNDROPPED}`)
  }
  const to = calledIn(text)
  if (to === null) return refusing(`\`${given.at}\` states no \`${NAME}\`, ${UNDROPPED}`)
  if (to === given.was) {
    return refusing(`\`${given.was}\` is the name this package carries, ${UNDROPPED}`)
  }
  const reaching = reachingOld(world, given.was)
  if (reaching !== null) {
    return refusing(`\`${reaching}\` reaches this package as \`${given.was}\`, ${UNDROPPED}`)
  }
  const edits: Edit[] = []
  for (const path of manifestsIn(world.index.everyPath(), world.index.fileKeysAt())) {
    const body = world.textOf(path)
    if (body === null || !body.includes(given.was)) continue
    const next = withoutAliasIn(path, body, given.was, to)
    if (next !== body) edits.push(writing(path, body, next))
  }
  if (edits.length === 0) return refusing(`no manifest aliases \`${given.was}\`, ${UNDROPPED}`)
  return answered(edits)
}

export type Asked = Readonly<Record<string, string>>

export function runChange(world: World, given: Asked): Answer {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const was = given[WAS]
  if (was === undefined) return refusing(missing(WAS))
  return removePackageAlias(world, { at, was })
}
