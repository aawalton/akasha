import type { Finding } from "../finding.page-type.ts"

export const theCharacterCaptureTablesAreDerivedFromPackagesOutsideAkasha = {
  id: "01a0611d-5389-76f1-86a1-3c6b1f9f132d",
  pageTypeSlug: "finding",
  slug: "the-character-capture-tables-are-derived-from-packages-outside-akasha",
  domainSlug: "domain/temper",
  claim:
    "The fifteen generated tables now in akasha/temper/temper-characters-capture-addon are written out from temper/game-characters-skills and temper/game-characters-equipment, which are outside akasha. Akasha holds the output while the input is not in akasha, and the generators keep writing to the temper folder, which is no longer the copy akasha reads. The two copies have nothing keeping them equal.",
  evidence:
    "Measured 2026-09-02. Every table under temper/game-characters-capture-addon/src/generated is emitted by a generator in tools/lib/temper-addon-data/generators/, driven by tools/lib/temper-addon-data/mapping-generators.ts and writes/codec.ts. None of the fifteen is a page in akasha/temper/temper-addon-generators, so the ruling that a table whose generator is in akasha is build output does not reach them, and they were carried as source. tools/lib/temper-addon-data/code/skills-data.ts reads @temper/game-characters-skills, and set-mappings reads @temper/game-characters-equipment, whose 1,362,516-byte set table is what blocks that package. Landed as 42 modules in c011b70927, 3ec4005036 and 28480645fd. Every table was proven equal to its original by executing both copies and comparing JSON.stringify output: 97 tables, all equal, key order preserved. The three tables over the byte ceiling were divided into contiguous parts and spread in turn; every key of every divided table is an integer, so JavaScript iterates them in ascending numeric order whatever the insertion order, and no order can drift. What is lost: the generator emits a trailing comment naming each skill, set and star beside its id, and akasha keeps no comment, so 2,700 lines of names are gone from the landed copy. The generator template keeps them. When game-characters-skills and game-characters-equipment land, these generators belong in temper-addon-generators and the tables become build output under the ruling, to be inlined from the generator rather than kept as source.",
} as const satisfies Finding
