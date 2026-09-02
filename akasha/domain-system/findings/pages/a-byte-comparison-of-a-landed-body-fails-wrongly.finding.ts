import type { Finding } from "../finding.page-type.ts"

export const aByteComparisonOfALandedBodyFailsWrongly = {
  id: "01a06162-9b9c-7000-83ab-5e7d976ca63a",
  pageTypeSlug: "finding",
  slug: "a-byte-comparison-of-a-landed-body-fails-wrongly",
  domainSlug: "domain/akasha-migration",
  claim:
    "A byte comparison of a migrated body against the file it came from fails wrongly. The gate reformats a body as it lands, sorting import statements and adding trailing commas, and says so in its own answer. `diff -w` fails wrongly too: over a joined line it does not collapse indentation. What holds is comparing the set of import specifiers, and separately the text outside the import block with whitespace removed.",
  evidence:
    "Met on 2026-09-02 landing six leaf modules from `shared/pages-ui` into `@akasha/pages-ui-components` at `1172f108`.\n\nEach landed body was checked against its source by comparing bytes. All six reported as differing, which reads exactly like a corrupted transfer. Pulling back six modules that had already passed 38 checks with none refusing was one step away.\n\nThe reason was in the gate's own answer, which says a body is formatted as it lands and that what is written there is not what was handed in. It sorts import statements and adds a trailing comma to a multiline import clause. All six differed only inside the import block.\n\nThe second attempt was also wrong, for an unrelated reason: `diff -w` over a single joined line does not collapse indentation, so it reported the same six as differing. Two checks failed wrongly in a row, and each failure was shaped exactly like a true one.\n\nWhat holds: compare the set of import specifiers, and separately the text outside the import block with whitespace removed. All six were identical on that remainder.\n\nA check that fails wrongly costs as much as one that passes wrongly. The next lane migrating a body will reach for a comparison of bytes and meet this.",
} as const satisfies Finding
