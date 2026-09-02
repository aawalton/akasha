import type { Finding } from "../finding.page-type.ts"

export const anAddonsOwnDeclarationsNeverReachedItsBuild = {
  id: "01a06212-636f-79fb-aba5-358716cf1459",
  pageTypeSlug: "finding",
  slug: "an-addons-own-declarations-never-reached-its-build",
  domainSlug: "domain/temper",
  claim:
    "Three akasha addons made no Lua because the transpiler settings written for an addon never reached the declarations that addon holds. Read as three landings gone wrong; it was one defect in one generator. Mended at `c24930c472`, and a sweep of all thirty-four akasha eso-addons went from twenty-six building to twenty-nine.",
  evidence:
    "The generator is `akasha/temper/temper-addon-build/addon-tstl-config/addon-tstl-config.module.code.ts`. Its include set was the addon's `**/*.module.code.ts` and the two folders named in `DECLARATIONS_UNDER`, `temper-eso-types` and `temper-addon-library-types`. A declaration in the addon's own package was in no program, so every name it described was unresolved.\n\nFive akasha addon packages hold declarations of their own: temper-combat-addon, temper-interface-addon, temper-lib-extended-journal, temper-lib-histoire and temper-lib-sets. Three were failing, each and only with `TS2304: Cannot find name`. TemperInterface could not see `FCOCHANGESTUFF`, LibExtendedJournal could not see `SI_LEJ_NAME`, LibHistoire could not see `LibHistoireWarningDialog` and five more. One include entry cleared the first two outright and took LibHistoire from six errors to one.\n\nWhat makes this worth a page is how the errors read. Every one reads as a name a landing seat forgot to bring across, and three seats were tracing declaration files for names already sitting beside them. A missing include and a missing declaration fail alike at the compiler, and the include is cheaper to rule out.\n\nThe mend adds `OWN_DECLARATIONS_UNDER` and one include entry, and the module page gains the invariant that the written settings reach every declaration the addon folder holds.",
} as const satisfies Finding
