import type { Initiative } from "../initiative.page-type.ts"

export const astraPersonSystemCleanup = {
  id: "01a06cd9-a5d8-7ceb-980a-d9e77ebb0437",
  pageTypeSlug: "initiative",
  slug: "astra-person-system-cleanup",
  domainSlug: "workspace-package/persons",
  personaSlug: "astra",
  intents: [
    {
      statement: "All person-system-specific files are organized in the person-system/ folder.",
      workingMemory:
        "Met on arrival, so this intent wants replacing. Every page of every page type person-system declares sits under `person-system/`, but for the email rule pages under `alan/harness/inboxes/email-rules/`, and those belong where they are: `email-rule` holds that one person's rules are a set of their own, and that a rule's kind is the folder the rule is in.",
    },
    {
      statement: "The person-system/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "Met: 156 files judged, none refused. It took each part of the email domain into a folder of its own, every folder name with the name of the page above it taken off, and `email-rule` declaring its two kinds where `email` had declared them. Twelve invariants over nine pages were restated to say one fact each. `alan/harness/inboxes/email-rules` refuses yet, wanting the disabled `pages-of-one-type` shape.",
    },
  ],
} as const satisfies Initiative
