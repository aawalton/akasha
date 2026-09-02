import type { Module } from "@akasha/code-system/module"

export const testflightDeployScript = {
  id: "01a05cee-e560-7155-aa17-bd611c29ba2d",
  pageTypeSlug: "module",
  slug: "testflight-deploy-script",
  definition: "the bash script a mac runs to archive an ios app and upload it to testflight",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The whole deploy is one bash script assembled before anything runs on the mac.",
    },
    {
      invariantKind: "departure",
      statement: "The mac build lock is taken before the checkout runs.",
    },
    {
      invariantKind: "departure",
      statement: "The mac build lock is removed on the way out however the run ends.",
    },
    {
      invariantKind: "departure",
      statement: "A run dying at the archive leaves no lock directory for the next run to judge.",
    },
    {
      invariantKind: "departure",
      statement: "The ipa is gated on carrying the cut commit before the ipa is uploaded.",
    },
    {
      invariantKind: "departure",
      statement: "The export options plist is written by a heredoc inside the script.",
    },
    {
      invariantKind: "departure",
      statement: "A no-upload run validates the ipa where a real run would upload the ipa.",
    },
    {
      invariantKind: "departure",
      statement: "A no-upload run reaches no reserving step.",
    },
    {
      invariantKind: "departure",
      statement: "A no-upload run spends no build number.",
    },
    {
      invariantKind: "departure",
      statement: "The build number is reserved only after altool has uploaded the ipa.",
    },
    {
      invariantKind: "departure",
      statement: "The upload-ok marker is emitted before the reserving step.",
    },
    {
      invariantKind: "departure",
      statement: "The reserving step runs inside the mac build mutex.",
    },
  ],
} as const satisfies Module
