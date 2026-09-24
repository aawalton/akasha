import {
  type Named,
  namingOver,
  pathOf,
} from "akasha/command/modules/walking/command-walking.module.code.ts"
import { page } from "akasha/command/pages/page/page.namespace.ts"
import { pageSecret } from "akasha/command/pages/page/secret/page-secret.namespace.ts"
import { pageSecretSet } from "akasha/command/pages/page/secret/set/page-secret-set.command.ts"

const LEVELS: readonly Named[] = [page, pageSecret, pageSecretSet]

const NAMED = namingOver(LEVELS)

function calling(one: Named): string {
  return pathOf(one.slug, NAMED)
}

export const SECRET_SET = calling(pageSecretSet)
