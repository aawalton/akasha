import { type Answer, gathered } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { changeRuns } from "akasha/change/modules/import-repointing/import-repointing.module.code.ts"
import { bodyOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

export const STYLES = "held/web/look/held-web-look.stylesheet.styles.css"

export const SOURCED = `@source "../../../code-system/router-apps/**/*.{ts,tsx}";\n`

export const SOURCED_AT = `@source "../../../code/router-apps/**/*.{ts,tsx}";\n`

export const SCRIPT = "code/ios-apps/scripts/stage.shell-script.sh"

export const RAN = `. "$AKASHA_ROOT/code-system/ios-apps/stage/stage.module.code.ts"\n`

export const RAN_AT = `. "$AKASHA_ROOT/code/ios-apps/stage/stage.module.code.ts"\n`

export const LOOK_WAS = "held/web/look.styles.css"

export const LOOK_DEEPER = "held/web/deeper/look.styles.css"

const STAYED = "held/shared/tokens.styles.css"

const IMPORTING = `@import "../shared/tokens.styles.css";\n`

export const IMPORTED_DEEPER = `@import "../../shared/tokens.styles.css";\n`

export function stayedOver(now: string): Answer {
  const moved = new Map([[LOOK_WAS, now]])
  const landing = (path: string): string | null => moved.get(path) ?? null
  return gathered([changeRuns(LOOK_WAS, now, IMPORTING, landing, (path) => path === STAYED)])
}

export function stayedBody(now: string): string {
  return bodyOf(stayedOver(now), (path) => (path === now ? IMPORTING : null))
}

export const SHELL =
  "infrastructure/machines/provisioning/scripts/setup-symlinks/setup-symlinks.shell-script.shell.sh"

export const ROOTS =
  "infrastructure/machines/provisioning/scripts/repo-roots/repo-roots.shell-script.shell.sh"

export const ROOTS_AT =
  "infrastructure/machines/provisioning/roots/repo-roots/repo-roots.shell-script.shell.sh"

export const ROOTS_MOVED = new Map([[ROOTS, ROOTS_AT]])

export const LOOK = "design/interfaces/system/design-look/design-look.stylesheet.styles.css"

export const TOKENS = "design/interfaces/system/token-values/token-values.stylesheet.styles.css"

export const TOKENS_AT = "design/interfaces/tokens/token-values/token-values.stylesheet.styles.css"

export const TOKENS_IMPORT = `@import "../token-values/token-values.stylesheet.styles.css";\n`

export const TOKENS_IMPORT_AT = `@import "../../tokens/token-values/token-values.stylesheet.styles.css";\n`

export const WRAPPED = "services/workstations/service-wrapping/service-wrapping.module.code.ts"

export const WRAPPED_AT =
  "infrastructure/services/workstations/service-wrapping/service-wrapping.module.code.ts"

export const SERVICE = "infrastructure/services/pages/pages-service.service.ts"

export const CONFIG = "code/editor/extension/tsconfig.json"

export const RECIPES = "inference/generations/upscale/up/upscale-up.shell-script.shell.sh"

export const IMAGES = new Map([
  [
    "inference/generations/upscale/image/Containerfile",
    "inference/generations/upscale/recipe/Containerfile",
  ],
  [
    "inference/generations/wan/image/Containerfile",
    "inference/generations/wan/recipe/Containerfile",
  ],
  [
    "inference/generations/zimage/image/Containerfile",
    "inference/generations/zimage/recipe/Containerfile",
  ],
])

export const WATCHER = "temper/watcher/image/Containerfile"

export const WATCHER_AT = "temper/watcher/recipe/Containerfile"

const HELD_BODY = `export const one = 1\n`

export const UNDER_MOVED: Readonly<Record<string, string>> = {
  "code-system/ios-apps/held.module.code.ts": HELD_BODY,
  "code-system/ios-apps/stage/stage.module.code.ts": HELD_BODY,
  "code-system/one.ts": HELD_BODY,
  "code-system/one/one.module.code.ts": HELD_BODY,
  "code-system/router-apps/held/held.component.code.tsx": HELD_BODY,
}

export const SANDBOX = "held/type/sandbox/sandbox.type-declaration.d.ts"

export const SANDBOX_AT = "held/eso/type/sandbox/sandbox.type-declaration.d.ts"

export const DECLARED = "design/lua/sandbox/sandbox.type-declaration.d.ts"

export const DECLARED_AT = "design/sandbox/sandbox.type-declaration.d.ts"

export const REFERRING = `/// <reference path="../../../${DECLARED}" />\n`

export const REFERRING_DEEPER = `/// <reference path="../../../../${DECLARED}" />\n`

export const REFERRING_MOVED = `/// <reference path="../../../${DECLARED_AT}" />\n`
