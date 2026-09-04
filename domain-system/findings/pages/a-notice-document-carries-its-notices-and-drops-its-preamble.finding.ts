import type { Finding } from "../finding.page-type.ts"

export const aNoticeDocumentCarriesItsNoticesAndDropsItsPreamble = {
  id: "01a06869-dab4-72ad-be3e-040d8f09a4fe",
  pageTypeSlug: "finding",
  slug: "a-notice-document-carries-its-notices-and-drops-its-preamble",
  domainSlug: "domain/akasha-migration",
  claim:
    "Splitting `pages/notice/resume.notice.md` into six notice pages carried every notice byte for byte and dropped the seven paragraphs of preamble that stood above them, because a page has no body and no property on the notice page type holds prose about a notice.",
  evidence:
    "Measured 2026-09-03. `bun tools/compose-notices.ts` against the six new pages under `akasha/seat-system/notices/pages` answers the same six keys with the same six strings the old renderer answered against the markdown; compared in full, they are identical. What did not carry: that every supervisor-composed notice opens with `[supervisor]` and one losing it reads as Alan typing; that `limit-resume-nudge` and `wait-resume-nudge` double as the monitor's anti-hammer keys, so editing either retires the old key and a seat nudged under the previous wording inside the window may be nudged once more; that the window `wait-resume-nudge` is asked against grows with each model-service failure in a row; that `editor-revive` is composed while Alan is at the keyboard, so failing to compose it refuses the revive rather than reviving a seat with nothing to say; that `restart-recovery-clause` is appended to every restart notice after the branch that picks between the others, and stands empty because the message it worked around is now released and redelivered on resume; and that `restart-deferred` rides the next real inbound so it may not tell the seat to pick up what it had in hand. `SUPERVISOR_NOTICE_PREFIX` in `akasha/seat-system/supervising/supervisor-resume-notices/supervisor-resume-notices.module.code.ts` carries the first of these in code. The rest stand nowhere but in this finding and in the blob at `git cat-file -p 38f405eca7f181acd39a24c2890566f21d03c764`.",
} as const satisfies Finding
