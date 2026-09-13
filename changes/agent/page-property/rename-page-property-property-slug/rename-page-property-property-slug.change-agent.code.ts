import { missing, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { atMostIn } from "akasha/changes/modules/value-carrying/value-carrying.module.code.ts"

const RENAME_PROPERTY_SLUG = "change-mechanical/rename-page-property-property-slug"

const AT = "at"

const TO = "to"

const AT_MOST = "at-most"

const WAS = "was"

export type RenamePagePropertyPropertySlugAsked = {
  readonly at: string
  readonly to: string
  readonly atMost?: number | null
  readonly was?: string | null
}

export async function renamePagePropertyPropertySlug(
  world: World,
  given: RenamePagePropertyPropertySlugAsked
): Promise<Answer> {
  return (await reach(world, RENAME_PROPERTY_SLUG, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, TO, AT_MOST, WAS]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  const atMost = atMostIn(given[AT_MOST])
  if (typeof atMost === "string") return refusing(atMost)
  return await renamePagePropertyPropertySlug(world, { at, to, atMost, was: given[WAS] ?? null })
}
