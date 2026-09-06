import type { Named } from "@akasha/indexes"
import { claimsOf } from "@akasha/indexes/entries"
import { partedIn } from "@akasha/pages/page-file-name"
import type { Value } from "@akasha/pages/page-value"
import { importNotLeftHanging } from "../../guards/pages/import-not-left-hanging/import-not-left-hanging.change-guard.code.ts"
import { relationNotLeftHanging } from "../../guards/pages/relation-not-left-hanging/relation-not-left-hanging.change-guard.code.ts"
import {
  answered,
  gathered,
  refusing,
} from "../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../modules/change-answer/change-answer.module.types.ts"
import { guardedBy } from "../../modules/change-guarding/change-guarding.module.code.ts"
import type { World } from "../../modules/change-shadow/change-shadow.module.code.ts"
import { removeFile } from "../remove-file/remove-file.change.code.ts"
import { removePropertyValue } from "../remove-property-value/remove-property-value.change.code.ts"

const PART_SLUGS = "part-slugs"

const PART_SLUGS_KEY = "partSlugs"

const GUARDS = [relationNotLeftHanging, importNotLeftHanging]

export type Asked = {
  readonly at: string
}

function pageIn(world: World, at: string): Value | null {
  const said = partedIn(at)
  if (said === null || said.sections.length > 0) return null
  return world.index.pageAt(said.pageType, said.slug)
}

export function parentsOf(world: World, at: string): readonly Named[] {
  const found: Named[] = []
  for (const one of world.index.listedByPath(at)) {
    for (const namer of world.index.namersOf(one.id)) {
      if (namer.propertySlug === PART_SLUGS) found.push(namer)
    }
  }
  return found
}

type Beside = { readonly paths: readonly string[] } | { readonly refused: string }

function besideIn(world: World, at: string): Beside {
  try {
    const value = pageIn(world, at)
    if (value === null) return { refused: `\`${at}\` names no page, so no page is taken away` }
    const claimed = claimsOf(
      value,
      at,
      world.root,
      world.index.filePropertiesAt(),
      world.index.sidecarsAt(),
      (one) => world.textOf(one) !== null
    )
    const held = [...new Set(claimed)].filter((one) => one !== at && world.textOf(one) !== null)
    return { paths: [at, ...held] }
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return { refused: `${why}, so the files beside \`${at}\` were not worked out` }
  }
}

/** A parent names the page qualified or bare, so the bare spelling is tried where the other refuses. */
function unnamingIn(world: World, at: string): Answer {
  const said = partedIn(at)
  if (said === null) return answered([])
  const qualified = `${said.pageType}/${said.slug}`
  const answers: Answer[] = []
  for (const parent of parentsOf(world, at)) {
    const one = removePropertyValue(world, {
      at: parent.path,
      key: PART_SLUGS_KEY,
      value: qualified,
    })
    if (one.refused === null) {
      answers.push(one)
      continue
    }
    const bare = removePropertyValue(world, {
      at: parent.path,
      key: PART_SLUGS_KEY,
      value: said.slug,
    })
    if (bare.refused !== null) return one
    answers.push(bare)
  }
  return gathered(answers)
}

export function removePage(world: World, given: Asked): Answer {
  const beside = besideIn(world, given.at)
  if ("refused" in beside) return refusing(beside.refused)
  const taken = beside.paths.map((one) => removeFile({ at: one }, world.textOf))
  const unnamed = unnamingIn(world, given.at)
  if (unnamed.refused !== null) return unnamed
  return guardedBy(world, gathered([...taken, unnamed]), GUARDS)
}
