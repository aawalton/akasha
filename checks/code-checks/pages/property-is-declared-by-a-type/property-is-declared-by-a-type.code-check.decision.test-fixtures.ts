import { valueAlsoFiled } from "@akasha/indexes/testing"
import { ran } from "@akasha/utils/run/running"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import {
  claiming,
  declaring,
  filing,
  founded,
  pathFor,
  put,
  typed,
} from "../../../modules/scratch/check-scratch.module.code.ts"

export const ONE = "01a04ef8-1a07-7001-8000-000000000001"

export const TWO = "01a04ef8-1a07-7002-8000-000000000002"

export const NEW = "01a04ef8-1a07-7004-8000-000000000004"

export const UP_AT = "akasha/up.page-type.ts"

const RECORD = "01a04ef8-1a07-7003-8000-000000000003"

const TYPE_AT = "akasha/types/domain.page-type.ts"

export const scratch = scratchWorld()

export function body(
  kind: string,
  slug: string,
  id: string,
  declares?: readonly string[]
): Uint8Array {
  const said =
    declares === undefined
      ? ""
      : `, properties: ${JSON.stringify(declares.map((one) => ({ pageProperty: one })))}`
  return new TextEncoder().encode(
    `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: ${JSON.stringify(kind)}, ` +
      `slug: ${JSON.stringify(slug)}${said} }\n`
  )
}

export function oneOf(slug: string, id: string, members: readonly string[]): Uint8Array {
  return new TextEncoder().encode(
    `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: "one-of-property", ` +
      `slug: ${JSON.stringify(slug)}, members: ${JSON.stringify(members)} }\n`
  )
}

export function rooted(): string {
  const root = scratch.rootFor("akasha-declared-")
  founded(root)
  typed(root, "domain", "page")
  claiming(root, TYPE_AT, TYPE_AT, "id-domain")
  typed(root, "page-property", "domain")
  typed(root, "relation-property", "page-property")
  typed(root, "record-property", "page-property")
  typed(root, "one-of-property", "page-property")
  typed(root, "page-type", "domain")
  declaring(root, "properties", { pageTypeSlug: "record-property" })
  declaring(root, "page-property", {
    pageTypeSlug: "relation-property",
    targetPageTypeSlug: "page-property",
  })
  declaring(root, "members", {
    pageTypeSlug: "relation-property",
    targetPageTypeSlug: "page-property",
  })
  filing(root, "record-property", "properties", RECORD)
  put(
    root,
    pathFor("record-property", "properties"),
    body("record-property", "properties", RECORD, ["page-property"])
  )
  valueAlsoFiled(root, "record-property", [
    {
      path: pathFor("record-property", "properties"),
      value: {
        id: RECORD,
        pageTypeSlug: "record-property",
        slug: "properties",
        properties: [{ pageProperty: "page-property" }],
      },
    },
  ])
  return root
}

export function tracked(root: string): string {
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
