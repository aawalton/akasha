import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const fsyProvoJen = {
  id: "01a06860-54a2-7902-b652-d121b4affcab",
  type: "page-type/email-rule-code",
  slug: "fsy-provo-jen",
  title: "Fsy provo jen",
  matches: [{ field: "from", comparison: "is", values: ["fsyprovosessions@byu.edu"] }],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
