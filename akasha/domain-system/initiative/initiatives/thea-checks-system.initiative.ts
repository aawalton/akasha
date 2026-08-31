import type { Initiative } from "../initiative.page-type.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  pageTypeSlug: "initiative",
  slug: "thea-checks-system",
  domainSlug: "domain/checks-system",
  personaSlug: "thea",
  intents: [
    { statement: "Every constraint of the pages system is enforced in the types or the checks." },
    {
      statement: "The new system carries every check of the old system that still applies.",
      workingMemory:
        "Ten old scanners stand as syntax rules under `no-refused-syntax`; `no-mutable-collection` was built, measured and retired to a finding. Nine rules judge at every phase over 1144 files with nothing refused. Eighty scanner files are unported, in `infra/cluster-checks/src/checks/`. A whole-tree count is rebuilt by loading each rule from the rules directory and walking every `.ts` under `akasha/`. Each port is a ruling for Alan on whether the rule still applies here.",
    },
    { statement: "The old system carries no check." },
    { statement: "No finding is filed on checks-system or any part beneath it." },
    { statement: "No intent is written on checks-system or any part beneath it." },
  ],
} as const satisfies Initiative
