import type { Finding } from "../finding.page-type.ts"

export const theCraftingAddonNamesThirteenImagesThatAreNotInTheRepository = {
  id: "01a06181-d385-7de4-829b-ccd401717cae",
  pageTypeSlug: "finding",
  slug: "the-crafting-addon-names-thirteen-images-that-are-not-in-the-repository",
  domainSlug: "domain/temper",
  claim:
    "`temper/game-crafting-addon/addon.json` lists twenty-two assets. Eight are the XML documents beside it. The other thirteen are image files under DDS/ and art/, and not one of them is in this repository. A build that copies the asset list fails on the first of them, and the add-on's mouse-button icons and reagent grid draw nothing.",
  evidence:
    "`find . -name '*.dds'` outside node_modules answers nothing, and `git ls-files | grep dds` answers two files, neither of them an image: a file-kind page and a story chapter. The thirteen are DDS/cs.dds, DDS/lmb.dds, DDS/mmb.dds, DDS/rmb.dds, DDS/skyshard.dds, art/Poison_disabled.dds, art/Poison_down.dds, art/Poison_over.dds, art/Poison_up.dds, art/griditem_outline.dds, art/reagent.dds, art/yes.dds and art/no.dds. `src/lang/shared.ts` writes three of them as `|t16:16:TemperCrafting/DDS/lmb.dds|t` and every locale table reuses them. `src/potion-maker/constants.ts` names `TemperCrafting/art/reagent.dds` and `TemperCrafting/art/gridItem_outline.dds`, the second with a capital I that the asset list writes lowercase. So the add-on has been shipping with these paths dead for as long as they have been written, or the images live somewhere no part of this repository names.",
} as const satisfies Finding
