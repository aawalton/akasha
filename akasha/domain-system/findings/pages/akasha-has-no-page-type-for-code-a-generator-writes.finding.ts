import type { Finding } from "../finding.page-type.ts"

export const akashaHasNoPageTypeForCodeAGeneratorWrites = {
  id: "01a06039-93e2-7c96-9ab1-fc290dbe9584",
  pageTypeSlug: "finding",
  slug: "akasha-has-no-page-type-for-code-a-generator-writes",
  domainSlug: "domain/temper",
  claim:
    "280 of temper's 4,484 files are written out by a generator rather than typed, and they hold 11.3MB of the 12.6MB temper carries. akasha has no page type saying a module's code is written out, and its prose check refuses the banner every one of them opens with. 67 of the 82 temper files over the byte ceiling are generated files.",
  evidence:
    "`git ls-files temper` answers 280 paths either under a `generated/` folder or ending `.generated.ts`, totalling 11,343,151 bytes. Handing one to `akasha write` refuses it: writing temper/shared-foundation-misc-dungeons/src/generated/temper-dungeons.generated.ts as a module's code answered `line 1 carries prose, which is none of the code comment forms` for the block opening `Temper Dungeons (Generated) ... DO NOT EDIT — regenerate with: ops temper addon-data generate`. Stripping the banner let the same body through, so the generator would have to stop emitting the one line that tells a reader not to edit. akasha decides generated-ness by predicate rather than by page type: generated-file/generated-file.ts matches `(^|/)generated/`, `\\.generated\\.[a-z0-9]+$`, the lockfiles, any rows file, and a `do not edit` header in the first three lines. No page type, file property or named file property answers to it. The data itself is often already in akasha twice over: the 58 pages under akasha/temper/temper-catalog/temper-world/dungeons/pages and the 3 under quest-givers/pages are what tools/lib/temper-addon-data writes temper-dungeons.generated.ts out of, and tools/lib/temper-addon-data/output-dirs.ts names the package it writes into.",
} as const satisfies Finding
