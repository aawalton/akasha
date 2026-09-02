import type { Finding } from "../finding.page-type.ts"

export const opsExerciseAskPagesIsALibraryModuleInTheCommandFolder = {
  id: "01a0614b-dae8-72be-9265-faff97095996",
  pageTypeSlug: "finding",
  slug: "ops-exercise-ask-pages-is-a-library-module-in-the-command-folder",
  domainSlug: "domain/ops-exercise",
  claim:
    "`ops exercise ask-pages` is not a command. Its file exports one helper the three exercise reading commands import, and no default export at all, so dispatching it would call `undefined`. It is counted as a command because every file under `tools/commands/` is one, which is why it is the only entry of 311 declaring no summary and one of two declaring no help. No help was written for it: a document would describe a command that cannot run.",
  evidence:
    "`tools/commands/exercise/ask-pages.ts` is 28 lines and its only export is `askExercisePages`. `declaredCommands` at `tools/ops/declared.ts:47-62` walks every `.ts` under `tools/commands` and makes a command of each, reading the summary by regex and the runner by `import(path)`. `renderCommandHelp` and the dispatcher both take `module.default`, which this module does not have.\n\nIt is imported by `equipment-list.ts:7`, `constraint-list.ts:9` and `mobility-show.ts:10`, each by the relative name `./ask-pages.ts`, so the repair is a move out of `tools/commands/` and three import lines — not a document.\n\nA second function of the same name and the same job is at `tools/lib/daily-tracking/exercise-pages.ts:23` and is taken by `strength-points.ts`. Whether those are one function in two places was not established here.\n\nThe call taken: nothing was moved. Both `commands-declare-help` and `commands-declare-summary` are left red at 1 rather than made green by a sentence describing a command that does not dispatch. A move would make both green honestly and is the fix this names.",
} as const satisfies Finding
