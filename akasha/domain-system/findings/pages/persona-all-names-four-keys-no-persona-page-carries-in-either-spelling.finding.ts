import type { Finding } from "../finding.page-type.ts"

export const personaAllNamesFourKeysNoPersonaPageCarriesInEitherSpelling = {
  id: "01a05c01-a507-707d-8839-4a1fa75fe7e7",
  pageTypeSlug: "finding",
  slug: "persona-all-names-four-keys-no-persona-page-carries-in-either-spelling",
  domainSlug: "domain/akasha-migration",
  claim:
    "Four keys `persona-all` names are answered by no persona the store holds, in kebab or in camel, so no spelling repair reaches them. `total-points`, `last-messaged-at`, `seq` and `title` stand on none of the forty-two. `title` falling back to the slug is the only reason the cardio owner is found at all. Separately `claude-accounts-mean-session-used` reduces over a target nothing writes, so its mean is taken over nothing.",
  evidence:
    'Asked through askNamed on 2026-09-01, once the store\'s spelling was translated, `persona-all` answered n=42 and reported unfound ["last-messaged-at","seq","title","total-points"]. Those four are left out of every row rather than answered null, which is how the store says it holds no column for a key: `sms-allowed` on relationship comes back null and present, these do not come back at all. Counted over the page files, `totalPoints` matches 0 of 42 persona files and no persona file carries a `title:` field, while `valueSlug` matches 41 and `greenDayPoints` 40. `tools/lib/wake-day/persona-recipe-rows.ts:62` reads `title: textOf(row.values.title) ?? slug`, so title falls back to the slug, and `tools/lib/wake-day/health-total-points.ts` compares it case-insensitively against the cardio persona title, so aelwyn is matched by its slug alone and the match is accidental rather than earned. `total-points` is read at persona-recipe-rows.ts:57 and left out of the recipe row when absent, so every persona reaches the totals with no stored total for a computed one to be checked against. `effective-five-hour-percent-used`, the target of `claude-accounts-mean-session-used`, and `effective-seven-day-percent-used` occur in the repo only inside their own query files, so nothing writes either and both reductions run over an empty set. The spelling repair landed in shared/pages-query leaves all of this standing; it is page data absent from the store rather than a key asked for by the wrong name.',
} as const satisfies Finding
