import { join, relative } from "node:path"
import { standing } from "../../command-system/scratching/scratching.module.test-fixtures.ts"
import { indexIn } from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { exportedAs } from "../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { mintedId } from "../../testing-system/minting/minting.module.code.ts"
import type { Warrant } from "../warranting/warranting.module.code.ts"

export type Standing = {
  readonly path: string
  readonly id: string
}

export function indexed(root: string, at: string, line: string): undefined {
  standing(root, join(relative(root, indexIn(root)), at), `${line}\n`)
}

export function pathsOf(found: readonly Warrant[]): readonly string[] {
  return found.map((one) => one.path)
}

function filed(root: string, held: Standing, typeSlug: string, slug: string): undefined {
  indexed(root, `path/${held.path}.jsonl`, JSON.stringify(held))
  indexed(root, `identity/page/id/${held.id}.jsonl`, JSON.stringify(held))
  indexed(root, `identity/${typeSlug}/slug/${slug}.jsonl`, JSON.stringify(held))
}

function pageStanding(root: string, path: string, typeSlug: string, slug: string): Standing {
  const id = mintedId(slug)
  const held = { path, id }
  standing(root, path, `export const ${exportedAs(slug)} = { id: "${id}", slug: "${slug}" }\n`)
  filed(root, held, typeSlug, slug)
  return held
}

export function domainStanding(root: string, slug: string): Standing {
  return pageStanding(root, `akasha/${slug}/${slug}.domain.ts`, "domain", slug)
}

export function personaStanding(root: string, slug: string): Standing {
  return pageStanding(
    root,
    `akasha/persona-system/persona/${slug}/${slug}.persona.ts`,
    "persona",
    slug
  )
}

export function roleStanding(root: string, slug: string): Standing {
  return pageStanding(root, `akasha/role-system/role/roles/${slug}.role.ts`, "role", slug)
}

export function pageTypeStanding(root: string, slug: string, above: string | null): string {
  const id = mintedId(`type-${slug}`)
  const path = `akasha/${slug}/${slug}.page-type.ts`
  const said = above === null ? "" : `, extendsSlug: "page-type/${above}"`
  standing(
    root,
    path,
    `export const held = { id: "${id}", pageTypeSlug: "page-type", slug: "${slug}"${said} }\n`
  )
  indexed(root, `identity/page-type/slug/${slug}.jsonl`, JSON.stringify({ path, id }))
  return path
}

export function seatStanding(root: string, slug: string, stated: string): string {
  const path = `akasha/seat-system/seat/seats/${slug}.seat.ts`
  standing(root, path, `export const ${exportedAs(slug)} = { ${stated} }\n`)
  return path
}

export function namesPart(root: string, whole: Standing, part: Standing): undefined {
  indexed(
    root,
    `relation/page/id/${part.id}/part-slugs/${whole.id}.jsonl`,
    JSON.stringify({ path: whole.path })
  )
}
