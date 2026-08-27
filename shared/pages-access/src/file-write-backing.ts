import { askPageTypes, type Backed } from "@shared/pages-query/ask"
import { FileWriteError } from "./file-write-error"

export type Roster = {
  readonly types: ReadonlyMap<string, Backed>
  readonly unreadBecause: string | null
}

let roster: ReadonlyMap<string, Backed> | null = null
let asking: Promise<Roster> | null = null

export function setFileBackings(types: Iterable<Backed>): undefined {
  roster = new Map([...types].map((one) => [one.slug, one]))
  asking = null
}

export function forgetFileBackings(): undefined {
  roster = null
  asking = null
}

export async function backings(): Promise<Roster> {
  if (roster !== null) return { types: roster, unreadBecause: null }
  asking ??= askPageTypes().then((asked) => {
    asking = null
    if (!asked.ok) return { types: new Map<string, Backed>(), unreadBecause: asked.why }
    roster = new Map(asked.types.map((one) => [one.slug, one]))
    return { types: roster, unreadBecause: null }
  })
  return asking
}

export async function fileBackingOf(pageTypeSlug: string): Promise<Backed | null> {
  return (await backings()).types.get(pageTypeSlug) ?? null
}

export type Filed = Backed & { readonly glob: string; readonly repo: string }

export async function filedUnder(op: string, pageTypeSlug: string): Promise<Filed> {
  const asked = await backings()
  const backed = asked.types.get(pageTypeSlug) ?? null
  if (backed === null) {
    if (asked.unreadBecause !== null) {
      throw new FileWriteError(
        pageTypeSlug,
        `${op}(${pageTypeSlug}): the roster of file-backed page types went unread — ${asked.unreadBecause} — so nothing here can say where this page type's pages stand, or whether it is file-backed at all. This is the page query service being unreachable, not this page type having no backing. Nothing has been written.`
      )
    }
    throw new FileWriteError(
      pageTypeSlug,
      `${op}(${pageTypeSlug}): this page type reads from files, and the page query service names no backing for it, so nothing here knows where its pages stand. Its reads and its writes would answer from different places.`
    )
  }
  if (backed.glob === null || backed.repo === null) {
    const held = backed.heldBy.length === 0 ? "nothing" : backed.heldBy.join(", ")
    throw new FileWriteError(
      pageTypeSlug,
      `${op}(${pageTypeSlug}): this page type has no file of its own — its pages stand as rows inside another page, held by ${held}. Which parent page a row belongs to is a fact only the caller holds, so nothing here can route this. Write it with \`writeRow\`, \`writeRows\` or \`patchRow\` from \`@shared/pages-query\`, naming the parent page.`
    )
  }
  return { ...backed, glob: backed.glob, repo: backed.repo }
}
