import type { Finding } from "../finding.page-type.ts"

export const anIdKeyedAblationCheckWouldRefuseAHundredGoodPages = {
  id: "01a0657f-1a2c-7002-b41e-9a3f8c2d5e60",
  pageTypeSlug: "finding",
  slug: "an-id-keyed-ablation-check-would-refuse-a-hundred-good-pages",
  domainSlug: "domain/akasha-migration",
  claim:
    "Whether a migration carried its page ids across differs by folder, so neither matching on id nor refusing to is right everywhere, and both fail quietly.",
  evidence:
    "The guidance reaching this migration was that no migration has carried a page id across, so an id-keyed check clears nothing while looking like a correct negative. " +
    "That is true where it was measured and false here. Of the 2,079 persona days, 1,995 carried a uuid version 7 that was carried across unchanged, and 1,938 of those are named by identity in the wake-day pages already standing in akasha. Re-minting them would have broken 1,938 live references. " +
    "The other 84, and 28 of the 1,123 great courses, carried a uuid version 5, which a page may not keep. Those 112 identities were replaced under akasha's own rule, keeping the last eight hex of the old one. None of the 84 is named by any wake day, counted before they moved. " +
    "So an id-keyed check over these folders would have passed 3,273 and refused 112, reading as a defect where there is none. " +
    "The check written for them is keyed on the slug and proves the fields, and reports id agreement alongside as a fact rather than using it as the test. Run against a seeded fault it held 3,382 of 3,385 back, and clean it held none.",
} as const satisfies Finding
