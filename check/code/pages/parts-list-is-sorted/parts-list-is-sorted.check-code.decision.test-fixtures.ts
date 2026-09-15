import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  founded,
  pathFor,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const HELD = "01a0927a-1000-7001-8000-000000000001"

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
