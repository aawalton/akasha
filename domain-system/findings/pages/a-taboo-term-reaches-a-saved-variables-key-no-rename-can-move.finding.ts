import type { Finding } from "../finding.page-type.ts"

export const aTabooTermReachesASavedVariablesKeyNoRenameCanMove = {
  id: "01a061e0-9f1c-7001-a543-a57de79160c5",
  pageTypeSlug: "finding",
  slug: "a-taboo-term-reaches-a-saved-variables-key-no-rename-can-move",
  domainSlug: "domain/temper",
  claim:
    "A taboo term reaching inside a camelCase name meets add-on keys whose spelling is not akasha's to choose, because a shipped add-on has already written them into a player's saved variables. Renaming such a key changes stored user data, and where that value drives a migration the rename silently re-runs it. So a migrating seat judges each hit twice: whether the sense is barred, and whether the name is reachable at all. Only the second decides what can be done.",
  evidence:
    "Measured on 2026-09-02 landing `temper-hud-addon`. The taboo term at `akasha/domain-system/taboo-terms/pages/schema.taboo-term.ts` bars the sense `the specification a document was written to` and keeps only `the shape a zod validator names a value must have`. The add-on's saved variables carry `schemaVersion`, which is the barred sense exactly. Three names carried it: the module slug, the two version constants, and the stored key. The first two were renamed freely, to `hud-addon-visibility-version` and `VISIBILITY_VERSION_BASELINE` and `VISIBILITY_VERSION_CURRENT`. The third could not be. `TemperHud_SavedVariables` is written by the temper add-on shipping today, and `needsFrameMigration` reads that key to decide whether to run `migrateHiddenToVisible`, which inverts every stored boolean from hidden to shown. A renamed key reads as absent, `needsFrameMigration` answers true against already-migrated data, and every component the player had hidden becomes shown. So the key is kept as it was, and the write was landed with the term read and judged. The taboo gate handles this correctly, as a naming decision rather than a refusal; what is worth recording is that the answer is forced by data outside the repository, and that the same shape waits in every add-on carrying a stored version marker.",
} as const satisfies Finding
