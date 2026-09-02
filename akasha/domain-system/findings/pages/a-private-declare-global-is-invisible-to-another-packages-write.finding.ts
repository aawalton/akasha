import type { Finding } from "../finding.page-type.ts"

export const aPrivateDeclareGlobalIsInvisibleToAnotherPackagesWrite = {
  id: "01a0611a-e177-76a6-86c9-93e4f3389a6c",
  pageTypeSlug: "finding",
  slug: "a-private-declare-global-is-invisible-to-another-packages-write",
  domainSlug: "domain/temper",
  claim:
    "A global declared inside `declare global` in a `.module.code.ts` reaches the audit, which roots every file, and not a write that changes a file in another package, which roots only that file's import closure. So a name two addons reach cannot live in one addon's declarations module. It answers TS2304 at the write and nothing at the audit, which is the harder way round to find.",
  evidence:
    "Landing `temper-interface-addon` hit this three times. `NOTIFICATIONS` and `ZoKeyboardNotificationManager` were in `temper-lib-notification/notification-declarations`, `ZO_Menu_SetLastCommandWasFromMenu` in `temper-lib-custom-menu/custom-menu-declarations`, and `CreateControl` in `temper-lib-main-menu/main-menu-game-shape-2`. All four typechecked tree-wide with the new addon overlaid, at zero over 26,316 files, and all four refused the write as TS2304 in `quiet-dialogs`, `quiet-entry`, `quiet-settings-guilds` and `fco-guild-history`.\n\nThe route taken: move each name into a `type-declaration` under `temper-eso-types`, whose `.d.ts` is ambient and reaches every program. Landed at 698782fcad and 0c8af33198. Moving `CreateControl` then exposed a second turn of the same defect, because `main-menu-game-shape-2` was rooted alone once changed and its `Descriptor` alias lives in the sibling `main-menu-game-shape-1`; the alias was written out inline rather than dragged across.\n\nThe converse also bit: `temper-housing-addon` landed its own `ZO_COLLECTIBLE_DATA_MANAGER` while this work was in flight, so the shared copy and the private copy collided at TS2451 the moment both stood, and no write had refused either. Taken off at 1008e13097.\n\nWhat this means for the ruling against a private `declare global` for an ESO global: it is not only that thirteen copies collide, it is that one copy in a module is unreachable by any other package's write, so the shared `type-declaration` is the only shape that works at all.",
} as const satisfies Finding
