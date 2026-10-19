import { dirname } from "node:path"
import {
  keyFor,
  matched,
} from "akasha/code/router-app/modules/meta-glob-setting/meta-glob-setting.module.code.ts"
import type { BunPlugin } from "bun"

const NAME = "bundle-meta-glob"

const SOURCE = /\.tsx?$/

const CALLED =
  /import\.meta\.glob(?:<[^<>()]*>)?\(\s*(["'])([^"']+)\1\s*,\s*\{\s*eager\s*:\s*true\s*,?\s*\}\s*\)/g

const SPELLED = "import.meta.glob"

const NAMED = "__metaGlob"

export function globbedSource(text: string, at: string): string | undefined {
  if (!text.includes(SPELLED)) return undefined
  const folder = dirname(at)
  const imports: string[] = []
  const replaced = text.replace(CALLED, (_whole, _quote, pattern: string) => {
    const files = [...new Set(matched(folder, pattern))].filter((full) => full !== at).sort()
    const entries = files.map((full) => {
      const name = `${NAMED}${String(imports.length)}`
      imports.push(`import * as ${name} from ${JSON.stringify(full)}`)
      return `${JSON.stringify(keyFor(folder, full))}: ${name}`
    })
    return `{ ${entries.join(", ")} }`
  })
  if (replaced === text) return undefined
  return `${imports.join("\n")}\n${replaced}`
}

export function metaGlobbing(): BunPlugin {
  return {
    name: NAME,
    setup(build) {
      build.onLoad({ filter: SOURCE }, async (args) => {
        const globbed = globbedSource(await Bun.file(args.path).text(), args.path)
        if (globbed === undefined) return undefined
        return { contents: globbed, loader: args.path.endsWith("x") ? "tsx" : "ts" }
      })
    },
  }
}
