import { founded, pathFor, typed } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

export const HELD = "01a0927a-1000-7001-8000-000000000001"

export const AT = pathFor("domain", "held")

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-parts-sorted-")
  founded(root)
  typed(root, "page-type", "domain")
  typed(root, "domain", "page")
  return root
}

export function domainText(stated: string): string {
  return (
    `export const held = { id: ${JSON.stringify(HELD)}, pageTypeSlug: "domain", ` +
    `slug: "held", ${stated} }\n`
  )
}

export function domainBody(stated: string): Uint8Array {
  return bytesOf(domainText(stated))
}
