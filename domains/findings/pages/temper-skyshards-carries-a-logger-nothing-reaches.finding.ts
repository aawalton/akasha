import type { Finding } from "../finding.page-type.ts"

export const temperSkyshardsCarriesALoggerNothingReaches = {
  id: "01a061b1-a094-79ac-a8ff-62ce3b0983d3",
  pageTypeSlug: "finding",
  slug: "temper-skyshards-carries-a-logger-nothing-reaches",
  domainSlug: "workspace-package/temper-skyshards",
  claim:
    "`skyshards-logger` is imported by nothing, in akasha or upstream. Its body creates a `LibDebugLogger` instance at load and it exports `setShowLog` and the writers around it, and no module in the package reaches any of them. It was carried across rather than lost in the recreation. It is a candidate deletion, and deleting it takes `LibDebugLogger` and `DebugLogViewer` off what the package needs.",
  evidence:
    "In akasha, `grep -rl skyshards-logger akasha/temper/temper-skyshards --include='*.module.code.ts'` answers nothing, so no sibling names the module. Upstream, `grep -rn 'setShowLog|createLog|from \"./logger\"' temper/game-collections-addon/src/skyshards --include='*.ts'` outside `logger.ts` itself answers nothing either, so the module was already unreached in the source it came from and the recreation lost no caller.\n\nThe depth-first order from the entry point confirms it. `skyshards-start` reaches 43 modules upstream and 46 in akasha, and `skyshards-logger` is in neither sequence.\n\nIt is not inert. Its body runs `LibDebugLogger != null ? LibDebugLogger.Create(ADDON_NAME) : undefined` and reads `DebugLogViewer`, so were anything to import it, it would take a library at load. It is one of only four modules in the package whose body does anything when loaded.\n\nIt was landed rather than dropped because dropping a module is a change to what the addon holds rather than a recreation of it, and this seat's bar was faithfulness. Whoever rules on the addon's shape can delete it in one act: the page, its code and its line in `temper-skyshards.workspace-package.ts`.",
} as const satisfies Finding
