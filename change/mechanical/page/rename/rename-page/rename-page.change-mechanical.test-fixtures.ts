import { type Answer, stating } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  type Reaching,
  type World,
  worldAt,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  treeClaimed,
  treeUnder,
} from "akasha/change/modules/shadow-tree/change-shadow-tree.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { workspaceManifest } from "akasha/code/workspace/properties/workspace-manifest.file-property.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import { fileProperty } from "akasha/page/file-property/file-property.page-type.ts"
import { relationFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import {
  bodyOf,
  HELD_SLUG,
  idOf,
  indexedRepo,
  pageOf,
  put,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { entries } from "akasha/page/properties/entries.file-property.ts"
import { pageProperty } from "akasha/page/type/page-property/page-property.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const MODULE_AT = `${pageType.slug}/${module.slug}` as const

const PAGE_PROPERTY_AT = `${pageType.slug}/${pageProperty.slug}` as const

const DOMAIN_AT = `${pageType.slug}/${domain.slug}` as const

const ENTRIES_AT = `${fileProperty.slug}/${entries.slug}` as const

const WORKSPACE_MANIFEST_AT = `${fileProperty.slug}/${workspaceManifest.slug}` as const

const typeAt = (slug: string): string => `${pageType.slug}/${slug}`

const PAGE_TYPE_AT = typeAt(pageType.slug)

export function movesOf(said: Answer): readonly (readonly [string, string])[] {
  const found: (readonly [string, string])[] = []
  for (const one of said.edits) {
    if (one.kind === "move") found.push([one.pathFrom, one.pathTo])
  }
  return found
}

export const SEATED_SLUG = "seated"

export const SEATED_PAGE = "akasha/seated/seated.module.ts"

const SEATED_CODE = "akasha/seated/seated.module.code.ts"

const WARDED_TYPE = "akasha/warded.page-type.ts"

export const WARDED_PAGE = "akasha/eight/warded-one.warded.ts"

export const WARDED_CODE = "akasha/eight/warded-one.warded.code.ts"

export const WARDED_SOPS = "akasha/eight/warded-one.warded.sops.yaml"

export const SECOND_PAGE = "akasha/eight/second.warded.ts"

export const OWNED_PAGE = "akasha/owned/owned.module.ts"

export const OWNED_CODE = "akasha/owned/owned.module.code.ts"

export const OWNED_UNDER = "akasha/owned/pages/kept.md"

export const OWNED_LANDS = "akasha/carried/pages/kept.md"

export const WARDED_LANDS = "akasha/eight/carried.warded.ts"

export const WARDED_LANDS_CODE = "akasha/eight/carried.warded.code.ts"

export const WARDED_LANDS_SOPS = "akasha/eight/carried.warded.sops.yaml"

export const WIDE_PAGE = "akasha/four/wide.module.ts"

export const WIDE_CODE = "akasha/four/wide.module.code.ts"

export const WIDE_SESSIONS = "akasha/four/wide.module.sessions.jsonl"

export const WIDE_FIXTURES = "akasha/four/wide.module.test-fixtures.ts"

export const KEPT_PAGE = "akasha/kepts/first/first.kept.ts"

export const KEPT_ENTRIES = "akasha/kepts/first/first.kept.entries.uncommitted.jsonl"

export const KEPT_LANDS = "akasha/kepts/carried/carried.kept.ts"

export const KEPT_LANDS_ENTRIES = "akasha/kepts/carried/carried.kept.entries.uncommitted.jsonl"

export const WAY_MANIFEST = "akasha/nine/package.json"

export const WAY_PAGE = "akasha/nine/ninth/ninth.module.ts"

const WAY_CODE = "akasha/nine/ninth/ninth.module.code.ts"

const WAY_BODY = `{
  "name": "@akasha/nine",
  "exports": {
    "./ninth": "./ninth/ninth.module.code.ts"
  }
}
`

const oneId = (one: string): string => `01a04a4a-0005-7000-8000-0000000000${one}`

const PACKAGE_TYPE_AT = "akasha/workspace-package.page-type.ts"

function packaged(bodies: Readonly<Record<string, string>>): string {
  const root = indexedRepo(bodies)
  relationFiled(root, oneId("0e"), "page-property", oneId("0f"), [{ path: PACKAGE_TYPE_AT }])
  return root
}

export const pagesAt: string = packaged({
  [SEATED_PAGE]: pageOf({ id: oneId("01"), type: MODULE_AT, slug: SEATED_SLUG, code: "ts" }),
  [SEATED_CODE]: "export const kept = 5\n",
  [WARDED_TYPE]: pageOf({
    id: oneId("02"),
    type: PAGE_TYPE_AT,
    slug: "warded",
    pluralSlug: "warded",
    extends: [MODULE_AT],
    properties: [
      { pagePropertySlug: "relation-property/note", required: false, many: false, secret: true },
    ],
  }),
  [WARDED_PAGE]: pageOf({
    id: oneId("03"),
    type: typeAt("warded"),
    slug: "warded-one",
    code: "ts",
  }),
  [WARDED_CODE]: "export const kept = 6\n",
  [WARDED_SOPS]: "kept: ENC[held]\n",
  [SECOND_PAGE]: pageOf({ id: oneId("04"), type: typeAt("warded"), slug: "second" }),
  [OWNED_PAGE]: pageOf({ id: oneId("05"), type: MODULE_AT, slug: "owned", code: "ts" }),
  [OWNED_CODE]: "export const kept = 7\n",
  [OWNED_UNDER]: "kept\n",
  "akasha/test-fixtures.file-property.ts": bodyOf({
    id: oneId("06"),
    type: typeAt(fileProperty.slug),
    slug: "test-fixtures",
    propertySlug: "test-fixtures",
  }),
  "akasha/page-property-entry.page-type.ts": bodyOf({
    id: oneId("07"),
    type: PAGE_TYPE_AT,
    slug: "page-property-entry",
    extends: [PAGE_PROPERTY_AT],
    properties: [],
  }),
  "akasha/sessions.page-property-entry.ts": bodyOf({
    id: oneId("08"),
    type: typeAt("page-property-entry"),
    slug: "sessions",
    propertySlug: "sessions",
  }),
  [WIDE_PAGE]: pageOf({
    id: oneId("09"),
    type: MODULE_AT,
    slug: "wide",
    code: "ts",
    testFixtures: "ts",
    sessions: "jsonl",
  }),
  [WIDE_CODE]: "export const kept = 3\n",
  [WIDE_FIXTURES]: "export const set = 4\n",
  [WIDE_SESSIONS]: "{}\n",
  "akasha/file-property.page-type.ts": pageOf({
    id: oneId("0a"),
    type: PAGE_TYPE_AT,
    slug: "file-property",
    pluralSlug: "file-properties",
    extends: [PAGE_PROPERTY_AT],
  }),
  "akasha/entries.file-property.ts": pageOf({
    id: oneId("0b"),
    type: typeAt(fileProperty.slug),
    slug: entries.slug,
    propertySlug: entries.propertySlug,
  }),
  "akasha/kept.page-type.ts": pageOf({
    id: oneId("0c"),
    type: PAGE_TYPE_AT,
    slug: "kept",
    pluralSlug: "kepts",
    extends: [MODULE_AT],
    properties: [
      {
        pagePropertySlug: ENTRIES_AT,
        required: false,
        many: false,
        uncommitted: true,
        default: "jsonl",
      },
    ],
  }),
  [KEPT_PAGE]: pageOf({ id: oneId("0d"), type: typeAt("kept"), slug: "first" }),
  [KEPT_ENTRIES]: '{"kind":"add"}\n',
  "akasha/workspace-manifest.file-property.ts": pageOf({
    id: oneId("0e"),
    type: typeAt(fileProperty.slug),
    slug: workspaceManifest.slug,
    propertySlug: workspaceManifest.propertySlug,
    fileName: "package.json",
  }),
  [PACKAGE_TYPE_AT]: pageOf({
    id: oneId("0f"),
    type: PAGE_TYPE_AT,
    slug: "workspace-package",
    pluralSlug: "workspace-packages",
    extends: [DOMAIN_AT],
    properties: [{ pagePropertySlug: WORKSPACE_MANIFEST_AT, required: true, many: false }],
  }),
  "akasha/nine/nine.workspace-package.ts": pageOf({
    id: oneId("10"),
    type: typeAt("workspace-package"),
    slug: "nine",
    workspaceManifest: "json",
  }),
  [WAY_MANIFEST]: WAY_BODY,
  [WAY_PAGE]: pageOf({ id: oneId("11"), type: MODULE_AT, slug: "ninth", code: "ts" }),
  [WAY_CODE]: "export const kept = 8\n",
})

export const OTHER_SLUG = "other-one"

export const OTHER_PAGE = "akasha/three/other-one.module.ts"

export const OTHER_CODE = "akasha/three/other-one.module.code.ts"

export const SHARED_PAGE = "akasha/ten/shared-one.module.ts"

export const SHARED_CODE = "akasha/ten/shared-one.module.code.ts"

const SHARED_BESIDE = "akasha/ten/second-here.module.ts"

export const LONE_PAGE = "akasha/eleven/lone-one.module.ts"

export const HOLDER_PAGE = "akasha/holders/holders.module.ts"

export const HOLDER_CHILD = "akasha/holders/modules/holder-one/holder-one.module.ts"

export const HOLDER_KEPT = "akasha/holders/pages/only-one.module.ts"

const OTHER_VALUE = { id: idOf("f"), type: MODULE_AT, slug: OTHER_SLUG, code: "ts" }

const statedAs = (value: Record<string, unknown>, named: string): string =>
  bodyOf(value).replace("export const it", `export const ${named}`)

export const otherAt: string = indexedRepo({
  [OTHER_PAGE]: statedAs(OTHER_VALUE, "otherOne"),
  [OTHER_CODE]: "export const kept = 2\n",
  [SHARED_PAGE]: pageOf({ id: idOf("0"), type: MODULE_AT, slug: "shared-one", code: "ts" }),
  [SHARED_CODE]: "export const kept = 9\n",
  [SHARED_BESIDE]: pageOf({ id: idOf("d"), type: MODULE_AT, slug: "second-here" }),
  [LONE_PAGE]: pageOf({ id: idOf("1"), type: MODULE_AT, slug: "lone-one" }),
  [HOLDER_PAGE]: pageOf({ id: idOf("2"), type: MODULE_AT, slug: "holders" }),
  [HOLDER_CHILD]: pageOf({ id: idOf("3"), type: MODULE_AT, slug: "holder-one" }),
  [HOLDER_KEPT]: pageOf({ id: idOf("4"), type: MODULE_AT, slug: "only-one" }),
})

const TYPED_SLUG = "typed-one"

export const TYPED_PAGE = "akasha/five/typed-one.module.ts"

export const TYPED_LANDS = "akasha/carried/carried.module.ts"

const READER_PAGE = "akasha/six/reader.module.ts"

export const READER_CODE = "akasha/six/reader.module.code.ts"

export function readerBody(named: string, at: string): string {
  return `import type { ${named} } from "${at}"\n\nexport const reader: ${named} = "one"\n`
}

export const typedAt: string = indexedRepo({
  [TYPED_PAGE]: `export type TypedOne = string\n\n${pageOf({
    id: idOf("d"),
    type: MODULE_AT,
    slug: TYPED_SLUG,
  })}`,
  [READER_PAGE]: pageOf({ id: idOf("e"), type: MODULE_AT, slug: "reader", code: "ts" }),
  [READER_CODE]: readerBody("TypedOne", `../five/${TYPED_SLUG}.module.ts`),
})

export const SPELLER_CODE = "akasha/eight/speller.module.code.ts"

export const heldAt: string = indexedRepo({
  "akasha/eight/speller.module.ts": pageOf({
    id: idOf("c"),
    type: MODULE_AT,
    slug: "speller",
    code: "ts",
  }),
  [SPELLER_CODE]: `export const at = "module/${HELD_SLUG}"\n`,
})

export const ADDRESSED_PAGE = "akasha/twelve/addressed-one.module.ts"

export const addressedAt: string = indexedRepo({
  [ADDRESSED_PAGE]: pageOf({ id: idOf("b"), type: MODULE_AT, slug: "addressed-one" }),
})

export const RUNS: Reaching = running

export function worldIn(root: string, textOf: (path: string) => string | null): World {
  return worldAt(root, textOf, RUNS)
}

const CLAIMED_AT = ".react-router"

export const CLAIMER_PAGE = "akasha/claimed/claimer.module.ts"

export const CLAIMER_UNDER = `akasha/claimed/${CLAIMED_AT}/types/routes.ts`

export const CLAIMER_LANDS = `akasha/carried/${CLAIMED_AT}/types/routes.ts`

type Claiming = { readonly root: string; readonly world: World }

export function claimingAt(): Claiming {
  const root = indexedRepo({
    [CLAIMER_PAGE]: pageOf({ id: oneId("12"), type: MODULE_AT, slug: "claimer" }),
  })
  put(root, CLAIMER_UNDER, "export const routes = 1\n")
  const world = worldIn(root, textIn(root))
  const face = {
    ...world.index,
    folderPropertiesAt: () =>
      new Map([
        [
          "module",
          new Map([["routes", { folderName: CLAIMED_AT, pageTypeSlug: "build-folder-property" }]]),
        ],
      ]),
  }
  return {
    root,
    world: {
      ...world,
      under: (folder: string) => treeUnder(root, folder, face, stating([])),
      claimed: (folder: string) => treeClaimed(root, folder, face, stating([])),
    },
  }
}
