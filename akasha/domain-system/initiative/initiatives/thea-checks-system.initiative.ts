import type { Initiative } from "../initiative.page-type.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  pageTypeSlug: "initiative",
  slug: "thea-checks-system",
  domainSlug: "workspace-package/checks-system",
  personaSlug: "thea",
  intents: [
    {
      statement:
        "Every design invariant of the pages system a code check can enforce is enforced, and every one it cannot stands as an upkeep.",
      workingMemory:
        "459 design invariants in pages-system group into 242 rules: 69 enforced, 116 a code check could fill, 274 upkeep. Code checks only; what no program decides becomes upkeep, what has no subject under `akasha/` becomes stopgap. Building: instant-property-slug-closes-with-at, email-address-is-well-formed, phone-number-is-e164, restatement-narrows-something. Then five extending shipped machinery, then module-reaches-only-what-it-states, worth 46 invariants over 14 domains.",
    },
    {
      statement: "The new system carries every check of the old system that still applies.",
      workingMemory:
        "Ten old scanners stand as syntax rules under `no-refused-syntax`; `no-mutable-collection` was built, measured and retired to a finding. Nine rules judge at every phase over 1144 files with nothing refused. Eighty scanner files are unported, in `infra/cluster-checks/src/checks/`. A whole-tree count is rebuilt by loading each rule from the rules directory and walking every `.ts` under `akasha/`. Each port is a ruling for Alan on whether the rule still applies here.",
    },
    { statement: "The old system carries no check." },
    { statement: "No finding is filed on checks-system or any part beneath it." },
    { statement: "No gap invariant is written on checks-system or any part beneath it." },
  ],
} as const satisfies Initiative
