import {
  refusing,
  type Said,
  splicing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { droppedIn } from "akasha/change/modules/export-keyword/export-keyword.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly names: readonly string[]
}

export function removeExportKeyword(path: string, text: string, given: Asked): Said {
  const found = droppedIn(path, text, new Set(given.names))
  const dropped = new Set(found.names)
  const left = given.names.filter((one) => !dropped.has(one))
  if (left.length > 0) {
    const named = left.map((one) => `\`${one}\``).join(", ")
    return refusing(`${path} declares ${named} in a form this change drops no \`export\` from`)
  }
  return stating(splicing(path, text, found.splices))
}

export type Given = {
  readonly at: string
  readonly names: readonly string[]
}

export function runChange(world: World, given: Given): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so no \`export\` is dropped`)
  return removeExportKeyword(given.at, text, { names: given.names })
}
