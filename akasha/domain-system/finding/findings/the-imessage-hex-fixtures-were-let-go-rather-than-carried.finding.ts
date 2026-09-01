import type { Finding } from "../finding.page-type.ts"

export const theImessageHexFixturesWereLetGoRatherThanCarried = {
  id: "01a05c25-171a-76e4-99bc-cc3db6d26553",
  pageTypeSlug: "finding",
  slug: "the-imessage-hex-fixtures-were-let-go-rather-than-carried",
  domainSlug: "domain/alan-harness",
  claim:
    "The three .hex.txt fixtures the old imessage folder held did not carry into akasha, and this lane let them go rather than carrying them. They are encoded bodies of real messages; the package's own page says no message body is written to a page; and the test-fixtures file property admits ts rather than text. Synthetic fixtures and a test stand in their place. The call was taken without Alan.",
  evidence:
    "The fixtures were src/lib/fixtures/attributed-body-100596, 100598 and 100599, 3739 bytes between them, decoding to 1, 239 and 56 characters of message text. Nothing read them: no file in the tree named them, and the package declared a test script while holding no test file at all. So the carry lost no coverage, because there was none. Three things pointed the same way. The workspace-package page for imessage states, as an absence invariant, that no message body is written to a page or a log from here, and a test-fixtures file is a page property. The TestFixtures type in code-system is the literal 'ts', and all 28 test-fixtures files standing in akasha are TypeScript, so a .txt fixture has no shape to land in without new modelling. And the fixtures were orphaned already. They were used once before being let go: the two copies were compared over them, and old and new agreed on all three. What stands now is typedstream.module.test-fixtures.ts, which builds typedstream bodies from nothing, and typedstream.module.test.ts, 28 tests over 9 readable and 11 unreadable bodies walking every branch the reader has, including all three length forms, both truncated forms, the unknown forms, the overrun, and a body cut at every byte. The old fixtures stand in this repository's history at their old path if a real captured body is ever wanted again.",
} as const satisfies Finding
