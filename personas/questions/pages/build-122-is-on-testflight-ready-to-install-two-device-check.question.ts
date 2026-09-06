import type { Question } from "../question.page-type.ts"

export const build122IsOnTestflightReadyToInstallTwoDeviceCheck = {
  id: "019f6909-daa1-7a3c-941a-f128e9fab56b",
  pageTypeSlug: "question",
  slug: "build-122-is-on-testflight-ready-to-install-two-device-check",
  ask: "Build 122 is on TestFlight, ready to install. Two device checks when you get a moment: (1) delete a block in the editor — keyboard should STAY UP with focus on the neighbor block; (2) tap the open space below your last block — caret lands at the end and the keyboard raises. Both editor fixes (#15514, #15515) finish on your confirmation.",
  askedBy: "astra",
  askedIn: "019f3c83-7bbb-7c21-8d46-2b6c5fc68ea4",
  status: "answered",
} as const satisfies Question
