import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { ran } from "@akasha/utils/run/running"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import {
  declaring,
  founded,
  pathFor,
  typed,
} from "../../../modules/scratch/check-scratch.module.code.ts"

export const HELD = "01a058ff-c2b0-7001-8000-000000000001"

export const MOBILE = "01a058ff-c2b0-7002-8000-000000000002"

export const AT = pathFor("person", "held")

export const MOBILE_AT = "akasha/mobile-number-property.page-type.ts"

export const KEYED = new Map([["phone", "phone"]])

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-e164-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "page-type", "domain")
  typed(root, "page-property", "domain")
  typed(root, "text-property", "page-property")
  typed(root, "phone-number-property", "page-property")
  typed(root, "person", "domain", ["phone", "note", "mobile"])
  declaring(root, "phone", { pageTypeSlug: "phone-number-property" })
  declaring(root, "note", { pageTypeSlug: "text-property" })
  declaring(root, "mobile", { pageTypeSlug: "mobile-number-property" })
  return root
}

export function personText(stated: string): string {
  return (
    `export const held = { id: ${JSON.stringify(HELD)}, pageTypeSlug: "person", ` +
    `slug: "held", ${stated} }\n`
  )
}

export function person(stated: string): Uint8Array {
  return bytesOf(personText(stated))
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted()
  for (const [path, said] of Object.entries(files)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, said)
  }
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
