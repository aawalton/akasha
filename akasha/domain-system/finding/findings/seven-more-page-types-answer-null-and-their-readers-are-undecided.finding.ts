import type { Finding } from "../finding.page-type.ts"

export const sevenMorePageTypesAnswerNullAndTheirReadersAreUndecided = {
  id: "01a05c89-c798-7ea1-b106-d69905a220c5",
  pageTypeSlug: "finding",
  slug: "seven-more-page-types-answer-null-and-their-readers-are-undecided",
  domainSlug: "domain/akasha-migration",
  claim:
    "Seven page types besides `seat` had their markdown declaration deleted and answer null, and three named queries and five views still ask after two of them. Nothing has decided whether those readers are repointed at akasha or deleted with the page types they read.",
  evidence:
    "Run here: `answer(resolveRoots(), { pageType: X })` answers null for all eight page types whose `pages/page-type/*.page-type.md` was deleted — `claude-account` (54ee772b64), `person` (315b286f18), `persona` (a4a70b61fe), `person-access` and `person-authority` (0bb8f2e390), `role` (30503fa5a8), `seat` (4e6ba6e6ec) and `subagent` (18285e3268).\n\n`seat` is answered at eaede9042c, which repoints its reader at akasha. The other seven are named by no `pageType:` literal anywhere in the tree, but by three named queries — `persona-all`, `claude-account-all`, `claude-accounts-mean-session-used` — and five views under `pages/view`: `personas-accounts`, `personas-notes`, `personas-not-empty`, `personas-covers`, `claude-accounts-claude-accounts`.\n\nThose fail loudly rather than quietly: `answerNamed` answers null and `page-query-answer.ts` turns it into a 503 naming the page type. So what is left is a decision rather than a regression. Each is repointed at akasha or deleted with the page type it read, and nobody has taken it.\n\nOf the 55 akasha page types with no `pages/page-type` counterpart, only these 8 are deletions: 41 were born in akasha and never had a reader, 4 keep live markdown outside that folder, and 2 had markdown the glob never reached.\n\nCorrecting the record on `seat`: its reader did not empty when the page type went at 18:22. It emptied at 15:32 in 4bb2acd9e0, which drained the eight `agent/seat/*.seat.md` pages the type was filed over, and for those three hours the query answered a valid `{ n: 0, rows: [] }`. Telling null from none would not have caught it, and does not bound this class on its own.",
} as const satisfies Finding
