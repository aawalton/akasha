import type { Finding } from "../finding.page-type.ts"

export const aGameNameHomedInALibraryPackageIsUnreachable = {
  id: "01a06395-d6c8-7a18-92bc-d9de2a77f70b",
  pageTypeSlug: "finding",
  slug: "a-game-name-homed-in-a-library-package-is-unreachable",
  domainSlug: "domain/temper",
  claim:
    "An add-on's compile reads its own declarations, its dependencies' declarations, and the two shared typing packages, which are injected unconditionally. A game name declared in a library package is therefore invisible to every add-on that does not depend on that library, while still blocking any other add-on from declaring it. Four keybinding names were in that state, and the two library pages already state the rule that resolves it.",
  evidence:
    '`addon-tstl-config.module.code.ts` builds the include list at lines 165 to 170: the add-on\'s `**/*.module.code.ts`, the add-on\'s `**/*.d.ts`, each reached package\'s `**/*.d.ts`, then `DECLARATIONS_UNDER` at lines 27 to 30, which names `temper-eso-types` and `temper-addon-library-types` unconditionally. Reached packages come from `reachedPackageDirs`, which throws on a dependency the workspace install left no link for.\n\n`KEYBOARD_KEYBINDING_MANAGER`, `KEYBINDING_MANAGER` and `KEYBINDINGS_FRAGMENT` were declared in `temper-lib-addon-keybinds/addon-keybinds-declarations`, and `ZO_KeybindButtonTemplate_Setup` in `temper-lib-addon-menu/addon-menu-eso-window`. All four name objects the game supplies rather than anything either library builds. A symbol census scored all four as found, yet none was reachable from a new add-on that depends on neither library, and declaring them afresh drew TS2451 from the write gate.\n\nBoth library pages already carry the rule. `addon-keybinds-declarations` states "A name more than one package reaches is declared in the shared game typings" and `addon-menu-eso-window` states "A name the shared game typings already declare is left out". So the move into `temper-eso-types` follows what those pages say rather than a new judgement.\n\nAfter the move, `libAddonKeybinds` typechecks at 0 errors over 10 own files and `LibAddonMenu-2.0` at 0 errors over 34 own files, so widening the home broke neither.',
} as const satisfies Finding
