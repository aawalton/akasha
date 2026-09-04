import type { Finding } from "../finding.page-type.ts"

export const theSharedDialogDeclarationsStopShortOfCustomDialogs = {
  id: "01a06248-a651-7b3b-aadb-af323264fc0f",
  pageTypeSlug: "finding",
  slug: "the-shared-dialog-declarations-stop-short-of-custom-dialogs",
  domainSlug: "domain/temper",
  claim:
    "`ZO_Dialogs_ShowDialog` is declared with two parameters where the game takes four, and `ZO_DialogInfo` has no `customControl`, no `setup`, and no `control` on its buttons. An addon registering a custom dialog cannot state its dialog against the shared set and has to cast around it.",
  evidence:
    "Found on 2026-09-02 while landing `lib-sets-copy-dialog`. `eso-api-2.type-declaration.d.ts:129` declares `ZO_Dialogs_ShowDialog: (name: string, data?: Record<string, unknown>) => void`; the game's signature is `(name, data, textParams, isGamepad)`, and LibSets passes `textParams`. `ZO_DialogInfo` is declared twice and merges — `eso-api-2:111` and `eso-interface-extra-3:256` — and neither half carries `customControl`, `setup`, or a `control` member on a button entry, all of which a custom dialog states and `ZO_Dialogs_RegisterCustomDialog` reads.\n\nThe LibSets source had worked around this by re-declaring `GetControl`, `ZO_Dialogs_RegisterCustomDialog` and `ZO_Dialogs_ShowDialog` locally in `src/types/lib-sets-copytext.d.ts`. Those re-declarations were rightly dropped on landing, because in one merged program they collide with the shared ones. That left three real type errors in `lib-sets-copy-dialog`, closed at the module with casts: the info literal is typed `LibSetsCopyDialogInfo` and cast once with `asTyped<ZO_DialogInfo>` at the register call (line 197), a `dialogChild` helper wraps `GetControl` (line 19), and `showDialogWithTextParams` casts `ZO_Dialogs_ShowDialog` to its three-parameter form (line 27).\n\nThe call taken: fixed locally, filed for the shared set. The proper close is additive and safe for every existing caller — two optional trailing parameters on `ZO_Dialogs_ShowDialog`, and optional `customControl`, `setup` and `buttons[].control` on `ZO_DialogInfo`. The three casts in `lib-sets-copy-dialog` come out the day that lands. It was not made now because half a dozen seats are landing into `temper-eso-types` at once.",
} as const satisfies Finding
