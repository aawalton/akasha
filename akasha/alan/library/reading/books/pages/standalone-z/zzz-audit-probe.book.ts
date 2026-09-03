import type { Book } from "../../book.page-type.ts"

export const zzzAuditProbe = {
  id: "01a065a0-0000-7000-8000-00000000beef",
  pageTypeSlug: "book",
  slug: "zzz-audit-probe",
  title: "A Probe That Proves The Check Can See This Folder",
  kind: "read",
  unitSlug: "words",
  bogusKeyNoTypeDeclares: "this page must be refused",
} as const satisfies Book
