import type { Finding } from "../finding.page-type.ts"

export const temperTaskProgressNamedCharactersByIdsThatDidNotCarryAcross = {
  id: "01a05fda-025e-7627-be42-eab4c600e312",
  pageTypeSlug: "finding",
  slug: "temper-task-progress-named-characters-by-ids-that-did-not-carry-across",
  domainSlug: "domain/temper-progress",
  claim:
    "The per-character progress rollup on a `temper-task` named each character by a temper uuid, and those ids do not carry across. The 240 rows landed keyed by the character's in-game name instead, which no page resolves, because the `temper-character` domain holds no character pages yet. The link and the active-entry marker each row carried were dropped.",
  evidence:
    "13 task pages carried a `progress.attachment.json` beside them, a file kind akasha has no page type for and holds nowhere else. Each held `total`, `current`, an `entries` map of 240 rows in all, and on 11 of them an `activeEntryKey`. Every map key was a uuid such as `019dda20-723a-792a-99cc-c642ede18861`, which is how temper named a character row in its own store. Each row held `href`, `label`, `total`, `current` and `sortOrder`, and every href was a route into temper's web app carrying that same uuid, as in `/completion?tab=characters&character=019dda20-723a-792a-99cc-c642ede18861&scrollTo=daily-writs`. The recreation keeps `total` and `current` on the page as `progressTotal` and `progressCurrent`, and keeps the rows as a `progress` entry of `characterName`, `progressTotal`, `progressCurrent` and `displayOrder`. `label` holds the short in-game name, `Durene`, where the character slug temper writes elsewhere is `durene-faerise`, so the two do not map without a character page to join on. The rollup is recomputed from completion data on every sync, so what is kept here is a reading rather than a source.",
} as const satisfies Finding
