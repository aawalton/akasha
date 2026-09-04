import type { Question } from "../question.page-type.ts"

export const lastCheckToCloseTheAwenReaderMigrationOnYourPhone = {
  id: "019f93f6-b506-7c17-a00c-dc0989936d40",
  pageTypeSlug: "question",
  slug: "last-check-to-close-the-awen-reader-migration-on-your-phone",
  ask: "Last check to close the Awen reader migration: on your PHONE, open a game and type a turn with the soft keyboard up — does the composer ride ABOVE the keyboard (text box visible while typing), not hidden behind it?",
  askedBy: "astra",
  askedIn: "019f8b2d-40d8-7c8d-89a9-3f111c3b7ea6",
  status: "answered",
  offered: ["Composer rides above keyboard ✓", "Composer hidden/broken behind keyboard"],
  answer: "Composer rides above keyboard ✓",
  closedAt: "2026-07-24T11:51:53.203Z",
  context: "txt",
} as const satisfies Question
