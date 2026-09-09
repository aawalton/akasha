import { idOf, indexedRepo, pageOf } from "@akasha/indexes/indexing/testing"
import { refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import {
  type Reaching,
  type World,
  worldAt,
} from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { runChange as changeManifestWays } from "../../../file-content/change/change-manifest-ways/change-manifest-ways.change-mechanical-file-content.code.ts"
import { runChange as changePageProperty } from "../../../file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.code.ts"
import { runChange as changeImports } from "../../../file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import { runChange as renameExport } from "../../../file-content/rename/rename-export/rename-export.change-mechanical-file-content.code.ts"
import { runChange as renamePageAddress } from "../../../file-content/rename/rename-page-address/rename-page-address.change-mechanical-file-content.code.ts"
import { runChange as renamePageSlug } from "../../../file-content/rename/rename-page-slug/rename-page-slug.change-mechanical-file-content.code.ts"
import { runChange as moveFile } from "../../move/move-file/move-file.change-mechanical-file.code.ts"
import { runChange as moveFileCode } from "../../move/move-file-code/move-file-code.change-mechanical.code.ts"

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

export const ownedAt: string = indexedRepo({
  [OWNED_PAGE]: pageOf({ id: idOf("d"), pageTypeSlug: "module", slug: "owned", code: "ts" }),
  [OWNED_CODE]: "export const kept = 7\n",
  [OWNED_UNDER]: "kept\n",
})

const wayId = (one: string): string => `01a04a4a-0003-7000-8000-00000000000${one}`

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

export const wayAt: string = indexedRepo({
  "akasha/file-property.page-type.ts": pageOf({
    id: wayId("0"),
    pageTypeSlug: "page-type",
    slug: "file-property",
    pluralSlug: "file-properties",
    extendsSlug: ["page-type/page-property"],
  }),
  "akasha/manifest.file-property.ts": pageOf({
    id: wayId("1"),
    pageTypeSlug: "file-property",
    slug: "manifest",
    propertySlug: "manifest",
    fileName: "package.json",
  }),
  "akasha/workspace-package.page-type.ts": pageOf({
    id: wayId("2"),
    pageTypeSlug: "page-type",
    slug: "workspace-package",
    pluralSlug: "workspace-packages",
    extendsSlug: ["page-type/domain"],
    properties: [{ pagePropertySlug: "file-property/manifest", required: true, many: false }],
  }),
  "akasha/nine/nine.workspace-package.ts": pageOf({
    id: wayId("3"),
    pageTypeSlug: "workspace-package",
    slug: "nine",
    manifest: "json",
  }),
  [WAY_MANIFEST]: WAY_BODY,
  [WAY_PAGE]: pageOf({ id: wayId("4"), pageTypeSlug: "module", slug: "ninth", code: "ts" }),
  [WAY_CODE]: "export const kept = 8\n",
})

export const RUNS: Reaching = async (world, at, given) => {
  if (at === "change-mechanical-file-content/rename-page-slug") {
    return await renamePageSlug(world, given as Parameters<typeof renamePageSlug>[1])
  }
  if (at === "change-mechanical-file/move-file") {
    return moveFile(world, given as Parameters<typeof moveFile>[1])
  }
  if (at === "change-mechanical/move-file-code") {
    return await moveFileCode(world, given as Parameters<typeof moveFileCode>[1])
  }
  if (at === "change-mechanical-file-content/change-page-page-property") {
    return changePageProperty(world, given as Parameters<typeof changePageProperty>[1])
  }
  if (at === "change-mechanical-file-content/change-manifest-ways") {
    return changeManifestWays(world, given as Parameters<typeof changeManifestWays>[1])
  }
  if (at === "change-mechanical-file-content/rename-export") {
    return renameExport(world, given as Parameters<typeof renameExport>[1])
  }
  if (at === "change-mechanical-file-content/change-imports") {
    return changeImports(world, given as Parameters<typeof changeImports>[1])
  }
  if (at === "change-mechanical-file-content/rename-page-address") {
    return await renamePageAddress(world, given as Parameters<typeof renamePageAddress>[1])
  }
  return refusing(`\`${at}\` is reached by nothing here`)
}

export function worldIn(root: string, textOf: (path: string) => string | null): World {
  return worldAt(root, textOf, RUNS)
}
