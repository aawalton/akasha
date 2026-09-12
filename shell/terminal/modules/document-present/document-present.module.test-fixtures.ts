import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

export const A_PERSONA_AT = "akasha/persona-system/personas/akasha/akasha.persona.ts"

const REPO_AT = rootOf(import.meta.dir)

export function personAt(slug: string): string {
  return `akasha/${listedAt(REPO_AT, "person", slug)[0]?.path ?? ""}`
}
