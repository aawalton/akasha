import type { Finding } from "../finding.page-type.ts"

export const aBodyAkashaAdmitsAndNoReadDeliversCanNeverBeWrittenAgain = {
  id: "01a0615e-58c0-7379-b516-a51551e8c69f",
  pageTypeSlug: "finding",
  slug: "a-body-akasha-admits-and-no-read-delivers-can-never-be-written-again",
  domainSlug: "domain/required-reading",
  claim:
    "A body akasha admits and no read hands back can never be written again. `akasha read` refused every body past 28000 bytes, while `file-length` admits 8 MB of `.jsonl` and, since bc20d56ee5, 128 KB of markup. The `file-itself` warrant makes a write owe a reading of the body it replaces, so the refusal and the warrant close a ring. Creating such a file worked, because nothing was there to have been read. Replacing one was impossible.",
  evidence:
    "Measured on 2026-09-01, before the mend.\n\n`akasha read --file-path akasha/alan/eso-day/eso-daily-trackings/eso-day-2026-04-12.eso-day.health-samples.jsonl` exited 3: `its 29813 bytes are past the 28000 one answer holds`. An `akasha write --dry-run` of that same path then answered an owed-read list naming that same path, under the file-itself warrant, `what is replaced is read first`. No order of calls escapes the ring those two answers close.\n\nThe reach is wider than the markup case that raised it. bc20d56ee5 added a 128 KB ceiling for `.xml`; the 8 MB ceiling for `.jsonl` was already there. Some six thousand entry files sit in akasha, the largest 2832763 bytes, and akasha/code-system/ios-app/ios-apps/alanwalton/www/assets/dialog.module.code-Bq3dKxfM.js is 992405 bytes holding one line of 824564.\n\nRaising the answer ceiling to meet the file-length ceilings was ruled out. The finding a-read-the-harness-saves-to-a-file-is-recorded-as-read records a 172.6 KB answer the harness saved to a file: 2 KB reached the agent, and the reads were recorded as read.\n\nThat failure recurred while the mend was landing. One call reading 30 owed paths answered 209.1 KB, which the harness saved to a file. 2 KB reached the agent and the record holds all 30 as read, so the ceiling guards a real hazard and cannot simply be raised.\n\nThe mend hands a long body back a run of whole numbered lines at a time and carries how far it reached in the record. A reading holding a reach answers no warrant, so only the run reaching the last line answers a write.",
} as const satisfies Finding
