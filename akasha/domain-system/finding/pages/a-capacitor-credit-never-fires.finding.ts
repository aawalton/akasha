import type { Finding } from "../finding.page-type.ts"

export const aCapacitorCreditNeverFires = {
  id: "01a05c21-b0eb-7e02-aaa3-deabd1404db9",
  pageTypeSlug: "finding",
  slug: "a-capacitor-credit-never-fires",
  domainSlug: "domain/akasha-check",
  claim:
    "The `@capacitor` credit in manifest-names-what-is-reached never fires. The lookup feeding it asks the index what file the `capacitor-config` stands under and is answered null, that property naming no fixed file, so no `@capacitor` dependency is ever credited. All 11 refusals tonight are this one dead branch, and every package they name is genuinely reached. Left standing in Alan's absence.",
  evidence:
    "filePropertiesAt maps a property slug to its fixed file name, or to null where it states none (index-entries.module.code.ts:131-132). `capacitor-config` states no fileName, unlike `git-ignore`, which states '.gitignore'. Probing filePropertiesAt over this repo answers null for the first and '.gitignore' for the second. So configNamed (code.ts:235-237) answers null and creditedIn:211 short-circuits on `config !== null`. The check's own test never reaches configNamed: it hands CONFIG in by hand (test.ts:24,264), proving the credit while the lookup feeding it goes unproven. Every one of the 11 is reached by a runtime path no parse can see. alanwalton/web/app/lib/capacitor-bridge.ts takes StatusBar, Filesystem, PushNotifications and App off window.Capacitor.Plugins at :154, :162, :176 and :210, each with live callers (offline-downloads.ts:52, deep-link-open-sync.tsx:15). smilingjenny's bridge takes PushNotifications at :48 for push-registration-sync.tsx:30. `@capacitor/core` is a peer of all five plugin packages; `@capacitor/cli` carries the `cap` bin the ios-add script resolves from node_modules/.bin; `@capacitor/ios` is the platform `cap add ios` lays down. None is dead, so there is nothing to remove. Naming the property 'capacitor.config.json' would not mend it: that file is generated and gitignored, and change.after reads the disk (change-walking.module.code.ts:204-213), so it stands for alanwalton and not for smilingjenny, turning the audit on who last ran the generator. The mend wants the committed file beside the page, rewording invariants :140 and :144 — what the check refuses, which Alan Approves Checks reserves to Alan.",
} as const satisfies Finding
