import type { Finding } from "../finding.page-type.ts"

export const twoCompanionTableInstrumentsPointAtAFolderThatIsGone = {
  id: "01a06348-33df-7ad3-ba08-a2b163f2eb0f",
  pageTypeSlug: "finding",
  slug: "two-companion-table-instruments-point-at-a-folder-that-is-gone",
  domainSlug: "domain/temper",
  claim:
    "`tools/companion-tables-match-pages.ts` and `tools/companion-tables-regenerate.ts` read `temper/game-companions-core/src`, which its ablation emptied. They name it as a path string rather than an import, so no specifier census sees them. Repointing is not a path swap: the twin splits their subject across modules under other names.",
  evidence:
    'Measured on 2026-09-02 while ablating `temper/game-companions-core` at `43de432667`.\n\nParsing all 27,803 tracked TypeScript files for real import, export, dynamic-import, import-type and require specifiers found zero naming `@temper/game-companions-core`. These two files are why that number understates the coupling. `companion-tables-match-pages.ts:4` holds `const G = ".../temper/game-companions-core/src"` and then dynamic-imports `${G}/generated/temper-companion-skill.generated.ts` and `${G}/generated/temper-eso-companion.generated.ts`. `companion-tables-regenerate.ts:22` holds `const DISK = ".../temper/game-companions-core/src/generated"` and reads each generated file there to print SAME or DIFF against freshly generated text.\n\nA path swap does not mend them. Both reach `companionSkillsFromPages` and `companionsFromPages`, intermediate names the legacy package re-exported one hop later. The twin exports `companionSkills` and `companions` directly and has no name for the intermediates, and the 173 skill rows the first of them read as one table are spread across `companion-skills` and `companion-skills-00` through `companion-skills-10`.\n\n`companion-tables-regenerate.ts:21` also writes its output to a hard-coded scratch path under a session directory, so it cannot run to completion on a fresh checkout whatever it reads.\n\nNeither is reachable from a command and neither breaks a build. They remain rather than being deleted or guessed at: both were committed during this session and may be a sibling seat\'s live instruments.',
} as const satisfies Finding
