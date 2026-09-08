import { idOf, indexedRepo, pageOf } from "@akasha/indexes/indexing/testing"

export const SEATED_SLUG = "seated"

export const SEATED_PAGE = "akasha/seated/seated.module.ts"

const SEATED_CODE = "akasha/seated/seated.module.code.ts"

const WARDED_TYPE = "akasha/warded.page-type.ts"

export const WARDED_PAGE = "akasha/eight/warded-one.warded.ts"

export const WARDED_CODE = "akasha/eight/warded-one.warded.code.ts"

export const WARDED_SOPS = "akasha/eight/warded-one.warded.sops.yaml"

export const SECOND_PAGE = "akasha/eight/second.warded.ts"

export const WARDED_LANDS = "akasha/eight/carried.warded.ts"

export const WARDED_LANDS_CODE = "akasha/eight/carried.warded.code.ts"

export const WARDED_LANDS_SOPS = "akasha/eight/carried.warded.sops.yaml"

export const wardedAt: string = indexedRepo({
  [SEATED_PAGE]: pageOf({ id: idOf("0"), pageTypeSlug: "module", slug: SEATED_SLUG, code: "ts" }),
  [SEATED_CODE]: "export const kept = 5\n",
  [WARDED_TYPE]: pageOf({
    id: idOf("d"),
    pageTypeSlug: "page-type",
    slug: "warded",
    pluralSlug: "warded",
    extendsSlug: ["page-type/module"],
    properties: [
      { pagePropertySlug: "relation-property/note", required: false, many: false, secret: true },
    ],
  }),
  [WARDED_PAGE]: pageOf({ id: idOf("e"), pageTypeSlug: "warded", slug: "warded-one", code: "ts" }),
  [WARDED_CODE]: "export const kept = 6\n",
  [WARDED_SOPS]: "kept: ENC[held]\n",
  [SECOND_PAGE]: pageOf({ id: idOf("f"), pageTypeSlug: "warded", slug: "second" }),
})
