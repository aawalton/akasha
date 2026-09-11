import {
  besideOf,
  pageOf,
} from "akasha/infrastructure/container-image/recipe-page/recipe-page.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const MODULE = "module"

const SERVER = "auth-proxy-server"

const CODE = "code"

export function ranBy(given: string | Reading): string {
  return besideOf(pageOf(given, MODULE, SERVER), CODE)
}

export function extensionsIn(given: string | Reading): string {
  const lines = [
    "{",
    '  "expose_port": 3080,',
    '  "runtime_cmd": [',
    '    "bun",',
    '    "run",',
    `    "${ranBy(given)}"`,
    "  ]",
    "}",
  ]
  return `${lines.join("\n")}\n`
}
