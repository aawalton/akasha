import { readdirSync } from "node:fs"
import { PAGE_EXTENSION, pageNameOf } from "@akasha/pages-system/markdown-page-name"

export const MARKDOWN = `.${PAGE_EXTENSION}`

function stemOf(name: string): string | null {
  if (!name.endsWith(MARKDOWN)) return null
  return pageNameOf(name)?.stem ?? name.slice(0, -MARKDOWN.length)
}

export function pageFileIn(root: string, dir: string, stem: string): string | null {
  let names: readonly string[]
  try {
    names = readdirSync(`${root}/${dir}`)
  } catch {
    return null
  }
  const named = names.filter((one) => stemOf(one) === stem).sort()
  const held = named.find((one) => one === `${stem}${MARKDOWN}`) ?? named[0]
  return held === undefined ? null : `${dir}/${held}`
}
