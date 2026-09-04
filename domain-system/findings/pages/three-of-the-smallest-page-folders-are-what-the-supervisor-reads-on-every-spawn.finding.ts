import type { Finding } from "../finding.page-type.ts"

export const threeOfTheSmallestPageFoldersAreWhatTheSupervisorReadsOnEverySpawn = {
  id: "01a06576-00b3-719e-8291-091bbcec20ad",
  pageTypeSlug: "finding",
  slug: "three-of-the-smallest-page-folders-are-what-the-supervisor-reads-on-every-spawn",
  domainSlug: "domain/akasha-migration",
  claim:
    "`pages/seat-conditions`, `pages/notice` and `pages/subagent-kind` hold four files between them and look like leftovers, but the supervisor reads all three on every spawn and every resume, two of them through a hard-coded literal path that fails loudly when the file is absent. Moving any of the three without its reader in the same commit stops seats from spawning or resuming.",
  evidence:
    '`pages/seat-conditions/seat-conditions-current.seat-conditions.md` is a singleton read by `readSeatConditions` at tools/lib/seat-conditions.ts, which asks for pages of type `seat-conditions` and throws when it finds none or more than one. tools/lib/supervisor-account-config.ts calls it at lines 14, 18, 46, 65, 85, 114, 142, 160, 179 and 180, so it decides worker model, subagent model, fallback model, auto-compact window, effort level, subagent spawn depth, tool timeout and both resume thresholds. The page today states only four of those ten keys: subagent-model none, fallback-model fable, effort-level none, extended-context-available true. The other six are unstated and read as null, so the supervisor falls back to its own defaults.\n\nIt says nothing whatever about which assignment a seat answers for. That is recovered from the seat page\'s git history, which 3d90e735d2 made durable across a stop, and it has since survived a real restart. The two are unrelated despite both being about seats.\n\ntools/compose-notices.ts line 7 holds `const DOCUMENT = "pages/notice/resume.notice.md"` as a literal and calls `fail` when it is not there. tools/compose-subagents.ts line 12 holds `const FOLDER = "pages/subagent-kind"` and imports `parseFrontmatter` from `@akasha/markdown-pages/frontmatter`, so the 56 files of `page/` are load-bearing for it too.\n\nSo these four page files and `page/` migrate together with the three composers, or not at all. I left all of them where they are.',
} as const satisfies Finding
