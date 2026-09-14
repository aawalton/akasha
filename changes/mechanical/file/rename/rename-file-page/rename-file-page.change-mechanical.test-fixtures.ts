import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  type Reaching,
  type World,
  worldAt,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/changes/runners/pages/test-change-running/test-change-running.change-runner.code.ts"
import { relationFiled } from "akasha/pages/indexes/modules/reading/index-reading.module.test-fixtures.ts"
import {
  bodyOf,
  indexedRepo,
  pageOf,
} from "akasha/pages/indexes/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

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
  [SEATED_PAGE]: pageOf({ id: oneId("01"), pageTypeSlug: "module", slug: SEATED_SLUG, code: "ts" }),
  [SEATED_CODE]: "export const kept = 5\n",
  [WARDED_TYPE]: pageOf({
    id: oneId("02"),
    pageTypeSlug: "page-type",
    slug: "warded",
    pluralSlug: "warded",
    extends: ["page-type/module"],
    properties: [
      { pagePropertySlug: "relation-property/note", required: false, many: false, secret: true },
    ],
  }),
  [WARDED_PAGE]: pageOf({
    id: oneId("03"),
    pageTypeSlug: "warded",
    slug: "warded-one",
    code: "ts",
  }),
  [WARDED_CODE]: "export const kept = 6\n",
  [WARDED_SOPS]: "kept: ENC[held]\n",
  [SECOND_PAGE]: pageOf({ id: oneId("04"), pageTypeSlug: "warded", slug: "second" }),
  [OWNED_PAGE]: pageOf({ id: oneId("05"), pageTypeSlug: "module", slug: "owned", code: "ts" }),
  [OWNED_CODE]: "export const kept = 7\n",
  [OWNED_UNDER]: "kept\n",
  "akasha/test-fixtures.file-property.ts": bodyOf({
    id: oneId("06"),
    pageTypeSlug: "file-property",
    slug: "test-fixtures",
    propertySlug: "test-fixtures",
  }),
  "akasha/page-property-entry.page-type.ts": bodyOf({
    id: oneId("07"),
    pageTypeSlug: "page-type",
    slug: "page-property-entry",
    extends: ["page-type/page-property"],
    properties: [],
  }),
  "akasha/sessions.page-property-entry.ts": bodyOf({
    id: oneId("08"),
    pageTypeSlug: "page-property-entry",
    slug: "sessions",
    propertySlug: "sessions",
  }),
  [WIDE_PAGE]: pageOf({
    id: oneId("09"),
    pageTypeSlug: "module",
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
    pageTypeSlug: "page-type",
    slug: "file-property",
    pluralSlug: "file-properties",
    extends: ["page-type/page-property"],
  }),
  "akasha/entries.file-property.ts": pageOf({
    id: oneId("0b"),
    pageTypeSlug: "file-property",
    slug: "entries",
    propertySlug: "entries",
  }),
  "akasha/kept.page-type.ts": pageOf({
    id: oneId("0c"),
    pageTypeSlug: "page-type",
    slug: "kept",
    pluralSlug: "kepts",
    extends: ["page-type/module"],
    properties: [
      {
        pagePropertySlug: "file-property/entries",
        required: false,
        many: false,
        uncommitted: true,
        default: "jsonl",
      },
    ],
  }),
  [KEPT_PAGE]: pageOf({ id: oneId("0d"), pageTypeSlug: "kept", slug: "first" }),
  [KEPT_ENTRIES]: '{"kind":"add"}\n',
  "akasha/workspace-manifest.file-property.ts": pageOf({
    id: oneId("0e"),
    pageTypeSlug: "file-property",
    slug: "workspace-manifest",
    propertySlug: "workspace-manifest",
    fileName: "package.json",
  }),
  [PACKAGE_TYPE_AT]: pageOf({
    id: oneId("0f"),
    pageTypeSlug: "page-type",
    slug: "workspace-package",
    pluralSlug: "workspace-packages",
    extends: ["page-type/domain"],
    properties: [
      { pagePropertySlug: "file-property/workspace-manifest", required: true, many: false },
    ],
  }),
  "akasha/nine/nine.workspace-package.ts": pageOf({
    id: oneId("10"),
    pageTypeSlug: "workspace-package",
    slug: "nine",
    workspaceManifest: "json",
  }),
  [WAY_MANIFEST]: WAY_BODY,
  [WAY_PAGE]: pageOf({ id: oneId("11"), pageTypeSlug: "module", slug: "ninth", code: "ts" }),
  [WAY_CODE]: "export const kept = 8\n",
})

export const RUNS: Reaching = running

export function worldIn(root: string, textOf: (path: string) => string | null): World {
  return worldAt(root, textOf, RUNS)
}
