import type { Finding } from "../finding.page-type.ts"

export const everyGeneratedTableUnderPlayerCompletionLeftADoNotEditBehind = {
  id: "01a063b8-5dac-7bec-814f-c9cc8f53c117",
  pageTypeSlug: "finding",
  slug: "every-generated-table-under-player-completion-left-a-do-not-edit-behind",
  domainSlug: "domain/temper",
  claim:
    "All 13 generated tables under `temper/player-completion/src/generated/` carry a `DO NOT EDIT` directive, and akasha carries none. Nine name `ops temper catalog generate <table>`, a per-table spelling nothing had recorded; four name `ops temper addon-data generate`. Two more carried it and survive only in git.",
  evidence:
    "Read at be82b5f01c, and from git for the two whose files are gone. Every file in the folder was counted: 13 of 13 carry the line.\n\nThe nine naming a table of their own are achievement, antiquity, cadwell, collectibles, poi, quest, trait-research, tribute and zone-completion, each spelled `ops temper catalog generate <that table>`. The four naming `ops temper addon-data generate` are lore-shalidor, temper-activity-category, temper-completion-category and temper-skill-point.\n\nThe two gone with their packages were read back from git: `temper/game-characters-equipment/src/sets/generated/temper-set.generated.ts:15` at 070f9f2735^, and `temper/game-characters-skills/src/generated/temper-skill.generated.ts:15` at 8084461de7^. Both name `ops temper addon-data generate`. Asking git rather than the tip is what found them.\n\nThis folder is not the one `the-completion-add-ons-four-generated-tables-left-their-directive-behind` reads, which is `temper/player-completion-addon/src/generated/`.\n\nThis page first said six, counting only the tables this lane touched. The instrument was the lane rather than the folder.\n\n`no-code-comments.code-check.code.ts:136-140` refuses a banner as prose, so none can cross as a comment, and no akasha page carries any as an exported string.",
} as const satisfies Finding
