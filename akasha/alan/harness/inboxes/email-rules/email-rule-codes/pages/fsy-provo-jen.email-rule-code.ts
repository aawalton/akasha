import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const fsyProvoJen = {
  id: "01a06860-54a2-7902-b652-d121b4affcab",
  pageTypeSlug: "email-rule-code",
  slug: "fsy-provo-jen",
  title: "Fsy provo jen",
  matches: [{ field: "from", comparison: "is", values: ["fsyprovosessions@byu.edu"] }],
  filing: "archive",
} as const satisfies EmailRuleCode
