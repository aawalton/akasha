import type { Finding } from "../finding.page-type.ts"

export const aPageQueryCarriesNoTitleBecauseTheOnlyTitleBelongsToTemper = {
  id: "01a06423-1b7c-7000-9f2a-4c81d5e0a377",
  pageTypeSlug: "finding",
  slug: "a-page-query-carries-no-title-because-the-only-title-belongs-to-temper",
  domainSlug: "workspace-package/pages-system",
  claim:
    "The `page-query` page type landed without a title, which loses wording that about 17 of the 104 queries carry and their slugs do not. The call was taken in Alan's absence because both alternatives were worse: a second text property slugged `title` cannot exist, and reusing the one that does would point the pages system at a leaf product package.",
  evidence:
    "A page property slug is `unique: \"page-type\"` — `slug.text-property.ts:13` — so it need only be unique among the pages of its own property type. `text-property/title` is already taken, by `akasha/temper/temper-things/properties/title.text-property.ts`, so a second one is refused and `page-query` could not declare a title of its own.\n\nImporting temper's is legal, and cross-package reuse is idiomatic: `page-type.page-type.ts:2` imports `plural-slug` from domain-system. But that import runs the other way. The pages system is what every other package is built on and temper is a product built on it, so a title reached from there makes the foundation depend on something resting on it.\n\nWhat letting titles go costs was measured. All 104 markdown queries carry one. About 87 say what the slug says: `readout-scales-all` titled `Readout scales all`. About 17 carry wording the slug does not — `chess-game-all` titled `Chess games all`, `song-listens-on-day` titled `Song listens on a day`. What is lost is plural and article, not fact: no title names a page type, key, comparison or value the query does not already state.\n\nThe page type also carries `A query holds nothing about how its answer is shown`. A title is the wording an answer is labelled with, so landing both would have made the page type argue with itself on its first day.\n\nThe call is cheap to reverse. If the wording is wanted, move `text-property/title` up into the pages system, where a title is something any page may carry, and declare it on `page-query` from there. That edits temper's tree, which is why it was not taken alongside a landing in the pages system.",
} as const satisfies Finding
