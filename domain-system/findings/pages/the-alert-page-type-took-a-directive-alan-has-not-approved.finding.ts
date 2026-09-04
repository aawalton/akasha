import type { Finding } from "../finding.page-type.ts"

export const theAlertPageTypeTookADirectiveAlanHasNotApproved = {
  id: "01a0685e-a3ab-73d9-a3b2-5401f6e91018",
  pageTypeSlug: "finding",
  slug: "the-alert-page-type-took-a-directive-alan-has-not-approved",
  domainSlug: "page-type/finding",
  claim:
    "`akasha/infrastructure/alerts/alert.page-type.ts` now carries the directive Direct To Alan, carried over from the old `pages/page-type/alert.page-type.md` rather than newly authored. The Alan Approves Directives rule on the domain page type covers it, and the migration released that approval, so it landed unreviewed. Review the wording with Alan.",
  evidence:
    "The old page carried it under a `# Rules` heading at pages/page-type/alert.page-type.md:46-57, with the act 'Push to Alan's phone only where every seat that would escalate is downstream of the failure', the warrant 'He stops reading a phone that fires for what a seat could handle, so the real alert lands unread', and two aids. The akasha alert page type carried no directives at all before this, and its id 01a06755-0778-7804-96f1-949fc3c68e4f differs wholly from the old 019ffe7f-0ac8-7000-9b1b-24aebf62c66b, so the akasha page was authored independently rather than migrated and the rule had never been carried. Wording adapted only in punctuation; act 92 characters, warrant 97, both inside the 100 the act and warrant properties allow.",
} as const satisfies Finding
