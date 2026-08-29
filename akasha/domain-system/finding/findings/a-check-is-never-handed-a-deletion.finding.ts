import type { Finding } from "../finding.page-type.ts"

export const aCheckIsNeverHandedADeletion = {
  id: "01a04bd1-923f-7a62-b4a1-cbe2b98d7c2c",
  pageTypeSlug: "finding",
  slug: "a-check-is-never-handed-a-deletion",
  domainSlug: "domain/checks-system",
  claim: "The runner skips a path the change took away, so no check can judge what a removal breaks.",
  evidence:
    "`overOne` reads the body of each changed path and continues where it is null, which is exactly the case of a file the change deletes. Every judgement of the form `you took away X while Y still needs it` is therefore inexpressible, and two of the four unbuilt checks needed precisely that: a property's file removed while its page still states it, and a page removed while another still names it. The old system had this and used it — its tree carried `gone()` alongside the paths. Nothing reports the absence, so the gap reads as silence rather than refusal. Fixing it means the runner handing a check the fact of a deletion rather than skipping it, which the current `needs` shapes cannot carry, since both hand over one existing file.",
} as const satisfies Finding
