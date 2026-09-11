import {
  type Asked,
  askingOver,
  namingOver,
  reasonsIn,
} from "akasha/checks/code-checks/pages/check-reaches-a-path-through-the-index/check-reaches-a-path-through-the-index.code-check.decision.code.ts"

export const HELD = [
  "design/colors/pages/yellow.color.ts",
  "utils/hum/humming/humming.module.code.ts",
  "pages/hum-formats/modules/hum-matching/hum-matching.module.code.ts",
]

export const AT = "checks/code-checks/pages/a/a.code-check.code.ts"

export const reaching = askingOver(HELD)

export const NAMED = 'const AT = "design/colors"\n'

export const TYPES: ReadonlySet<string> = new Set(["code-check", "color", "module"])

export const naming = namingOver(HELD, TYPES)

export function only(text: string): readonly string[] {
  return reasonsIn(reaching, naming, AT, text)
}

export const DOTTED = "../../../../design/colors/pages/yellow.color.ts"

export const SWEEPS = 'const held = said(["git", "-C", root, "ls-files", "-z", "--", "*.ts"])\n'

export const STRAY = "akasha/stray.json"

export const MADE = "akasha/made.json"

export const RESOLVED = "akasha/resolved.json"

export const ASKED: Asked = {
  types: TYPES,
  listed: (path) => path !== STRAY,
  generated: (path) => path === MADE,
  toolResolvesPaths: (path) => path === RESOLVED,
}

export const SHELL = "akasha/one.thing.shell.sh"

export function ran(text: string): readonly string[] {
  return reasonsIn(reaching, naming, SHELL, text)
}

export const TWICE = ["a/one/image/Containerfile", "a/two/image/Containerfile"]

export const nearer = askingOver(TWICE)

export const BUILT = 'podman build -f "$PKG_DIR/image/Containerfile"\n'
