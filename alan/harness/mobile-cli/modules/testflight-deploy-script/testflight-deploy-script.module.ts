import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const testflightDeployScript = {
  id: "01a05cee-e560-7155-aa17-bd611c29ba2d",
  type: "page-type/module",
  slug: "testflight-deploy-script",
  definition: "the bash script a mac runs to archive an ios app and upload it to testflight",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The whole deploy is one bash script assembled before anything runs on the mac.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The mac build lock is taken before the checkout runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The mac build lock is removed on the way out however the run ends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run dying at the archive leaves no lock directory for the next run to judge.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ipa is gated on carrying the cut commit before the ipa is uploaded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The export options plist is written by a heredoc inside the script.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A no-upload run validates the ipa where a real run would upload the ipa.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A no-upload run reaches no reserving step.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A no-upload run spends no build number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The build number is reserved only after altool has uploaded the ipa.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The upload-ok marker is emitted before the reserving step.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reserving step runs inside the mac build mutex.",
    },
  ],
} as const satisfies Module
