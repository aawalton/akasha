import { placedIn } from "@akasha/code/code-specifier"
import { typed } from "@akasha/code/code-typing"
import { calledIn, DEPENDING, objectIn } from "@akasha/code/package-manifest"
import { manifestsIn } from "@akasha/indexes/package-reaching"
import ts from "typescript"
import {
  missing,
  refusing,
  splicing,
  stating,
} from "../../../modules/answer/change-answer.module.code.ts"
import type {
  FileChange,
  Said,
  Splice,
} from "../../../modules/answer/change-answer.module.types.ts"
import { entriesGoingIn, objectAt } from "../../../modules/json-entries/json-entries.module.code.ts"
import { aliasIn, nameFor } from "../../../modules/package-naming/package-naming.module.code.ts"
import type { World } from "../../../modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const WAS = "was"

const NAME = "name"

const UNDROPPED = "so no alias is dropped"

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

export function aliasGoingIn(at: string, text: string, was: string, to: string): readonly Splice[] {
  const source = ts.parseJsonText(at, text)
  const found: Splice[] = []
  for (const holding of DEPENDING) {
    const held = objectAt(source, holding)
    if (held === null || !aliasedTo(held, was, to)) continue
    found.push(...entriesGoingIn(at, text, holding, new Set([was])))
  }
  return found.sort((one, two) => one.from - two.from)
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

export function removePackageAlias(world: World, given: RemovePackageAliasAsked): Said {
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
  const edits: FileChange[] = []
  for (const path of manifestsIn(world.index.everyPath(), world.index.fileKeysAt())) {
    const body = world.textOf(path)
    if (body === null || !body.includes(given.was)) continue
    edits.push(...splicing(path, body, aliasGoingIn(path, body, given.was, to)))
  }
  if (edits.length === 0) return refusing(`no manifest aliases \`${given.was}\`, ${UNDROPPED}`)
  return stating(edits)
}

export type Asked = Readonly<Record<string, string>>

export function runChange(world: World, given: Asked): Said {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const was = given[WAS]
  if (was === undefined) return refusing(missing(WAS))
  return removePackageAlias(world, { at, was })
}
