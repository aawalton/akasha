import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileTestflightStatus = {
  id: "01a0685d-ceae-7005-b619-65388a8bde61",
  type: "command",
  slug: "mobile-testflight-status",
  definition: "the command saying how far App Store Connect has got with the newest build",
  code: "ts",
  taking: [],

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
      statement: "Nothing here builds or uploads or reaches the mac.",
    },
  ],
  name: "testflight-status",
  arguments: [{ argument: "argument/app" }, { argument: "argument/wait" }],
} as const satisfies Command
