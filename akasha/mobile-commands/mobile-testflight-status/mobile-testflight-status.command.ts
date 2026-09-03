import type { Command } from "@akasha/command-system/command"

export const mobileTestflightStatus = {
  id: "01a0685d-ceae-7005-b619-65388a8bde61",
  pageTypeSlug: "command",
  slug: "mobile-testflight-status",
  definition: "the command saying how far App Store Connect has got with the newest build",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--app <slug>", takes: "the app to ask about, the default app where none is said" },
    {
      said: "--wait",
      takes: "hold until the build is valid or has failed rather than answering once",
    },
  ],
  helpNotes: [
    "this asks App Store Connect and nothing else, so it neither reaches the mac nor builds anything.",
    "a build still processing is an answer rather than a failure, and a wait is what turns it into one.",
    "a wait asks every thirty seconds for up to thirty minutes and gives back what it saw on the way.",
    "the token is minted afresh for each read, since a wait outlives any one token.",
    "a build that failed or came back invalid is a refusal carrying what App Store Connect said was wrong.",
    "a wait that runs out is a refusal, and the build is still processing rather than lost.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build still processing is answered rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A build that failed or is invalid is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A wait running out is refused rather than answered as still processing.",
    },
    {
      invariantKind: "departure",
      statement: "A token is minted for each read rather than held across a wait.",
    },
    {
      invariantKind: "departure",
      statement: "An app no build has been uploaded for is answered rather than refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here builds, uploads or reaches the mac.",
    },
  ],
} as const satisfies Command
