import type { Finding } from "../finding.page-type.ts"

export const theSkillPagesHoldEachDescriptionAsItsOwnJsonEncoding = {
  id: "01a06193-2de0-7c08-9825-fdb463c9d1b4",
  pageTypeSlug: "finding",
  slug: "the-skill-pages-hold-each-description-as-its-own-json-encoding",
  domainSlug: "domain/temper",
  claim:
    "The 1,636 temper-skill pages hold each description as one line of JSON text because that is what the property declares, and they were never the drifted party. The addon-data bridge had no json arm, so the text reached the generator still quoted and the generator encoded it a second time. An earlier reading of this finding sent a seat to repair the pages, which would have broken all 1,636 of them.",
  evidence:
    "This corrects what the page said before, which was that the pages had drifted from the table.\n\nOnly one of the 36 description property definitions is declared json: `pages/page-property-definition/temper-skill-description.page-property-definition.md` says `type: json` and defines the value as the game's own words `as one line of JSON text`. That encoding is how a description carrying newlines fits on one line, and 1,077 of the 1,636 need it.\n\n`asDeclared` in `tools/lib/page-property-types.ts` had arms for select, list, number and boolean and none for json, so a json value reached `generateTemperSkill` as the quoted text rather than the words. The generator encoded it again and every tooltip came out wrapped in its own quotes. The mend is `108d0256b2`, which decodes in the bridge, the one layer that knows the declared type, and refuses a json value no parse reads.\n\nRe-measured 2026-09-02 after that mend, with no page altered: all 1,636 descriptions read as their declared type equal the table exactly, 0 disagreements, and 1,433 of the 1,636 emitted entries are byte-identical to the checked-in table. Every remaining difference is effects rather than description.\n\nWhat makes this worth a page rather than a deletion is the direction the repair would have taken. Decoding the pages was briefed to a seat as settled work. Had it happened, each page would then hold text no parse reads under a property declared json, and the refusal added by the same mend would throw on all 1,636. The reader was short an arm and the pages were right, and the two are told apart only by asking what the property declares.",
} as const satisfies Finding
