import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const inferenceRun = {
  id: "019ea7d8-5e16-7237-b2e0-4ce47633aa58",
  type: "page-type/page-type",
  slug: "inference-run",
  definition: "a loading of a model to make something",
  extends: ["page-type/page"],
  parts: [
    "module/inference-run-record",
    "module/inference-run-services",
    "module/inference-run-store",
    "module/persist-audio",
    "module/persist-image",
    "module/persist-media",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No run is kept apart from the page of what that run made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that throws lands nothing and is kept nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image a run made is an image page with the bytes beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sound a run made is an audio page with the bytes beside it.",
    },
    { decisionKind: "decision-kind/absence", statement: "Nothing here reaches a model service." },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows which host a service is on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a run landed is pushed into the caller's `done` as it lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that threw part way names in its refusal what had landed by then.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
