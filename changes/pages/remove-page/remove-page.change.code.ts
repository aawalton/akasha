import type { Named } from "@akasha/indexes"
import { claimsOf } from "@akasha/indexes/entries"
import type { Shadow } from "@akasha/pages/shadow"
import { gathered, refusing } from "../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../modules/change-answer/change-answer.module.types.ts"
import { removeFile } from "../remove-file/remove-file.change.code.ts"

const PART_SLUGS = "part-slugs"

export type Asked = {
  readonly at: string
}

export function parentsOf(shadow: Shadow, at: string): readonly Named[] {
  const found: Named[] = []
  for (const one of shadow.index.listedByPath(at)) {
    for (const namer of shadow.index.namersOf(one.id)) {
      if (namer.propertySlug === PART_SLUGS) found.push(namer)
    }
  }
  return found
}

type Beside = { readonly paths: readonly string[] } | { readonly refused: string }

function besideIn(
  root: string,
  shadow: Shadow,
  at: string,
  textOf: (path: string) => string | null
): Beside {
  try {
    const value = shadow.pageOf(at)
    if (value === null) return { refused: `\`${at}\` names no page, so no page is taken away` }
    const claimed = claimsOf(
      value,
      at,
      root,
      shadow.index.filePropertiesAt(),
      shadow.index.sidecarsAt(),
      (one) => textOf(one) !== null
    )
    const held = [...new Set(claimed)].filter((one) => one !== at && textOf(one) !== null)
    return { paths: [at, ...held] }
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return { refused: `${why}, so the files beside \`${at}\` were not worked out` }
  }
}

export function removePage(
  root: string,
  shadow: Shadow,
  given: Asked,
  textOf: (path: string) => string | null
): Answer {
  const beside = besideIn(root, shadow, given.at, textOf)
  if ("refused" in beside) return refusing(beside.refused)
  return gathered(beside.paths.map((one) => removeFile({ at: one }, textOf)))
}
