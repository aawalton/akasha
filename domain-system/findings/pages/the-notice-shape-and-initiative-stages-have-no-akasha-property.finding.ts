import type { Finding } from "../finding.page-type.ts"

export const theNoticeShapeAndInitiativeStagesHaveNoAkashaProperty = {
  id: "01a06861-1918-7446-b458-f8a9b4879b75",
  pageTypeSlug: "finding",
  slug: "the-notice-shape-and-initiative-stages-have-no-akasha-property",
  domainSlug: "domain/akasha-migration",
  claim:
    "Two things the old page body shapes stated have no counterpart anywhere in akasha. They are written down here so the markdown stating them can go without the statement going with it: what a notice document is shaped like, and the stages an initiative may carry.",
  evidence:
    "`pages/page-body-shape/notice.page-body-shape.md` states a notice document as one to eight `# {title}` sections, each opening with a preamble of up to 1000 characters and holding one to twelve `## {notice}` entries, each entry named by a lower kebab slug of up to 60 characters and holding up to 500 characters of body. akasha carries no `notice` page type. `pages/notice/resume.notice.md` is the only page of that shape and it is live: the supervisor reads its seven named notices when it puts a seat back to work.\n\n`pages/page-body-shape/initiative.page-body-shape.md` states two stage blocks an initiative may carry, `sequence` and `loop`, each excluding the other, each holding one to twenty stages of up to 100 characters with up to fifteen actions of up to 500 characters under each. akasha's `initiative.page-type.ts` carries `intents` and `constraints` and nothing for stages. `pages/initiative/formula-name-translations.md` is the only page that ever used them. `workflow-template` is no counterpart: the steps it groups are container runs on the cluster.\n\nThe remaining shapes with no property are already recorded in akasha as gap invariants. `email-rule.page-type.ts` states the match, the filing, the delay and the actions are yet to stand as properties, which covers both email-rule-code's match clauses and email-rule-agent's act and description. `seat-turn-end-reading-case.page-type.ts` stated the same of its prompt and final message, and this change lands them, so that gap is now a departure.",
} as const satisfies Finding
