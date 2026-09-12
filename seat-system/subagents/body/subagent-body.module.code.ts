import { importedFrom, bodyOf as pageBodyOf } from "akasha/pages/body/page-body.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { ownRepoRoot } from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"

const SUBAGENT = "subagent"

const PAGE_TYPE = "page-type"

const TYPES = "types"

const TS = "ts"

const KEYS: readonly string[] = [
  "id",
  "type",
  "slug",
  "principalSeatName",
  "assignmentSlug",
  "dispatchedAs",
  "agentId",
]

function typedFrom(root: string): string {
  const page = listedAt(root, PAGE_TYPE, SUBAGENT)[0]
  const at = page === undefined ? null : besideAt(page.path, TYPES, TS)
  if (at === null) throw new Error(`no \`${PAGE_TYPE}\` is slugged \`${SUBAGENT}\``)
  return importedFrom(at)
}

export function bodyOf(
  slug: string,
  seatName: string,
  assignmentSlug: string,
  dispatchedAs: string,
  agentId: string,
  id: string | null = null,
  root: string = ownRepoRoot()
): string {
  return pageBodyOf({
    pageTypeSlug: SUBAGENT,
    slug,
    importFrom: typedFrom(root),
    keys: KEYS,
    values: {
      id: id ?? undefined,
      type: SUBAGENT,
      slug,
      principalSeatName: seatName,
      assignmentSlug,
      dispatchedAs,
      agentId,
    },
  })
}
