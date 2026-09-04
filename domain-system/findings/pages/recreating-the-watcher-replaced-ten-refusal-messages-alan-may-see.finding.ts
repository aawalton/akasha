import type { Finding } from "../finding.page-type.ts"

export const recreatingTheWatcherReplacedTenRefusalMessagesAlanMaySee = {
  id: "01a063c6-848e-7bbb-925d-ab8acb6d7647",
  pageTypeSlug: "finding",
  slug: "recreating-the-watcher-replaced-ten-refusal-messages-alan-may-see",
  domainSlug: "workspace-package/temper-watcher",
  claim:
    "Ten legacy watcher handlers each raised `<handler>: not authenticated (<detail>)` from a block that a parser shows is the same code in all ten. The akasha recreation raises different text: nine handlers now name the work rather than the function, and the tenth names its own. Nobody reading a watcher log will find the old wording again. The migration is otherwise behaviour for behaviour here, so this is the change most likely to be noticed and least likely to be looked for.",
  evidence:
    'Parsing all twelve `temper/scripts/src` files that name `auth.getUser` and normalising the handler name gives two distinct blocks: one in `main.ts`, which re-authenticates, and one shared by ten handlers. `report-run-outcome.ts` names `getUser` with no such block and was reported as unprocessed rather than as matching.\n\nThe ten legacy texts, each `<name>: not authenticated (${error?.message ?? "no user"})`, with the names `runExportCompanionBuilds`, `runExportSettings`, `runExportTasks`, `runImportCharacters`, `runImportCompanions`, `runImportCompletion`, `runImportInventory`, `runImportItemRuleVerdicts`, `runImportSales`, `runImportTasks`.\n\nNine now raise `no signed-in user to <work> (<detail>)` from `watcher-signed-in-user`, where the work is one of: export these companion builds, export these settings, export these tasks, import these characters, write these companions, file this inventory scan, import these completions, import these item-rule verdicts, import these sales. The unexplained case reads `the session carried no user` where the legacy read `no user`.\n\nThe tenth, `watcher-import-completion`, takes the user id from an injected seam and raises `no user is signed in, so a completion import has no account to write under`.\n\nTwo further texts changed on the way and never ran: an export-settings message and an export-tasks message, both now the shared one.',
} as const satisfies Finding
