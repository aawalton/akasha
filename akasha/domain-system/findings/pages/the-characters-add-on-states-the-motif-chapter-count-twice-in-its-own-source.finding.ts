import type { Finding } from "../finding.page-type.ts"

export const theCharactersAddOnStatesTheMotifChapterCountTwiceInItsOwnSource = {
  id: "01a061da-4fe6-7b3f-a705-26e80f2306e3",
  pageTypeSlug: "finding",
  slug: "the-characters-add-on-states-the-motif-chapter-count-twice-in-its-own-source",
  domainSlug: "domain/temper",
  claim:
    "The TemperCharacters add-on states the motif chapter count twice inside itself: `MOTIF_CHAPTERS_PER_STYLE = 14` at `src/tracking/motif-knowledge.ts:3` and `CHAPTERS_PER_STYLE = 14` at `src/generated/motif-style-lookup.generated.ts:128`. Declining to recreate the generated copy during the migration also removes the only file in the add-on that breaches the page byte ceiling.",
  evidence:
    "Measured 2026-09-02. Both constants are 14 and both describe the chapters a motif style holds. `motif-knowledge.ts` reads its own copy at line 13 rather than the generated one beside it. `motif-style-lookup.generated.ts` is 14,079 raw bytes; the formatter inflates a landed page about 1.13 times, which puts it near 15,900 against a 15,000 ceiling, and it is the only one of the add-on's 95 source files over that threshold. The next largest is `src/ui/task-hud-enrichment.ts` at 12,164. So the file that would have to be split to land is the same file whose one distinctive constant is already stated elsewhere in the add-on. The generated catalog is written by a generator rather than by hand, so the migration should take the generated data from a generator page and keep one statement of the chapter count, rather than split a generated file to fit.",
} as const satisfies Finding
