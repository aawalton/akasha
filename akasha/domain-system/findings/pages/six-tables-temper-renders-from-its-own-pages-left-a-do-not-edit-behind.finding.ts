import type { Finding } from "../finding.page-type.ts"

export const sixTablesTemperRendersFromItsOwnPagesLeftADoNotEditBehind = {
  id: "01a063b8-5dac-7bec-814f-c9cc8f53c117",
  pageTypeSlug: "finding",
  slug: "six-tables-temper-renders-from-its-own-pages-left-a-do-not-edit-behind",
  domainSlug: "domain/temper",
  claim:
    "Six generated tables temper renders from its own pages each carry a `DO NOT EDIT` directive that akasha does not. Four name `ops temper catalog generate <table>`, a per-table spelling nothing has recorded before; two name `ops temper addon-data generate` and are readable only from git, their files having gone with their packages.",
  evidence:
    "Read at bea8a37317, and from git for the two whose files are gone.\n\nOn disk under `temper/player-completion/src/generated/`: `achievement-data.generated.ts:8` names `ops temper catalog generate achievement`, `collectibles-data.generated.ts:7` collectibles, `poi-data.generated.ts:7` poi, and `zone-completion-data.generated.ts:7` zone-completion. Every one of the four also states its own totals in the same header, and those totals reconcile with the akasha entries leaf for leaf at 12,906, 2,077, 3,795 and 3,841.\n\nThe other two went with their legacy packages and were read back from git: `temper/game-characters-equipment/src/sets/generated/temper-set.generated.ts:15` at 070f9f2735^, and `temper/game-characters-skills/src/generated/temper-skill.generated.ts:15` at 8084461de7^. Both name `ops temper addon-data generate`. Asking git rather than the tip is what found them.\n\nThis is a different six from `the-completion-add-ons-four-generated-tables-left-their-directive-behind`, which reads `temper/player-completion-addon/src/generated/`. Both the package and the command differ: four name a table of their own rather than a whole-run command.\n\n`no-code-comments.code-check.code.ts:136-140` refuses a banner as prose, so none of the six can cross as a comment, and no akasha page carries any of them as an exported string.",
} as const satisfies Finding
