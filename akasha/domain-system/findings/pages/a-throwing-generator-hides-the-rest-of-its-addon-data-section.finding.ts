import type { Finding } from "../finding.page-type.ts"

export const aThrowingGeneratorHidesTheRestOfItsAddonDataSection = {
  id: "01a06129-4ef1-7bff-b8df-abab2203959d",
  pageTypeSlug: "finding",
  slug: "a-throwing-generator-hides-the-rest-of-its-addon-data-section",
  domainSlug: "domain/temper",
  claim:
    "Seven of the fourteen sections `ops temper addon-data generate` writes throw before writing, so the command cannot complete. A section stops at its first throw, so seven is a floor rather than a total: one broken generator hides every generator behind it in its own section, and none of those is known either to work or to be broken. Where a generator and the file it emits disagree, the on-disk bytes are the correct ones and the generator is the stale party.",
  evidence:
    "tools/addon-data-proof.ts runs the real write table from tools/lib/temper-addon-data/writes.ts with a sink that compares instead of writing, so what it measures cannot drift from what generate does. Against the live pages it answers 34 files byte-identical, 1 differing and 7 sections throwing. The seven are alchemy, lore, rules, scribing, stats, companions and skills. Their first throws are: alchemy, a TypeError that spread syntax requires an iterable; lore, `temper-motif-style Trinimac: dropSources entry dlc-delve-dailies is not a temper-scribing-source row`; rules, stats and skills, a zod `expected string`; scribing, a zod `unrecognized_keys`; companions, a zod `expected array`. buildAddonDataWrites hands each section one promise list and the first rejection ends that section, so nothing behind the throwing generator is reached. The one differing file is temper-set.generated.ts, 1,362,558 bytes made against 1,362,584 on disk, a gap of 26 characters. Five generators in this family have already been mended and now reproduce their checked-in files exactly, which is what that call rests on: in all five the file on disk was right and the generator had fallen behind the pages. temper-companion-trait is the sharpest, because it never threw at all. It read a property under a name the pages no longer use, its validator defaulted that to null, and it wrote 4,003 bytes where the correct table is 4,199.",
} as const satisfies Finding
