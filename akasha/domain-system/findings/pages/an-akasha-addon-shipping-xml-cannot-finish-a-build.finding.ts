import type { Finding } from "../finding.page-type.ts"

export const anAkashaAddonShippingXmlCannotFinishABuild = {
  id: "01a061c6-84f5-78c3-93dd-e99b7a26b7b8",
  pageTypeSlug: "finding",
  slug: "an-akasha-addon-shipping-xml-cannot-finish-a-build",
  domainSlug: "domain/temper",
  claim:
    "`LibMediaProvider` compiles to Lua out of akasha and then exits 70 copying its metadata. The copy step reads an addon's XML, assets and extra Lua out of a `metadata/` folder inside the addon, and an akasha package holds none: its twelve XML documents are eso-interface pages, each beside a `<slug>.eso-interface.markup.xml`. Every akasha addon that ships XML stops here.",
  evidence:
    "Measured 2026-09-02 at `aa8afbd442`. Building `LibMediaProvider` writes `temper/addons/dist/LibMediaProvider/LibMediaProvider.lua` and its load order, then fails with `ENOENT: no such file or directory, copyfile 'akasha/temper/temper-lib-media-provider/metadata/fontstrings_shared.xml'`.\n\n`tools/commands/temper/addon/copy-metadata.ts` builds `metadataDir` as `join(addonDir, \"metadata\")` and reads five things out of it: `<name>.xml`, `Bindings.xml`, every directory under it, each path in `assets`, and each path in `xmlFiles.beforeBundle` and `xmlFiles.afterBundle`. The first two fall back to an empty document, and the last three throw.\n\nThe manifest that landed beside the page is a byte copy of the source `addon.json`, so it names `fontstrings_shared.xml`, `PC/` and `Console/` as the source folder laid them out. The akasha package holds the same twelve documents at `akasha/temper/temper-lib-media-provider/<slug>/<slug>.eso-interface.markup.xml`, one to a folder, each beside an `eso-interface` page.\n\nSo the manifest and the pages disagree about where an XML document is, and nothing reconciles them. `eso-addon` carries `interfaceSlugs`, a relation to the eso-interface pages, which is the record that could answer, and no seam reads it. The mend is for the copy step to take an akasha addon's XML from the pages `interfaceSlugs` names and to keep reading `metadata/` for a source addon, the way `addonManifestPathIn` reads a manifest at either spelling.\n\n`Bindings.xml` has the same shape and no landed addon exercises it yet: the page property `bindings` names a file beside the page, and the copy step looks only in `metadata/`.",
} as const satisfies Finding
