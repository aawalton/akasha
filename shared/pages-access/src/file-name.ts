import type { Value } from "@shared/pages-query"
import { camelizeKey, SETTLED_BY_ROW } from "./file-rows"
import { FileWriteError } from "./file-write-error"
import { filledBy, type HeldAt, holesIn, unfilledIn } from "../../../named-for/named-for.ts"
import type { PageWhere } from "@shared/pages-core/page-types"

export type Filled =
  | { readonly ok: true; readonly stem: string }
  | { readonly ok: false; readonly holes: readonly string[] }

function heldIn(values: Readonly<Record<string, unknown>>): HeldAt {
  return (key) => {
    const value = values[key]
    if (typeof value === "string") return value.trim() === "" ? null : value.trim()
    if (typeof value === "number" || typeof value === "boolean") return String(value)
    return null
  }
}

export function filledName(template: string, values: Readonly<Record<string, unknown>>): Filled {
  const heldAt = heldIn(values)
  const stem = filledBy(template, heldAt)
  return stem === null ? { ok: false, holes: unfilledIn(template, heldAt) } : { ok: true, stem }
}

export function constantHolesIn(template: string): readonly string[] {
  return holesIn(template).filter((one) => SETTLED_BY_ROW.has(camelizeKey(one)))
}

export function refuseTakenName(
  op: string,
  pageTypeSlug: string,
  template: string,
  name: string,
  standing: string
): never {
  throw new FileWriteError(
    pageTypeSlug,
    `${op}(${pageTypeSlug}): \`${pageTypeSlug}\` is named \`${template}\`, which this write fills to \`${name}\`, and ${standing} already stands there. A filled rule is an address rather than a label, so two pages cannot hold one: filing this beside it as \`${name}-2\` would leave two pages nothing can tell apart afterwards. Address the standing page by \`id\` or \`slug\` where it is the one meant, or give this write values that fill the rule to something else, or state a \`name\`.`
  )
}

export function fixedPrefixOf(glob: string): string {
  const segments = glob.split("/")
  const star = segments.findIndex((one) => one.includes("*"))
  return star < 0 ? "" : segments.slice(0, star).join("/")
}

const MARKDOWN = ".md"

const BY_NAME = /^\*\*\/\*\.([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/

export function suffixOf(glob: string): string | null {
  const found = BY_NAME.exec(glob)
  return found === null ? null : (found[1] as string)
}

export function relPathFor(glob: string, name: string): string {
  if (!glob.includes("*")) return glob
  const slug = suffixOf(glob)
  if (slug !== null) return `pages/${slug}/${name}.${slug}${MARKDOWN}`
  const fixed = fixedPrefixOf(glob)
  return fixed === "" ? `${name}${MARKDOWN}` : `${fixed}/${name}${MARKDOWN}`
}

export function nameFromAt(glob: string, at: string): string | null {
  const colon = at.indexOf(":")
  const relPath = colon < 0 ? at : at.slice(colon + 1)
  if (!relPath.endsWith(MARKDOWN)) return null
  const slug = suffixOf(glob)
  if (slug !== null) {
    const tail = `.${slug}${MARKDOWN}`
    const base = relPath.split("/").pop() as string
    if (!base.endsWith(tail)) return null
    const stem = base.slice(0, base.length - tail.length)
    return stem === "" ? null : stem
  }
  const fixed = fixedPrefixOf(glob)
  const prefix = fixed === "" ? "" : `${fixed}/`
  if (!relPath.startsWith(prefix)) return null
  const name = relPath.slice(prefix.length, relPath.length - MARKDOWN.length)
  if (name === "") return null
  return relPathFor(glob, name) === relPath ? name : null
}

export const NAMED_FOR_DEFAULT = "{slug}"

export type Naming =
  | { readonly stated: true; readonly name: string }
  | { readonly stated: false; readonly stem: string }

export function nameForNew(
  op: string,
  pageTypeSlug: string,
  stated: string | undefined,
  values: Readonly<Record<string, Value>>,
  where: PageWhere | undefined,
  namedFor: string | null
): Naming {
  if (stated !== undefined && stated.trim() !== "") return { stated: true, name: stated.trim() }
  const slug = values.slug
  if (typeof slug === "string" && slug.trim() !== "") return { stated: true, name: slug.trim() }
  for (const one of where ?? []) {
    if ("eq" in one && one.key === "slug" && typeof one.eq === "string" && one.eq !== "") {
      return { stated: true, name: one.eq }
    }
  }
  const template = namedFor ?? NAMED_FOR_DEFAULT
  const constant = constantHolesIn(template)[0]
  if (constant !== undefined) {
    throw new FileWriteError(
      pageTypeSlug,
      `${op}(${pageTypeSlug}): \`${pageTypeSlug}\` is named \`${template}\`, and a file page carries no \`${constant}\` of its own — the row a file is read into settles that key, so every page of this type reads back the same value for it. A name filled from it is that constant rather than this page's own, so every page of the type would be named alike. Name the page type by a key its pages state, or give this write a \`slug\` or a \`name\`.`
    )
  }
  const filled = filledName(template, values)
  if (filled.ok) return { stated: false, stem: filled.stem }
  throw new FileWriteError(
    pageTypeSlug,
    `${op}(${pageTypeSlug}): a file page is named by the path it stands at, and this write states no name. \`${pageTypeSlug}\` is named \`${template}\`, and this write carries no \`${filled.holes.join(":`, no `")}:\`. State one of those, or give the write a \`slug\`, or pass \`name\` where the page sits below its page type's directory.`
  )
}
