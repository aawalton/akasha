import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const rescuedCredential = {
  id: "01a0637b-78bb-77e3-8457-23dd0863e27e",
  type: "page-type/record-property",
  slug: "rescued-credential",
  propertySlug: "rescued-credential",
  definition: "a model account's new credentials no commit stores",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "rescued credential" },
    { partOfSpeech: "part-of-speech/noun", spelling: "rescued credentials" },
  ],
  properties: [
    { pageProperty: "text-property/rescued-access-token", required: true, many: false },
    { pageProperty: "text-property/rescued-refresh-token", required: true, many: false },
    { pageProperty: "number-property/rescued-expires-at-ms", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rescued credential is written only where the sops file did not take the pair.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rescued credential is taken away by the push that lands the pair in sops.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rescued credential is a reading rather than a value an account states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file a rescued credential is written into is narrowed before that write.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
