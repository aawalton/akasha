import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  type CharacterCompletion,
  characterCompletionSchema,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

const FOLDER = "temper/player/character/temper-account-character/pages"

export function characterCompletionAt(slug: string): CharacterCompletion {
  const at = join(akashaRoot(), FOLDER, slug, `${slug}.temper-account-character.completion.json`)
  const body: unknown = JSON.parse(readFileSync(at, "utf8"))
  return characterCompletionSchema.parse(body)
}
