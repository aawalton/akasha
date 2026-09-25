import {
  listedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  importedFrom,
  bodyOf as pageBodyOf,
} from "akasha/page/modules/body/page-body.module.code.ts"
import { ownRepoRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const SUBAGENT = "subagent"

const SEAT = "seat"

const PAGE_TYPE = "page-type"

const TYPES = "types"

const TS = "ts"

const KIND = "subagent-kind"

const DISPATCHED_AS = "dispatchedAs"

const KEYS: readonly string[] = [
  "id",
  "type",
  "slug",
  "principalSeatName",
  "assignmentSlug",
  DISPATCHED_AS,
  "subagentKind",
  "agentId",
]

function typedFrom(root: string): string {
  const page = listedAt(root, PAGE_TYPE, SUBAGENT)[0]
  const at = page === undefined ? null : besideAt(page.path, TYPES, TS)
  if (at === null) throw new Error(`no \`${PAGE_TYPE}\` is slugged \`${SUBAGENT}\``)
  return importedFrom(at)
}

export function kindOf(root: string, dispatchedAs: string): string | null {
  for (const one of valuesOfType(root, KIND)) {
    const slug = one.value.slug
    if (one.value[DISPATCHED_AS] === dispatchedAs && typeof slug === "string") {
      return namedAs(KIND, slug, null)
    }
  }
  return null
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
      type: namedAs(PAGE_TYPE, SUBAGENT, null),
      slug,
      principalSeatName: namedAs(SEAT, seatName, null),
      assignmentSlug,
      dispatchedAs,
      subagentKind: kindOf(root, dispatchedAs) ?? undefined,
      agentId,
    },
  })
}
