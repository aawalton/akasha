import { FileWriteError } from "../file-write-error/file-write-error.module.code.ts"

export type Backed = {
  readonly slug: string
  readonly repo: string | null
  readonly glob: string | null
  readonly heldBy: readonly string[]
  readonly namedFor: string | null
}

export type Roster = {
  readonly types: ReadonlyMap<string, Backed>
  readonly unreadBecause: string | null
}

export type Filed = Backed & { readonly glob: string; readonly repo: string }

const NO_ROSTER =
  "`@akasha/pages-system-service` answers for the pages akasha holds and says nothing about which repository a page type's files sit in, what glob names those files, or which page carries a type's rows. There is no roster of file backings left to read, so nothing here can place a page type's pages."

const NO_TYPES: ReadonlyMap<string, Backed> = new Map()

export function backings(): Promise<Roster> {
  return Promise.resolve({ types: NO_TYPES, unreadBecause: NO_ROSTER })
}

export function filedUnder(op: string, pageTypeSlug: string): Promise<Filed> {
  throw new FileWriteError(
    pageTypeSlug,
    `${op}(${pageTypeSlug}): ${NO_ROSTER} Nothing has been written. Where a page belongs is a question for \`@akasha/pages-system-service\`, which places a page from the index rather than from a glob a caller hands over.`
  )
}
