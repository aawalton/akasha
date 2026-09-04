import type { Finding } from "../finding.page-type.ts"

export const aQualifiedAssignmentCanOnlyBeStatedByEditingTheSeatPage = {
  id: "01a06554-71ab-7000-a66c-865ae9e759cf",
  pageTypeSlug: "finding",
  slug: "a-qualified-assignment-can-only-be-stated-by-editing-the-seat-page",
  domainSlug: "workspace-package/seat-system",
  claim:
    "The seat command cannot state which page type an assignment is addressed under, so an assignment whose slug two page types carry is settable only by editing the seat page by hand.",
  evidence:
    "`akasha seat --domain <slug>` hands the raw argument to `resolveSlot` at tools/lib/seat-resolve.ts:152, which looks the argument up in a map keyed by bare domain slug and refuses anything else. `initiative/akasha-migration` is refused rather than silently misfiled, so nothing is corrupted, but the qualified address has no way in through the command. tools/lib/attributes.ts:51 strips a qualifier off the page with `slugNamed`, and tools/lib/seat-page-history.ts strips it off history for the attribute, so every reader below the page holds the slug alone.\n\nThat is why 655a40c0d3 set the akasha seat to `initiative/akasha-migration` by editing the page: it was the only way to say it. The writer then preserved the qualifier by reading it back off the page itself, which held until 21:18 that night, when a stop deleted the page and the start after it addressed the bare slug through the preference order in `assignmentAddressOf`, where `domain` is looked in before `initiative`. The seat came back on `domain/akasha-migration` and the initiative's intent and 26 constraints went with it.\n\n3d90e735d2 makes the address durable across a stop by carrying it out of the commit that last held the page. It does not give the command a way to state one. A seat assigned an ambiguous slug still has to be edited by hand, and the address survives only as long as the seat's page history does.",
} as const satisfies Finding
