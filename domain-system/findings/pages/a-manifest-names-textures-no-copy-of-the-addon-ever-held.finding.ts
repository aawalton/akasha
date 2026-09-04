import type { Finding } from "../finding.page-type.ts"

export const aManifestNamesTexturesNoCopyOfTheAddonEverHeld = {
  id: "01a06206-b008-7998-baeb-d97841fa6c37",
  pageTypeSlug: "finding",
  slug: "a-manifest-names-textures-no-copy-of-the-addon-ever-held",
  domainSlug: "domain/temper",
  claim:
    "Three akasha eso-addons name 31 `.dds` textures their manifests ship and nothing anywhere holds: TemperCrafting 13, LibHistoire 10, LibShifterBox 8. No `.dds` file exists under `temper/` or `akasha/temper/` outside build output, so the temper twin held none of them either. The migration carried an upstream fault across faithfully rather than losing anything, and `copy-metadata` refuses those three addons over it.",
  evidence:
    "Measured 2026-09-02 against the copier at `bf805b42c2`, by calling `namedFilePathOrNull` on every non-runtime-token name in each addon's `assets` and `xmlFiles`.\n\nTemperCrafting names 29, 13 reach nothing, all `.dds`: `DDS/cs.dds`, `DDS/lmb.dds`, `DDS/mmb.dds`, `DDS/rmb.dds` and nine more. LibHistoire names 12, 10 reach nothing: `histoire.dds`, `image/histy_down.dds`, `image/histy_over.dds`, `image/histy_up.dds` and six more. LibShifterBox names 10, 8 reach nothing: four `double_large_leftarrow_*` and four `double_large_rightarrow_*` under `bin/textures/`. Every one of the 31 is a `.dds`, and every `.xml` each of the three names does reach.\n\nA search for `*.dds` under `temper` and `akasha/temper`, outside build output, returns nothing at all. `temper/game-crafting-addon/metadata/` holds exactly nine files, `Bindings.xml` and eight XML under `XML/UI/`, and no `DDS/` folder. The LibHistoire and LibShifterBox twins were torn down at `fd76e54946` and `9559c9a9e7`, and recovering each from git shows its `metadata/` held one file, its XML.\n\nSo the textures were unreachable before anything moved. What changed is the refusal. `copy-metadata` used to stop at a bare ENOENT on the first one, and `namedFilePathsIn` now names all 13, all 10 and all 8 in one message, alongside the names the addon's own pages are loaded as.\n\nThe three addons cannot copy metadata until the textures are found upstream and landed, or the manifests stop naming them. Nothing in akasha can say which is right, because no copy of these addons in this repository's history ever held the files.",
} as const satisfies Finding
