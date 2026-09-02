import type { Finding } from "../finding.page-type.ts"

export const theEsoDeclarationGateIsOpenForANewPackage = {
  id: "01a060ec-47c0-7551-b7cc-402c01503bca",
  pageTypeSlug: "finding",
  slug: "the-eso-declaration-gate-is-open-for-a-new-package",
  domainSlug: "workspace-package/temper-eso-types",
  claim:
    "A new akasha package reaches the game's globals by importing one declaration file of `@akasha/temper-eso-types` for its side effect and naming that package as a dependency. No `declare global` of its own is wanted. The import is not optional: an audit roots every file, so the declarations are ambient across the whole tree, while a write roots the changed file's import closure alone. A module naming a global without the import is refused at write time and would land clean at audit.",
  evidence:
    'Eighteen addon-side modules landed in one commit, `b29193f80e22ab90f2c49b24b0b4082c017db2ea`: fifteen catalog collectors in `temper-game-catalog-capture-addon` and three modules in the eso-addon package `temper-capture-sales-addon`. 37 checks judged the 42 paths and none refused. `akasha audit --check typecheck` then judged 26566 files and refused none, so the roughly 260 refusals earlier seats reported are gone from the tree. The route copies `temper-addon-init`, which opens with `import "@akasha/temper-eso-types/eso-event-manager"`. Which declaration file a name lives in was worked out by indexing every `declare` across the 69 files of `temper-eso-types` and the 31 of `temper-addon-library-types`, then covering the names each module reads. `GetString` was the only name found in two files, `eso-globals` and `eso-functions-01`, and either answers. Twenty-one declaration files carried the whole set: `eso-globals`, `eso-api`, `eso-api-2`, seven of the `eso-enums-*`, eight of the `eso-functions-*`, `tstl-language-extensions`, and `lib-histoire` from the library set. `tstl-language-extensions` is wanted wherever a module destructures a multiple return, since that is where `LuaMultiReturn` is declared. Nothing the eighteen modules name was missing from the shared set. This answers the finding `six-catalog-collectors-wait-on-the-game-declarations`, whose six packages are all among the fifteen that landed here.',
} as const satisfies Finding
