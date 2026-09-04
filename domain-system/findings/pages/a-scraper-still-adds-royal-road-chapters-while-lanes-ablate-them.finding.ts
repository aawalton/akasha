import type { Finding } from "../finding.page-type.ts"

export const aScraperStillAddsRoyalRoadChaptersWhileLanesAblateThem = {
  id: "01a06757-a71c-7000-89bf-d672be0acf6f",
  pageTypeSlug: "finding",
  slug: "a-scraper-still-adds-royal-road-chapters-while-lanes-ablate-them",
  domainSlug: "domain/akasha-migration",
  claim:
    "A third writer nobody accounted for adds chapters to `pages/story-chapter-royal-road/` about once an hour, under commits titled `royal road sync 1 file(s)`. A count of files outside akasha is therefore a measurement with a time on it rather than a total, and a folder a lane emptied refills on its own. A non-zero count there is the sync working rather than a lane leaving work behind.",
  evidence:
    "Measured 2026-09-03 while ablating the 7,544 royal road chapters of the n-z range. Two source files appeared mid-run: a count of 7,542 at `3249ff94aa` became 7,544 by `40457388f5`. The two are `passive-aggressive-reverse-portal-invasion-litrpg/0072-chapter-64` and `shapeshifter-a-non-human-litrpg/0043-chapter-38-dreamscape`, added by `277eed6128` at 03:05 and `4f3169497b` at 04:08. Sync commits also stand at 20:08, 21:07 and 01:08, so the cadence is roughly hourly and it ran throughout the night's work.\n\nBoth new files were inside the snapshot the ablation was proved against, so both were verified and ablated like the rest. The hazard is not to that run. It is that the initiative's own constraint accounts for the swarm and the `alan` handler alone, so a writer outside both is adding the very files every lane is counting.\n\nWhat this costs a later reader: the number a lane reports for files outside akasha is true when taken and drifts upward afterwards, and the drift is invisible in the number itself. Two lanes counting the same folder an hour apart will disagree and both be right.\n\nThe cheap check is `git log --format='%h %ci %s' --grep='royal road sync'` before concluding anything from a count in that folder. Reading the file count alone cannot tell a sweep that missed files from a sweep that finished and was topped up afterwards, and those two call for opposite responses.",
} as const satisfies Finding
