import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const manifest = {
  id: "01a06da1-b337-78b9-8ad3-556e6b67058e",
  type: "page-type/page-type",
  slug: "manifest",
  definition: "the Kubernetes resources a thing is applied as",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "manifest" },
    { partOfSpeech: "part-of-speech/noun", spelling: "manifests" },
  ],
  parts: [
    "build-folder-property/generated-directory",
    "code-file-property/manifest-code",
    "one-of-property/build-env",
    "record-property/build-env-secret",
    "record-property/secret-build-env",
    "record-property/stated-build-env",
    "text-property/build-env-name",
    "text-property/build-env-value",
  ],
  extends: ["page-type/domain"],
  allowsTmpPaths: true,
  properties: [
    { pageProperty: "code-file-property/manifest-code", required: true, many: false },
    { pageProperty: "build-folder-property/generated-directory", required: false, many: false },
    { pageProperty: "one-of-property/build-env", required: false, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest is found by its page type rather than by its file name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest's resources are applied to the cluster.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest is generated into YAML before that manifest is applied.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A container told to run start runs in a package stating a start script.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement:
        "A manifest's checksum annotation sums a secret or config that manifest names in a decision.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest states the values the build of the app it applies is handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest stating no such value leaves its build the values every build gets.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
