import { writing } from "@akasha/command-system/scratching/testing"
import { idFiled, listedFiled, pathFiled, relationFiled } from "@akasha/indexes/testing"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { mintedId } from "@akasha/testing-system/minting"
import type { Warrant } from "../warranting/warranting.module.code.ts"

export type Listed = {
  readonly path: string
  readonly id: string
}

export function pathsOf(found: readonly Warrant[]): readonly string[] {
  return found.map((one) => one.path)
}

function filed(root: string, held: Listed, typeSlug: string, slug: string): undefined {
  pathFiled(root, held.path, [held])
  idFiled(root, held.id, [held])
  listedFiled(root, typeSlug, slug, [held])
}

function pageListed(
  root: string,
  path: string,
  typeSlug: string,
  slug: string,
  stated = ""
): Listed {
  const id = mintedId(slug)
  const held = { path, id }
  const said = stated === "" ? "" : `, ${stated}`
  writing(
    root,
    path,
    `export const ${exportedAs(slug)} = { id: "${id}", slug: "${slug}"${said} }\n`
  )
  filed(root, held, typeSlug, slug)
  return held
}

export function typedListed(root: string, typeSlug: string, slug: string, stated = ""): Listed {
  return pageListed(root, `akasha/${slug}/${slug}.${typeSlug}.ts`, typeSlug, slug, stated)
}

export function domainListed(root: string, slug: string): Listed {
  return typedListed(root, "domain", slug)
}

export function initiativeListed(root: string, slug: string, stated = ""): Listed {
  return pageListed(
    root,
    `domain-system/initiative/initiatives/${slug}.initiative.ts`,
    "initiative",
    slug,
    stated
  )
}

export function personListed(root: string, slug: string): Listed {
  return pageListed(root, `person-system/person/people/${slug}.person.ts`, "person", slug)
}

export function personaListed(root: string, slug: string): Listed {
  return pageListed(
    root,
    `persona-system/persona/${slug}/${slug}.persona.ts`,
    "persona",
    slug
  )
}

export function roleListed(root: string, slug: string): Listed {
  return pageListed(root, `role-system/role/roles/${slug}.role.ts`, "role", slug)
}

export function pageTypeListed(root: string, slug: string, above: string | null): string {
  const id = mintedId(`type-${slug}`)
  const path = `akasha/${slug}/${slug}.page-type.ts`
  const said = above === null ? "" : `, extendsSlug: "page-type/${above}"`
  writing(
    root,
    path,
    `export const held = { id: "${id}", pageTypeSlug: "page-type", slug: "${slug}"${said} }\n`
  )
  listedFiled(root, "page-type", slug, [{ path, id }])
  return path
}

export function seatListed(root: string, slug: string, stated: string): string {
  const path = `seat-system/seat/seats/${slug}.seat.ts`
  writing(root, path, `export const ${exportedAs(slug)} = { ${stated} }\n`)
  return path
}

export function namesPart(root: string, whole: Listed, part: Listed): undefined {
  relationFiled(root, part.id, "part-slugs", whole.id, [{ path: whole.path }])
}
