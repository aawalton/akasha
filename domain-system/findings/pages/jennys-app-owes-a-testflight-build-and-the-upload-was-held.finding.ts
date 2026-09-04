import type { Finding } from "../finding.page-type.ts"

export const jennysAppOwesATestflightBuildAndTheUploadWasHeld = {
  id: "01a05fcb-bf14-7534-8ce6-f2c70ca1d716",
  pageTypeSlug: "finding",
  slug: "jennys-app-owes-a-testflight-build-and-the-upload-was-held",
  domainSlug: "domain/alan-harness",
  claim:
    "Jenny's app owes a TestFlight build and none was made. Her last is build 21, which App Store Connect confirms is her highest, and her build inputs moved 774 commits since. Alan approved a push and a deploy while naming his own phone, and an upload for her app reaches Jenny, who did not ask for it and cannot decline it once it lands. The call taken was to hold the upload rather than to read his approval as covering a second person.",
  evidence:
    "`mobile cut-status --app smilingjenny` answers that a release is owed, and unlike alanwalton's the verdict is true rather than an artifact of an unrecorded fingerprint: her recorded hash reproduces exactly at her recorded commit 8c4686cd, and App Store Connect's highest build for me.smilingjenny.app is 21, uploaded 2026-09-01T14:22:50-07:00. No unrecorded upload exists.\n\nAlan's words were 'approved for push and deploy', answering a question that named build 199 of his own app and the thirty commits owed to origin. Both were done: origin carries them and build 199 is on his phone. Nothing in that exchange named Jenny's app.\n\nHer site is deployed and live at 49134b9632, so the half of her work reaching nobody but a pod has landed. What waits is the half that lands on a person. Her three widgets are each captioned for Alan's readings and she holds no person-access row, so a build carries her no new reading of her own; it carries her whatever moved in 774 commits.\n\nEverything needed is ready. The deploy now takes any commit origin reaches rather than main alone, so the upload is one command whenever he says so.",
} as const satisfies Finding
