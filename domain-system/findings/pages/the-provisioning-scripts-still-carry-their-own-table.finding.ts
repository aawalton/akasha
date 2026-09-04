import type { Finding } from "../finding.page-type.ts"

export const theProvisioningScriptsStillCarryTheirOwnTable = {
  id: "01a06866-fd54-7c00-ba6c-111c5fd11895",
  pageTypeSlug: "finding",
  slug: "the-provisioning-scripts-still-carry-their-own-table",
  domainSlug: "domain/akasha-migration",
  claim:
    "Every file the workstation is set up with is now a provisioned-file page stating where it goes, but setup-symlinks.sh still spells that table out itself rather than reading it from the pages.",
  evidence:
    "The seventeen pages under akasha/machines/provisioning/provisioned-files/pages each carry installPath, placedBy, onlyOn and reloadWith, which is everything the placer needs. The script was left spelling the table because it could not be run to test: a wrong projection breaks the workstation on the next provisioning run, and the block forbade installing or linking anything live. The projection is the remaining half of the adaptation and wants a command beside `service install`, which already projects workstation-service pages into units the same way.",
} as const satisfies Finding
