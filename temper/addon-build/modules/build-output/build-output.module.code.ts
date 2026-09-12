import { dirname, join } from "node:path"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const DOMAIN = "domain"

const ADDON_BUILD = "temper-addon-build"

const DIST = "dist"

export function addonBuildOutputRel(root: string): string {
  const page = listedAt(root, DOMAIN, ADDON_BUILD)[0]
  if (page === undefined) {
    throw new Error(
      `no \`${DOMAIN}\` is slugged \`${ADDON_BUILD}\`, so nothing says where its build sits`
    )
  }
  return join(dirname(page.path), DIST)
}
