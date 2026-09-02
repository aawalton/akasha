import type { Initiative } from "../initiative.page-type.ts"

export const emberMigrateTemperToAkasha = {
  id: "01a05d98-bb3e-723e-bb49-4b57786306a0",
  pageTypeSlug: "initiative",
  slug: "ember-migrate-temper-to-akasha",
  domainSlug: "domain/temper",
  personaSlug: "ember",
  parentSlug: "akasha-migration",
  intents: [
    {
      statement:
        "Temper is a domain in akasha, and everything temper keeps is a page or an entry there.",
      workingMemory:
        "My 436-parts figure counted a plan as an artifact: `ADDON_DATA_TARGETS` has zero consumers, `temper-addon-data-generate` is a refusing stub, and five of the six worst rows have no parts on disk. Only `character-skills-from-pages` (85) and the sets table (124 on disk as `sets-data-NNN`, where the row says 100 and pads to two digits) are real series, and neither reaches an addon. 176 further parts are already entries and want their rows deleted, not converted.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "10 packages and 583 files remain under `temper/`, from 38 and 2,291. `web` at 357 crosses last; its 21 remaining completion edges across 4 files are held by 12 transforms that gained catalog parameters the akasha catalogs answer as pages rather than as tables. `player-completion-addon` came down at 29d5251309 with no package of its own: its behaviour was already twinned across two akasha packages, so an absent twin package is not an absent twin. `scripts` at 57 is seated on the watcher handlers.",
    },
  ],
  constraints: [
    "The entries work lands in pages-system rather than under temper.",
    "Every part of temper migrated into akasha lands under `akasha/temper`.",
    "The intent stack and its working memory hold where the work is, so a fresh context resumes from the page rather than from what it remembers.",
    "Work never halts on doubt: a finding is filed, a decision is made, and the work goes on.",
    "Changes swarm across as many as twenty agents this initiative's persona spawns and shepherds, and the akasha commands are left to settle what collides.",
    "Every change goes through an akasha command, and a command that cannot do what is needed is enhanced or written rather than bypassed.",
    "A reminder every fifteen minutes restates these constraints and says to keep going.",
    "Temper is recreated in the new paradigms rather than carried across, and a feature lost in the recreation is filed as a finding.",
    "No directive comes across, and each directive left behind is filed as a finding.",
    "Temper is allowed to break until this initiative is done.",
  ],
} as const satisfies Initiative
