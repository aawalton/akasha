import type { Finding } from "../finding.page-type.ts"

export const theNavigationAddonNamesFifteenImagesThatAreNotInTheRepository = {
  id: "01a0628f-952c-7f64-b92b-e691d5388a00",
  pageTypeSlug: "finding",
  slug: "the-navigation-addon-names-fifteen-images-that-are-not-in-the-repository",
  domainSlug: "domain/temper",
  claim:
    "The navigation add-on's manifest lists fifteen assets, every one a DDS image, and not one of them is in this repository. The list came across from `temper/game-navigation-addon/addon.json` unchanged when the add-on was recreated as `temper-navigation-addon`, so the recreation ships the same dead paths the original did: the pin icons for chests, lorebooks, scrolls, skyshards and treasure maps, the minimap's view-limit mask and the world map frame draw nothing.",
  evidence:
    "`akasha/temper/temper-navigation-addon/temper-navigation-addon.eso-addon.addon-manifest.json` carries `assets` naming Chest_1.dds, Chest_2.dds, Lorebook_1.dds, Lorebook_1-2.dds, Lorebook_2.dds, Lorebook_2-2.dds, Scroll_1.dds, Skyshard_1.dds, Treasure_1.dds, Treasure_1-2.dds, Treasure_2.dds, Treasure_3.dds, Treasure_4.dds, ViewLimit.dds and WorldMapFrame.dds. `git ls-files | grep -c '\\.dds$'` answers 0 at `a6872ca0e5`, and the same fifteen stood in the temper original's `addon.json` at `a6872ca0e5^`, so nothing was lost in the move: the images were never here. The crafting add-on's thirteen missing images are the same shape, counted as TemperCrafting 13 in `a-manifest-names-textures-no-copy-of-the-addon-ever-held`. Either the images live in a place no part of this repository names, and every add-on manifest naming them is depending on it, or the paths have been dead since they were written.",
} as const satisfies Finding
