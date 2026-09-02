import type { Finding } from "../finding.page-type.ts"

export const fiveAddonsDeclareArtTheCheckoutDoesNotHold = {
  id: "01a0629e-02c2-749e-b9c0-8790295631fc",
  pageTypeSlug: "finding",
  slug: "five-addons-declare-art-the-checkout-does-not-hold",
  domainSlug: "domain/temper",
  claim:
    "Five addons declare 91 texture files no folder in this checkout holds, so copying their metadata refuses and they cannot be built whole. Not one `.dds` is tracked or on disk anywhere in the repository. This predates the migration rather than being lost by it: the same files are absent from the pre-akasha folders too.",
  evidence:
    "Measured 2026-09-02 through `namedFilePathsIn` in `temper-addon-build/addon-metadata-files`, which is the function the old ops `copy-metadata` calls as well, so the refusal is not a recreation defect.\n\nBy addon and count of declared-but-absent files: TemperCollections 16, TemperNavigation 15, TemperCrafting 13, LibHistoire 10, LibShifterBox 8. Names are ordinary art: `Icons/Skyshard-collected.dds`, `art/reagent.dds`, `histoire.dds`, `bin/textures/double_large_leftarrow_up.dds`, `Chest_1.dds`.\n\n`git ls-files | grep -c '.dds$'` answers 0. A find over the working tree, node_modules excluded, answers 0. No `.gitignore` names the extension, so they are absent rather than untracked. No `.dds` was ever added across the 24,434 commits here either, but read that against the horizon: this repository's history begins 2026-08-25, so what it shows is that this checkout has never held the art, not that the art never existed. Where temper kept it before the 25th is unanswered from here.\n\nTemperCollections and TemperCrafting each fail twice, once from `akasha/temper/...` and once from the old `temper/game-...-addon` folder, which is how it is known the art was already missing before either was migrated.\n\nWhat it costs: `akasha temper-addon-build <one of these> --build-only` compiles the Lua and then refuses at the copy, naming every absent file. LibHistoire compiles 268,329 bytes and refuses. The other 54 addons on the roster build and copy whole.\n\nWhat it does not cost: nothing silently ships without its art. The refusal is loud and names the files.",
} as const satisfies Finding
