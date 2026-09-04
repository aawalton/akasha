import type { Finding } from "../finding.page-type.ts"

export const theGitAnswersCacheReportsPagesAsTheyWereBeforeMigrating = {
  id: "01a06224-a9c9-722c-a0ec-87e1abbdb87a",
  pageTypeSlug: "finding",
  slug: "the-git-answers-cache-reports-pages-as-they-were-before-migrating",
  domainSlug: "domain/akasha-migration",
  claim:
    "`.git/answers/` holds frontmatter for pages as they were before they moved into akasha. A grep over this worktree that does not exclude `.git` reads the 42 persona pages as still carrying readout properties the akasha pages dropped. It is a live trap for every lane here, and it misleads towards keeping machinery that has no reader left.",
  evidence:
    "Searching the tree for `readout-group/personas` answered 61KB dominated by ./.git/answers/said/frontmatter/**.json. One row reported abby with domain-parent-slug readout-group/personas, group-slugs [personas], unit `green day units`, scale-slug green-day-units, query-slug persona-green-day-units-on-day, query-argument persona and query-key abby.\n\nakasha/persona-system/persona/abby/abby.persona.ts carries none of those seven. It holds championedDomainSlug, roleSlug, valueSlug, origin, emailAddress, greenDayPoints, cover and prose. persona.page-type.ts declares no readout property at all, and the other 41 personas match.\n\nThe gap changes a judgement rather than merely adding noise. Read through the cache, the personas readout group looks to hold 42 member readouts and removing it looks unsafe. Read through the akasha pages it holds none, and its own page was the last thing naming it; readouts/group/personas.readout-group.md went at 508deec4ed. The finding `saved-queries-ask-kebab-keys-and-migrated-pages-answer-absent` records the same migration from the asking side.\n\nThe filter that works is `grep -v '^\\./\\.git/'` beside the usual node_modules, dist, build and .react-router exclusions. A grep that omits it is not wrong about the bytes on disk, only about which of two copies answers for the page.",
} as const satisfies Finding
