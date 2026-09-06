import type { Initiative } from "../initiative.page-type.ts"

export const astraPersonSystemCleanup = {
  id: "01a06cd9-a5d8-7ceb-980a-d9e77ebb0437",
  pageTypeSlug: "initiative",
  slug: "astra-person-system-cleanup",
  domainSlug: "workspace-package/person-system",
  personaSlug: "astra",
  intents: [
    {
      statement: "All person-system-specific files are organized in the person-system/ folder.",
      workingMemory:
        "`person` declares `domain/email` a part of itself, and email is split in two: the page types sit under `person-system/people/email/` while every email rule page sits under `alan/harness/inboxes/email-rules/`. Whether email is a part of `person` at all is unsettled, and that answer decides which folder the files go to.",
    },
    {
      statement: "The person-system/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "7 refusals over 156 files, every one under `person-system/people`: `email` is no part `person` declares; `email`, `email-action` and `email-rule-match` each hold more pages than one; `email-rules` holds three subfolders `email-rule` declares no part of; `email-rule-agents` and `email-rule-codes` open with `email-rule`, the name of the page above them. The check runs on no phase, so nothing keeps a folder passing once it passes.",
    },
  ],
} as const satisfies Initiative
