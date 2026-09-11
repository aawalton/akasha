export const SHELL =
  "machines/provisioning/scripts/setup-symlinks/setup-symlinks.shell-script.shell.sh"

export const ROOTS = "machines/provisioning/scripts/repo-roots/repo-roots.shell-script.shell.sh"

export const ROOTS_AT = "machines/provisioning/roots/repo-roots/repo-roots.shell-script.shell.sh"

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

export const CONFIG = "code-system/editor/extension/tsconfig.json"

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
