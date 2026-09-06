import type { Question } from "../question.page-type.ts"

export const canYouRunAnAppleHealthExportAndAirdropTheZipToTh = {
  id: "019fdd5f-f211-718f-8fe3-4a681dda4a81",
  pageTypeSlug: "question",
  slug: "can-you-run-an-apple-health-export-and-airdrop-the-zip-to-th",
  ask: "Can you run an Apple Health export and AirDrop the zip to the macbook, leaving it in ~/Downloads?",
  askedBy: "amy",
  askedIn: "019fdcd2-f28d-7a28-ba40-70a90b4caadb",
  status: "answered",
  offered: [
    "Done — it's in ~/Downloads",
    "Sent it elsewhere — I'll give you the path",
    "Not now — ask me again later",
  ],
  answer: "Oh, for the Health export, its in Downloads at export.zip now",
  closedAt: "2026-08-07T22:04:32.058Z",
  context: "txt",
} as const satisfies Question
