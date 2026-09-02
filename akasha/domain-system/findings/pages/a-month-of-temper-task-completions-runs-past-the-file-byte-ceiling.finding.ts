import type { Finding } from "../finding.page-type.ts"

export const aMonthOfTemperTaskCompletionsRunsPastTheFileByteCeiling = {
  id: "01a05fda-025c-7389-bf12-2e569f0d6214",
  pageTypeSlug: "finding",
  slug: "a-month-of-temper-task-completions-runs-past-the-file-byte-ceiling",
  domainSlug: "domain/temper-progress",
  claim:
    "The 1,425 task completions temper kept for March to August 2026 did not carry across. Held as one `tasks` entry file per `temper-completed-month` page they run 16,279 to 127,313 bytes against the 15,000-byte ceiling `file-length` holds every file to. The entry shape is declared on the page type and the six month pages carry none of it. A day is the largest grain of gathering that would fit.",
  evidence:
    "Generated the six entry files from `pages/temper-completed-month/*.tasks.jsonl` with row keys in camel and empty values dropped, then handed them to `akasha write --dry-run`, which refused all six by byte count: 2026-03 118,497, 2026-04 16,279, 2026-05 127,313, 2026-06 99,526, 2026-07 62,516, 2026-08 76,253. `akasha/checks/code-checks/pages/file-length/file-length.code-check.code.ts` holds `CEILING = 15000` and its page says `No kind of file is exempt`, with relief only for a file named `.test.ts`. Trimming a row to the four fields no other page carries — id, completedAt, task, character — leaves about 140 bytes a row, so March's 352 completions would still take about 49,000 bytes. Two grains do fit: a day, where March's busiest day holds 26 completions and every other day fewer, giving about 150 day pages over the six months; or the task itself, where the heaviest task, `crafting-writs`, gathered 109 completions. Neither is the grain the recreation was told to make. The largest entry file akasha already carries is 4,908 bytes, so nothing here has met this ceiling before.",
} as const satisfies Finding
