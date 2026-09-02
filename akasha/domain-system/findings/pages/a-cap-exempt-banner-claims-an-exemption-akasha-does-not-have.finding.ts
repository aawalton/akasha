import type { Finding } from "../finding.page-type.ts"

export const aCapExemptBannerClaimsAnExemptionAkashaDoesNotHave = {
  id: "01a0619a-df4a-7c46-bf58-05283651a037",
  pageTypeSlug: "finding",
  slug: "a-cap-exempt-banner-claims-an-exemption-akasha-does-not-have",
  domainSlug: "domain/temper",
  claim:
    "Seven generated LibSets tables carry a banner line reading `Cap-exempt: machine-generated data module (see Code File Length)`. Akasha grants no such exemption to TypeScript. Its file-length check gives 8 MB to a `jsonl` body and 128 KB to an `xml` body and 15,000 bytes to everything else, routed on the file's held kind alone. So the two large tables must be divided into about forty modules to come across at all, and the directive the banner states is left behind.",
  evidence:
    "Measured 2026-09-02 while migrating temper/shared-addon-libraries-lib-sets. The banner sits at line 4 of all seven files under src/data/generated/. akasha/checks/code-checks/pages/file-length/file-length.code-check.code.ts:5-9 sets CEILING = 15000, ENTRY_CEILING = 8 * 1024 * 1024 and MARKUP_CEILING = 128 * 1024, and ceilingFor(path) at line 27 picks between them on namedIn(path)?.held being jsonl or xml. Nothing reads a marker in the body, so a banner cannot raise a ceiling.\n\nThe two tables the exemption was written for are set-data-preloaded.generated.ts at 613,119 bytes and set-info.generated.ts at 226,614 bytes. Collapsing them to the 100-column width akasha's formatter lands takes them to roughly 350,000 and 158,000 bytes, which is a real saving and still some forty times over.\n\nDividing them is safe here for a reason that will not hold for the next table. Both are read only by string or numeric key, never by position: src/data/register-data.ts reaches setDataPreloaded[LIBSETS_TABLEKEY_SETITEMIDS] and its siblings, and setInfo is indexed by set id. Two of the thirteen top-level keys, setItemCollectionsZoneMapping and setsArmorTypes, are arrays whose element order is the data.\n\nThe other three banner lines state facts rather than a directive: the upstream is Baertram/LibSets at commit 4665f55d15171687bb92ee8a64ce73e8056843c0, and the pin is already a page at akasha/temper/temper-upstream-data/libsets-upstream-pin.",
} as const satisfies Finding
