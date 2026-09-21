import { dirname } from "node:path"
import { refusalsIn } from "akasha/check/code/pages/global-is-set-before-it-is-read/global-is-set-before-it-is-read.check-code.decision.code.ts"
import { filesBy, input } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { compiled } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { heldPerShadow, type Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { temperAddon } from "akasha/temper/addon/temper-addon.page-type.ts"

const treesOf = heldPerShadow((shadow: Shadow): readonly string[] =>
  shadow.index.everyOfType(temperAddon.slug).map((one) => `${dirname(one.path)}/`)
)

export function underAddon(path: string, shadow: Shadow): boolean {
  return compiled(path) && treesOf(shadow).some((under) => path.startsWith(under))
}

const MODULES = filesBy("the TypeScript under a temper add-on's tree", underAddon)

export const globalIsSetBeforeItIsRead = input(MODULES, refusalsIn)
