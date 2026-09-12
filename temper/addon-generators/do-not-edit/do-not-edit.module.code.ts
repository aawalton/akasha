import { pathOf } from "akasha/commands/modules/walking/command-walking.module.code.ts"
import { temperAddonDataGenerate } from "akasha/commands/pages/temper/addon/data-generate/temper-addon-data-generate.command.ts"
import { temperAddon } from "akasha/commands/pages/temper/addon/temper-addon.namespace.ts"
import { temper } from "akasha/commands/pages/temper/temper.namespace.ts"

const CALLED_AS = "akasha"

const NAMED: Readonly<Record<string, string>> = {
  [temper.slug]: temper.name,
  [temperAddon.slug]: temperAddon.name,
  [temperAddonDataGenerate.slug]: temperAddonDataGenerate.name,
}

const CALL = `${CALLED_AS} ${pathOf(temperAddonDataGenerate.slug, (slug) => NAMED[slug] ?? null)}`

export const DO_NOT_EDIT = `DO NOT EDIT — regenerate with: ${CALL}`
