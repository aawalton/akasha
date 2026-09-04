import type { Question } from "../question.page-type.ts"

export const forTheNewPublicContactPageOnAlanwaltonComEmailToll = {
  id: "019f7087-cede-7697-948b-d122ba7ad37a",
  pageTypeSlug: "question",
  slug: "for-the-new-public-contact-page-on-alanwalton-com-email-toll",
  ask: "For the new public contact page on alanwalton.com: email + toll-free number only, or also publish a physical mailing address (Telnyx reviewers sometimes want one)?",
  askedBy: "amy",
  askedIn: "019f619a-7890-7401-a637-b957b07840b9",
  status: "answered",
  offered: [
    "Email + phone only (no address)",
    "Publish the home address (1350 Apple Ave)",
    "Publish an address — I'll supply different text",
  ],
  answer: "Email + phone only (no address)",
  closedAt: "2026-07-17T14:45:44.042Z",
  context: "txt",
} as const satisfies Question
